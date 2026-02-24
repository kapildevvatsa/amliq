import type { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const cognito = new CognitoIdentityProviderClient({
  region: 'ap-southeast-2',
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;

async function updateCognitoAttributes(
  userId: string,
  attributes: Record<string, string>
): Promise<void> {
  await cognito.send(
    new AdminUpdateUserAttributesCommand({
      UserPoolId: USER_POOL_ID,
      Username: userId,
      UserAttributes: Object.entries(attributes).map(([Name, Value]) => ({
        Name,
        Value,
      })),
    })
  );
}

async function getCognitoUserIdFromCustomer(
  customerId: string
): Promise<string | null> {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return null;
  return customer.metadata?.cognito_user_id || null;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const sig = event.headers['Stripe-Signature'] || event.headers['stripe-signature'];
  if (!sig) {
    return { statusCode: 400, body: 'Missing Stripe-Signature header' };
  }

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return { statusCode: 400, body: 'Webhook signature verification failed' };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const customerId = session.customer as string;

        if (!userId) {
          console.error('No client_reference_id on checkout session');
          break;
        }

        // Update Cognito first — this is the critical operation
        if (session.mode === 'subscription') {
          await updateCognitoAttributes(userId, {
            'custom:subscription_tier': 'pro',
            'custom:stripe_customer_id': customerId,
          });
          console.log(`User ${userId} upgraded to pro (subscription)`);
        } else if (session.mode === 'payment') {
          await updateCognitoAttributes(userId, {
            'custom:pdf_purchased': 'true',
            'custom:stripe_customer_id': customerId,
          });
          console.log(`User ${userId} purchased PDF (one-time)`);
        }

        // Tag Stripe customer with cognito_user_id for future webhook lookups
        // Non-fatal — don't let this block the upgrade
        try {
          await stripe.customers.update(customerId, {
            metadata: { cognito_user_id: userId },
          });
        } catch (tagErr) {
          console.warn(`Failed to tag Stripe customer ${customerId}:`, tagErr);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userId = await getCognitoUserIdFromCustomer(customerId);

        if (!userId) {
          console.error(`No cognito_user_id found for customer ${customerId}`);
          break;
        }

        await updateCognitoAttributes(userId, {
          'custom:subscription_tier': 'free',
        });
        console.log(`User ${userId} downgraded to free (subscription deleted)`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userId = await getCognitoUserIdFromCustomer(customerId);

        if (!userId) {
          console.error(`No cognito_user_id found for customer ${customerId}`);
          break;
        }

        // Update tier based on subscription status
        const isActive =
          subscription.status === 'active' || subscription.status === 'trialing';
        const tier = isActive ? 'pro' : 'free';

        await updateCognitoAttributes(userId, {
          'custom:subscription_tier': tier,
        });
        console.log(`User ${userId} subscription updated to ${tier} (status: ${subscription.status})`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    return { statusCode: 500, body: 'Internal error processing webhook' };
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
