(function () {
  var CONFIG = {
    domain:      't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
    clientId:    '31etl7ceunn7p9g3gaipms8rhr',
    redirectUri: window.location.origin + window.location.pathname + window.location.search,
    logoutUri:   window.location.origin + '/',
  };

  document.documentElement.style.visibility = 'hidden';

  function parseHash() {
    return new URLSearchParams(window.location.hash.substring(1));
  }

  function isExpired(token) {
    try {
      var p = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= p.exp * 1000;
    } catch (_) { return true; }
  }

  function redirectToLogin() {
    sessionStorage.setItem('amliq_return_url', window.location.href);
    window.location.replace(
      'https://' + CONFIG.domain + '/login'
      + '?client_id=' + CONFIG.clientId
      + '&response_type=token'
      + '&scope=email+openid+profile'
      + '&redirect_uri=' + encodeURIComponent(CONFIG.redirectUri)
    );
  }

  window.amliqSignOut = function () {
    sessionStorage.removeItem('amliq_id_token');
    sessionStorage.removeItem('amliq_return_url');
    window.location.replace(
      'https://' + CONFIG.domain + '/logout'
      + '?client_id=' + CONFIG.clientId
      + '&redirect_uri=' + encodeURIComponent(CONFIG.logoutUri)
    );
  };

  var hashToken = parseHash().get('id_token');
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

  var token = sessionStorage.getItem('amliq_id_token');
  if (!token || isExpired(token)) {
    sessionStorage.removeItem('amliq_id_token');
    redirectToLogin();
    return;
  }

  document.documentElement.style.visibility = '';
})();
