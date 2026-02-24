import type { APIGatewayProxyHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognito = new CognitoIdentityProviderClient({
  region: 'ap-southeast-2',
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.tranche2compliance.com.au',
  'Access-Control-Allow-Headers': 'Authorization,Content-Type',
};

export const handler: APIGatewayProxyHandler = async (event) => {
  // User ID comes from Cognito JWT validated by API Gateway authorizer
  const userId =
    event.requestContext.authorizer?.claims?.sub ||
    event.requestContext.authorizer?.claims?.['cognito:username'];

  if (!userId) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    const user = await cognito.send(
      new AdminGetUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: userId,
      })
    );

    const attrs: Record<string, string> = {};
    for (const attr of user.UserAttributes || []) {
      if (attr.Name && attr.Value) {
        attrs[attr.Name] = attr.Value;
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
      body: JSON.stringify({
        tier: attrs['custom:subscription_tier'] || 'free',
        pdf_purchased: attrs['custom:pdf_purchased'] === 'true',
        stripe_customer_id: attrs['custom:stripe_customer_id'] || null,
      }),
    };
  } catch (err) {
    console.error('Error fetching user attributes:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
