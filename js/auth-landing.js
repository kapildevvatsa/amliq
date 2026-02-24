(function () {
  var CONFIG = {
    domain:    't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
    clientId:  '31etl7ceunn7p9g3gaipms8rhr',
    redirectUri: window.location.origin + '/',
    logoutUri:   window.location.origin + '/',
    tokenEndpoint: 'https://t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
  };

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

  function isExpired(token) {
    try {
      var p = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= p.exp * 1000;
    } catch (_) { return true; }
  }

  async function exchangeCodeForTokens(code) {
    var verifier = sessionStorage.getItem('amliq_code_verifier');
    if (!verifier) return null;

    try {
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

      if (!res.ok) return null;

      var data = await res.json();
      sessionStorage.removeItem('amliq_code_verifier');
      return data;
    } catch (_) {
      return null;
    }
  }

  // ─── HANDLE CALLBACKS ───────────────────────────────────────────────────

  async function handleCallbacks() {
    // PKCE callback (?code=...)
    var urlParams = new URLSearchParams(window.location.search);
    var authCode = urlParams.get('code');
    if (authCode) {
      var tokens = await exchangeCodeForTokens(authCode);
      if (tokens) {
        sessionStorage.setItem('amliq_id_token', tokens.id_token);
        if (tokens.refresh_token) {
          sessionStorage.setItem('amliq_refresh_token', tokens.refresh_token);
        }
      }
      history.replaceState(null, '', window.location.pathname);
    }

    // Implicit grant callback (#id_token=...) — backward compatibility
    var hashParams = new URLSearchParams(window.location.hash.substring(1));
    var hashToken = hashParams.get('id_token');
    if (hashToken) {
      sessionStorage.setItem('amliq_id_token', hashToken);
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  // ─── PUBLIC: Login redirect (PKCE) ──────────────────────────────────────

  window.t2cLogin = async function () {
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
  };

  // ─── PUBLIC: Sign out ───────────────────────────────────────────────────

  window.t2cSignOut = function () {
    sessionStorage.removeItem('amliq_id_token');
    sessionStorage.removeItem('amliq_refresh_token');
    sessionStorage.removeItem('amliq_return_url');
    sessionStorage.removeItem('amliq_code_verifier');
    window.location.replace(CONFIG.logoutUri);
  };

  // ─── UI UPDATE ──────────────────────────────────────────────────────────

  function updateAuthUI() {
    var el = document.getElementById('auth-button');
    if (!el) return;

    var token = sessionStorage.getItem('amliq_id_token');
    var loggedIn = token && !isExpired(token);

    if (loggedIn) {
      el.innerHTML =
        '<button onclick="t2cSignOut()" class="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">Sign Out</button>';
    } else {
      el.innerHTML =
        '<button onclick="t2cLogin()" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Login / Sign Up</button>';
    }
  }

  // ─── INIT ───────────────────────────────────────────────────────────────

  async function init() {
    await handleCallbacks();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateAuthUI);
    } else {
      updateAuthUI();
    }
  }

  init();
})();
