import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {
  RestApi,
  LambdaIntegration,
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
} from 'aws-cdk-lib/aws-apigateway';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { auth } from './auth/resource';
import { stripeWebhook } from './functions/stripe-webhook/resource';
import { checkSubscription } from './functions/check-subscription/resource';
import { postConfirmation } from './functions/post-confirmation/resource';

const backend = defineBackend({
  auth,
  stripeWebhook,
  checkSubscription,
  postConfirmation,
});

// ─── External Cognito User Pool ─────────────────────────────────────────────
// The app uses a separately-created production User Pool, not the Amplify-managed one.
// Both Lambdas need to target this pool for user attribute updates / reads.
const EXTERNAL_USER_POOL_ID = 'ap-southeast-2_ezBrsXgsj';
const EXTERNAL_USER_POOL_ARN = `arn:aws:cognito-idp:ap-southeast-2:${Stack.of(backend.auth.resources.userPool).account}:userpool/${EXTERNAL_USER_POOL_ID}`;

backend.stripeWebhook.resources.lambda.addEnvironment(
  'COGNITO_USER_POOL_ID',
  EXTERNAL_USER_POOL_ID
);
backend.checkSubscription.resources.lambda.addEnvironment(
  'COGNITO_USER_POOL_ID',
  EXTERNAL_USER_POOL_ID
);

// ─── IAM Policies ────────────────────────────────────────────────────────────

// Grant the stripe-webhook Lambda permission to update Cognito user attributes
backend.stripeWebhook.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['cognito-idp:AdminUpdateUserAttributes'],
    resources: [EXTERNAL_USER_POOL_ARN],
  })
);

// Grant the check-subscription Lambda permission to read Cognito user attributes
backend.checkSubscription.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['cognito-idp:AdminGetUser'],
    resources: [EXTERNAL_USER_POOL_ARN],
  })
);

// Grant the post-confirmation Lambda permission to send SES emails
// The trigger itself is wired via defineAuth triggers in auth/resource.ts
backend.postConfirmation.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*'],
  })
);

// ─── API Gateway ─────────────────────────────────────────────────────────────
// Place in the same stack as the functions to avoid circular cross-stack references

const functionStack = Stack.of(backend.stripeWebhook.resources.lambda);

const api = new RestApi(functionStack, 'T2CApi', {
  restApiName: 't2c-api',
  description: 'T2C monetization API — Stripe webhook + subscription check',
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Authorization', 'Content-Type', 'Stripe-Signature'],
  },
});

// Import the external (production) User Pool for the API authorizer
const externalUserPool = UserPool.fromUserPoolId(
  functionStack,
  'ExternalUserPool',
  EXTERNAL_USER_POOL_ID
);

// Cognito authorizer for protected routes — uses the external production pool
const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(
  functionStack,
  'CognitoAuthorizer',
  {
    cognitoUserPools: [externalUserPool],
  }
);

// POST /webhook/stripe — no auth (Stripe signature verification in Lambda)
const webhookResource = api.root.addResource('webhook').addResource('stripe');
webhookResource.addMethod(
  'POST',
  new LambdaIntegration(backend.stripeWebhook.resources.lambda),
  { authorizationType: AuthorizationType.NONE }
);

// GET /subscription — Cognito JWT auth
const subscriptionResource = api.root.addResource('subscription');
subscriptionResource.addMethod(
  'GET',
  new LambdaIntegration(backend.checkSubscription.resources.lambda),
  {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: cognitoAuthorizer,
  }
);

// GET /pricing — no auth (public pricing info)
const pricingResource = api.root.addResource('pricing');
pricingResource.addMethod(
  'GET',
  new LambdaIntegration(backend.checkSubscription.resources.lambda),
  { authorizationType: AuthorizationType.NONE }
);
