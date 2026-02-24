import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'https://www.tranche2compliance.com.au/',
        'https://www.tranche2compliance.com.au/real-estate.html',
        'https://www.tranche2compliance.com.au/accountants.html',
        'https://www.tranche2compliance.com.au/jewellers.html',
      ],
      logoutUrls: [
        'https://www.tranche2compliance.com.au/',
      ],
    },
  },
});
