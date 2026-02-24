import type { APIGatewayProxyHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognito = new CognitoIdentityProviderClient({
  region: 'ap-southeast-2',
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function getCorsHeaders(event: { headers: Record<string, string | undefined> }) {
  const origin = event.headers['origin'] || event.headers['Origin'] || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0] || '*';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
  };
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const CORS_HEADERS = getCorsHeaders(event);
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
