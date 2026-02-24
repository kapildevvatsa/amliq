(function () {
  var CONFIG = {
    domain:      't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
    clientId:    '31etl7ceunn7p9g3gaipms8rhr',
    redirectUri: window.location.origin + window.location.pathname + window.location.search,
    logoutUri:   window.location.origin + '/',
    tokenEndpoint: 'https://t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
  };

  document.documentElement.style.visibility = 'hidden';

  // ─── PKCE HELPERS ────────────────────────────────────────────────────────

  function generateCodeVerifier() {
    var array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function sha256(plain) {
    var encoder = new TextEncoder();
    var data = encoder.encode(plain);
    return crypto.subtle.digest('SHA-256', data);
  }

  function base64UrlEncode(buffer) {
    var bytes = new Uint8Array(buffer);
    var str = '';
    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async function generateCodeChallenge(verifier) {
    var hash = await sha256(verifier);
    return base64UrlEncode(hash);
  }

  // ─── TOKEN HELPERS ───────────────────────────────────────────────────────

  function parseJWT(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (_) { return null; }
  }

  function isExpired(token) {
    var p = parseJWT(token);
    if (!p) return true;
    return Date.now() >= p.exp * 1000;
  }

  function extractUserAttributes(token) {
    var claims = parseJWT(token);
    if (!claims) {
      window.T2C_USER_ID = '';
      window.T2C_USER_EMAIL = '';
      window.T2C_TIER = 'free';
      window.T2C_PDF_PURCHASED = false;
      window.T2C_STRIPE_CUSTOMER_ID = null;
      return;
    }
    window.T2C_USER_ID = claims.sub || '';
    window.T2C_USER_EMAIL = claims.email || '';
    window.T2C_TIER = claims['custom:subscription_tier'] || 'free';
    window.T2C_PDF_PURCHASED = claims['custom:pdf_purchased'] === 'true';
    window.T2C_STRIPE_CUSTOMER_ID = claims['custom:stripe_customer_id'] || null;
  }

  // ─── TOKEN EXCHANGE (PKCE) ──────────────────────────────────────────────

  async function exchangeCodeForTokens(code) {
    var verifier = sessionStorage.getItem('amliq_code_verifier');
    if (!verifier) throw new Error('Missing code_verifier');

    var body = 'grant_type=authorization_code'
      + '&client_id=' + CONFIG.clientId
      + '&code=' + encodeURIComponent(code)
      + '&redirect_uri=' + encodeURIComponent(CONFIG.redirectUri)
      + '&code_verifier=' + encodeURIComponent(verifier);

    var res = await fetch(CONFIG.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
    });

    if (!res.ok) {
      var errText = await res.text();
      throw new Error('Token exchange failed: ' + errText);
    }

    var data = await res.json();
    sessionStorage.removeItem('amliq_code_verifier');
    return data;
  }

  // ─── TOKEN REFRESH ──────────────────────────────────────────────────────

  async function refreshTokens() {
    var refreshToken = sessionStorage.getItem('amliq_refresh_token');
    if (!refreshToken) return false;

    try {
      var body = 'grant_type=refresh_token'
        + '&client_id=' + CONFIG.clientId
        + '&refresh_token=' + encodeURIComponent(refreshToken);

      var res = await fetch(CONFIG.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      });

      if (!res.ok) return false;

      var data = await res.json();
      sessionStorage.setItem('amliq_id_token', data.id_token);
      // Refresh token is not always returned on refresh — keep existing if absent
      if (data.refresh_token) {
        sessionStorage.setItem('amliq_refresh_token', data.refresh_token);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  // ─── LOGIN REDIRECT (PKCE) ──────────────────────────────────────────────

  async function redirectToLogin() {
    sessionStorage.setItem('amliq_return_url', window.location.href);

    var verifier = generateCodeVerifier();
    sessionStorage.setItem('amliq_code_verifier', verifier);

    var challenge = await generateCodeChallenge(verifier);

    window.location.replace(
      'https://' + CONFIG.domain + '/login'
      + '?client_id=' + CONFIG.clientId
      + '&response_type=code'
      + '&scope=email+openid+profile'
      + '&redirect_uri=' + encodeURIComponent(CONFIG.redirectUri)
      + '&code_challenge=' + challenge
      + '&code_challenge_method=S256'
    );
  }

  // ─── SIGN OUT ───────────────────────────────────────────────────────────

  window.amliqSignOut = function () {
    sessionStorage.removeItem('amliq_id_token');
    sessionStorage.removeItem('amliq_refresh_token');
    sessionStorage.removeItem('amliq_return_url');
    sessionStorage.removeItem('amliq_code_verifier');
    window.location.replace(CONFIG.logoutUri);
  };

  // ─── MAIN FLOW ──────────────────────────────────────────────────────────

  async function main() {
    // 1. Handle PKCE authorization code callback (?code=...)
    var urlParams = new URLSearchParams(window.location.search);
    var authCode = urlParams.get('code');
    if (authCode) {
      try {
        var tokens = await exchangeCodeForTokens(authCode);
        sessionStorage.setItem('amliq_id_token', tokens.id_token);
        if (tokens.refresh_token) {
          sessionStorage.setItem('amliq_refresh_token', tokens.refresh_token);
        }
        // Clean URL
        history.replaceState(null, '', window.location.pathname);
        // Handle return URL
        var returnUrl = sessionStorage.getItem('amliq_return_url');
        if (returnUrl && returnUrl !== window.location.href) {
          sessionStorage.removeItem('amliq_return_url');
          window.location.replace(returnUrl);
          return;
        }
      } catch (err) {
        console.error('PKCE token exchange failed:', err);
        // Fall through to redirect to login
      }
    }

    // 2. Handle implicit grant callback (#id_token=...) — backward compatibility
    var hashParams = new URLSearchParams(window.location.hash.substring(1));
    var hashToken = hashParams.get('id_token');
    if (hashToken) {
      sessionStorage.setItem('amliq_id_token', hashToken);
      history.replaceState(null, '', window.location.pathname + window.location.search);
      var returnUrl = sessionStorage.getItem('amliq_return_url');
      if (returnUrl && returnUrl !== window.location.href) {
        sessionStorage.removeItem('amliq_return_url');
        window.location.replace(returnUrl);
        return;
      }
    }

    // 3. Check existing token
    var token = sessionStorage.getItem('amliq_id_token');
    if (token && !isExpired(token)) {
      extractUserAttributes(token);
      document.documentElement.style.visibility = '';
      return;
    }

    // 4. Try refresh
    if (token && isExpired(token)) {
      var refreshed = await refreshTokens();
      if (refreshed) {
        token = sessionStorage.getItem('amliq_id_token');
        extractUserAttributes(token);
        document.documentElement.style.visibility = '';
        return;
      }
    }

    // 5. No valid token — redirect to login
    sessionStorage.removeItem('amliq_id_token');
    sessionStorage.removeItem('amliq_refresh_token');
    redirectToLogin();
  }

  main();
})();
