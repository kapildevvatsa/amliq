import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  entry: './handler.ts',
  runtime: 20,
  timeoutSeconds: 10,
  memoryMB: 128,
  resourceGroupName: 'auth',
  environment: {
    SES_FROM_EMAIL: 'noreply@tranche2compliance.com.au',
    TRIAL_DAYS: '14',
  },
});
