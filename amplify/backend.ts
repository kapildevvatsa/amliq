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

// ─── Auto-inject Cognito User Pool ID into Lambda env vars ───────────────────

backend.stripeWebhook.resources.lambda.addEnvironment(
  'COGNITO_USER_POOL_ID',
  backend.auth.resources.userPool.userPoolId
);
backend.checkSubscription.resources.lambda.addEnvironment(
  'COGNITO_USER_POOL_ID',
  backend.auth.resources.userPool.userPoolId
);

// ─── IAM Policies ────────────────────────────────────────────────────────────

// Grant the stripe-webhook Lambda permission to update Cognito user attributes
backend.stripeWebhook.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['cognito-idp:AdminUpdateUserAttributes'],
    resources: [backend.auth.resources.userPool.userPoolArn],
  })
);

// Grant the check-subscription Lambda permission to read Cognito user attributes
backend.checkSubscription.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['cognito-idp:AdminGetUser'],
    resources: [backend.auth.resources.userPool.userPoolArn],
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

// Cognito authorizer for protected routes
const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(
  functionStack,
  'CognitoAuthorizer',
  {
    cognitoUserPools: [backend.auth.resources.userPool],
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
