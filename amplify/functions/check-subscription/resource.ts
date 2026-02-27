import { defineFunction } from '@aws-amplify/backend';

export const checkSubscription = defineFunction({
  name: 'check-subscription',
  entry: './handler.ts',
  runtime: 20,
  timeoutSeconds: 5,
  memoryMB: 128,
  environment: {
    ALLOWED_ORIGINS: [
      'https://master.d348r0hmzvjji4.amplifyapp.com',
    ].join(','),
    TRIAL_DAYS: '14',
  },
});
