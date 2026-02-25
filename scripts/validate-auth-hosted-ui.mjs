import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const DEFAULT_REDIRECT_URI =
  'https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html';

function extractConfigValue(source, key) {
  const regex = new RegExp(`${key}:\\s*'([^']+)'`);
  const match = source.match(regex);
  assert(match?.[1], `Unable to read "${key}" from js/auth.js`);
  return match[1];
}

async function fetchManagedPage(baseDomain, clientId, endpoint, redirectUri) {
  const url = new URL(`https://${baseDomain}/${endpoint}`);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('response_type', 'token');
  url.searchParams.set('scope', 'email openid profile');
  url.searchParams.set('redirect_uri', redirectUri);

  const response = await fetch(url, { redirect: 'follow' });
  const body = await response.text();
  return { response, body, requestedUrl: url.toString() };
}

async function main() {
  const authSource = await readFile(new URL('../js/auth.js', import.meta.url), 'utf8');
  const domain = extractConfigValue(authSource, 'domain');
  const clientId = extractConfigValue(authSource, 'clientId');
  const redirectUri = process.env.AUTH_REDIRECT_URI ?? DEFAULT_REDIRECT_URI;

  assert(
    !domain.includes('11447'),
    'auth.js still references the deleted Cognito domain (11447).'
  );

  const login = await fetchManagedPage(domain, clientId, 'login', redirectUri);
  assert.equal(login.response.status, 200, `Login endpoint failed: ${login.requestedUrl}`);
  assert(
    !login.response.url.includes('redirect_mismatch'),
    `Login callback mismatch detected: ${login.response.url}`
  );

  const signup = await fetchManagedPage(domain, clientId, 'signup', redirectUri);
  assert.equal(signup.response.status, 200, `Signup endpoint failed: ${signup.requestedUrl}`);
  assert(
    !signup.response.url.includes('redirect_mismatch'),
    `Signup callback mismatch detected: ${signup.response.url}`
  );
  assert(/given_name/i.test(signup.body), 'Signup form missing first-name field (given_name).');
  assert(/family_name/i.test(signup.body), 'Signup form missing last-name field (family_name).');
  assert(/password/i.test(signup.body), 'Signup form missing password field.');
  assert(/confirm/i.test(signup.body), 'Signup form missing confirm-password text.');

  console.log('Auth hosted UI validation passed.');
  console.log(`Domain: ${domain}`);
  console.log(`Client: ${clientId}`);
  console.log(`Redirect URI: ${redirectUri}`);
}

main().catch((error) => {
  console.error('Auth hosted UI validation failed.');
  console.error(error.message || error);
  process.exit(1);
});
