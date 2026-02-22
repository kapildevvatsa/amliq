import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'http://localhost:3000/',
        'http://localhost:3000/real-estate.html',
        'https://t2c-prod.d348r0hmzvjji4.amplifyapp.com/',
        'https://t2c-prod.d348r0hmzvjji4.amplifyapp.com/real-estate.html',
      ],
      logoutUrls: [
        'http://localhost:3000/',
        'https://t2c-prod.d348r0hmzvjji4.amplifyapp.com/',
      ],
    },
  },
});
