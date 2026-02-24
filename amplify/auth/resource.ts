import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from '../functions/post-confirmation/resource';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'https://www.tranche2compliance.com.au/',
        'https://www.tranche2compliance.com.au/real-estate.html',
        'https://www.tranche2compliance.com.au/accountants.html',
        'https://www.tranche2compliance.com.au/jewellers.html',
        'https://www.tranche2compliance.com.au/pricing.html',
      ],
      logoutUrls: [
        'https://www.tranche2compliance.com.au/',
      ],
    },
  },
  triggers: {
    postConfirmation,
  },
  userAttributes: {
    'custom:subscription_tier': {
      dataType: 'String',
      mutable: true,
    },
    'custom:stripe_customer_id': {
      dataType: 'String',
      mutable: true,
    },
    'custom:pdf_purchased': {
      dataType: 'String',
      mutable: true,
    },
  },
});
