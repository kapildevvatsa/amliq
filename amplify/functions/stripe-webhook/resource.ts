import { defineFunction } from '@aws-amplify/backend';

export const stripeWebhook = defineFunction({
  name: 'stripe-webhook',
  entry: './handler.ts',
  runtime: 20,
  timeoutSeconds: 30,
  memoryMB: 256,
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
});
