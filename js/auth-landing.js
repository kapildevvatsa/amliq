(function () {
  var CONFIG = {
    domain:    't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
    clientId:  '31etl7ceunn7p9g3gaipms8rhr',
    redirectUri: window.location.origin + '/',
    logoutUri:   window.location.origin + '/',
  };

  function parseHash() {
    return new URLSearchParams(window.location.hash.substring(1));
  }

  function isExpired(token) {
    try {
      var p = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= p.exp * 1000;
    } catch (_) { return true; }
  }

  // Handle token callback (user returning from Cognito login)
  var hashToken = parseHash().get('id_token');
  if (hashToken) {
    sessionStorage.setItem('amliq_id_token', hashToken);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Public: redirect to Cognito login
  window.t2cLogin = function () {
    sessionStorage.setItem('amliq_return_url', window.location.href);
    window.location.replace(
      'https://' + CONFIG.domain + '/login'
      + '?client_id=' + CONFIG.clientId
      + '&response_type=token'
      + '&scope=email+openid+profile'
      + '&redirect_uri=' + encodeURIComponent(CONFIG.redirectUri)
    );
  };

  // Public: sign out
  window.t2cSignOut = function () {
    sessionStorage.removeItem('amliq_id_token');
    sessionStorage.removeItem('amliq_return_url');
    window.location.replace(CONFIG.logoutUri);
  };

  // Update header button based on auth state
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

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
  } else {
    updateAuthUI();
  }
})();
