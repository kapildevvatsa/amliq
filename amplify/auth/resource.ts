import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from '../functions/post-confirmation/resource';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'https://master.d348r0hmzvjji4.amplifyapp.com/',
        'https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html',
        'https://master.d348r0hmzvjji4.amplifyapp.com/accountants.html',
        'https://master.d348r0hmzvjji4.amplifyapp.com/jewellers.html',
        'https://master.d348r0hmzvjji4.amplifyapp.com/pricing.html',
      ],
      logoutUrls: [
        'https://master.d348r0hmzvjji4.amplifyapp.com/',
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
