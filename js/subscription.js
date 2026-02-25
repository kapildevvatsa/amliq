// T2C — Subscription Management, Feature Gating & Payment Links
// Depends on: auth.js (sets window.T2C_TIER, T2C_USER_ID, T2C_USER_EMAIL, T2C_PDF_PURCHASED)

const Subscription = {

  // ─── CONFIGURATION ──────────────────────────────────────────────────────────
  // Replace placeholder URLs with real Stripe Payment Link URLs after creating
  // them in Stripe Dashboard (see MANUAL-SETUP-GUIDE.md Section 3).
  PAYMENT_LINKS: {
    pro_monthly: 'https://buy.stripe.com/test_aFaaEXfyz9Uk68r0Cx00001',
    pro_annual:  'https://buy.stripe.com/test_9B65kDaef7MceEX70V00000',
    pdf_onetime: 'https://buy.stripe.com/test_dRmcN59ab7McgN55WR00002',
  },

  // Replace with your Stripe Customer Portal link from Dashboard
  // (see MANUAL-SETUP-GUIDE.md Section 4).
  CUSTOMER_PORTAL_URL: 'https://billing.stripe.com/p/login/test_9B65kDaef7MceEX70V00000',

  // Replace with your API Gateway base URL after deployment
  // (see MANUAL-SETUP-GUIDE.md Section 12).
  API_BASE_URL: 'https://hl2mufk857.execute-api.ap-southeast-2.amazonaws.com/prod',

  // ─── PRO SECTIONS ──────────────────────────────────────────────────────────
  // Sections that require a Pro subscription. Everything else is free.
  PRO_SECTIONS: new Set([
    'risk-assessment',
    'program-builder',
    'cdd',
    'governance',
    'forms-library',
    'starter-kit-forms',
    'customer-examples',
    'record-keeping',
    'training',
    'program-review',
    'evaluation',
  ]),

  // ─── ACCESS CHECKS ─────────────────────────────────────────────────────────

  canAccess(sectionId) {
    if (!this.PRO_SECTIONS.has(sectionId)) return true;
    return window.T2C_TIER === 'pro';
  },

  canGeneratePDF() {
    return window.T2C_TIER === 'pro' || window.T2C_PDF_PURCHASED === true;
  },

  getTier() {
    return window.T2C_TIER || 'free';
  },

  isPro() {
    return window.T2C_TIER === 'pro';
  },

  // ─── PAYMENT LINK URLS ─────────────────────────────────────────────────────

  getCheckoutUrl(priceType) {
    var baseUrl = this.PAYMENT_LINKS[priceType];
    if (!baseUrl) return '#';
    var userId = window.T2C_USER_ID || '';
    var email = window.T2C_USER_EMAIL || '';
    return baseUrl
      + '?client_reference_id=' + encodeURIComponent(userId)
      + '&prefilled_email=' + encodeURIComponent(email);
  },

  openCheckout(priceType) {
    if (typeof Analytics !== 'undefined') {
      Analytics.track('Checkout_Started', { purchase_type: priceType });
    }
    // Flag that a checkout is in progress so we can detect the return
    // even if the Stripe redirect URL lacks ?checkout_success=1
    sessionStorage.setItem('amliq_checkout_pending', '1');
    window.open(this.getCheckoutUrl(priceType), '_self');
  },

  openCustomerPortal() {
    window.open(this.CUSTOMER_PORTAL_URL, '_blank');
  },

  // ─── LOCKED OVERLAY ─────────────────────────────────────────────────────────

  renderLockedOverlay(sectionId) {
    var target = document.getElementById('section-' + sectionId);
    if (!target) return;

    // Track that the user hit a paywall
    if (typeof Analytics !== 'undefined') {
      Analytics.track('Feature_Gated', { feature: sectionId, current_tier: this.getTier() });
    }

    target.classList.remove('hidden');
    target.innerHTML = '<div class="locked-overlay">'
      + '<div class="locked-overlay-content">'
      + '<div class="locked-overlay-icon">&#128274;</div>'
      + '<h2 class="text-2xl font-bold text-slate-800 mb-2">Pro Feature</h2>'
      + '<p class="text-slate-600 mb-6 max-w-md mx-auto">'
      + 'Unlock risk assessment, program builder, CDD forms, governance tools, '
      + 'training quizzes, and 15+ professional templates with a Pro subscription.'
      + '</p>'
      + '<div class="flex flex-col sm:flex-row gap-3 justify-center">'
      + '<button onclick="Subscription.openCheckout(\'pro_monthly\')" '
      + 'class="upgrade-btn-primary">Start Free Trial &mdash; $29/month</button>'
      + '<button onclick="Subscription.openCheckout(\'pro_annual\')" '
      + 'class="upgrade-btn-secondary">Annual &mdash; $249/year (save 30%)</button>'
      + '</div>'
      + '<p class="text-sm text-slate-500 mt-4">'
      + 'Or <button onclick="Subscription.openCheckout(\'pdf_onetime\')" '
      + 'class="text-blue-600 underline hover:text-blue-800">buy just the Program PDF for $149</button> (one-time)'
      + '</p>'
      + '<p class="text-xs text-slate-400 mt-2">14-day free trial on all subscriptions. Cancel anytime.</p>'
      + '</div>'
      + '</div>';
  },

  // ─── SIDEBAR ENHANCEMENTS ──────────────────────────────────────────────────

  /**
   * Call after sidebar HTML is rendered.
   * Adds lock icons to Pro sections in the nav and an upgrade/manage button.
   */
  enhanceSidebar() {
    // Add lock icons to Pro section nav links
    if (!this.isPro()) {
      document.querySelectorAll('.nav-link').forEach(function (link) {
        var section = link.dataset.section;
        if (Subscription.PRO_SECTIONS.has(section)) {
          // Only add once
          if (!link.querySelector('.pro-lock-icon')) {
            var lock = document.createElement('span');
            lock.className = 'pro-lock-icon';
            lock.textContent = '\u{1F512}';
            lock.title = 'Pro feature';
            link.appendChild(lock);
          }
        }
      });
    }

    // Add upgrade or manage button to sidebar
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Remove any existing subscription button
    var existing = document.getElementById('sidebar-subscription-btn');
    if (existing) existing.remove();

    var container = document.createElement('div');
    container.id = 'sidebar-subscription-btn';
    container.className = 'sidebar-subscription-container';

    if (this.isPro()) {
      container.innerHTML = '<button onclick="Subscription.openCustomerPortal()" '
        + 'class="sidebar-manage-btn">Manage Subscription</button>';
    } else {
      container.innerHTML = '<button onclick="Subscription.openCheckout(\'pro_monthly\')" '
        + 'class="sidebar-upgrade-btn">'
        + '<span>Upgrade to Pro</span>'
        + '<span class="text-xs opacity-80">14-day free trial</span>'
        + '</button>';
    }

    // Insert before the sign-out link or at the end of nav
    var nav = sidebar.querySelector('nav');
    if (nav) {
      nav.parentNode.insertBefore(container, nav.nextSibling);
    } else {
      sidebar.appendChild(container);
    }
  },

  // ─── POST-CHECKOUT ACTIVATION ──────────────────────────────────────────────

  /**
   * Call on page load. If ?checkout_success=1 is in URL or the checkout
   * pending flag is set, show a spinner and poll. Returns true if handled.
   */
  handlePostCheckout() {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get('checkout_success') === '1';
    var fromFlag = sessionStorage.getItem('amliq_checkout_pending') === '1';

    if (!fromUrl && !fromFlag) return false;

    // Clean up both signals
    sessionStorage.removeItem('amliq_checkout_pending');
    if (fromUrl) {
      var cleanUrl = window.location.pathname;
      history.replaceState(null, '', cleanUrl);
    }

    // If tier is already pro (JWT was fresh), skip polling
    if (this.isPro()) {
      this._showActivationSuccess();
      return true;
    }

    this._showActivationSpinner();
    this._pollSubscription(0);
    return true;
  },

  /**
   * Background sync: if the user is logged in but on the free tier, refresh
   * the Cognito token to pick up any attribute changes (e.g. subscription_tier
   * set to 'pro' by the Stripe webhook). This avoids calling the API Gateway
   * and any CORS issues — it talks directly to the Cognito token endpoint.
   */
  _syncSubscriptionStatus() {
    if (!window.T2C_USER_ID || this.isPro()) return;
    if (typeof window.amliqRefreshTokens !== 'function') return;

    var self = this;
    window.amliqRefreshTokens().then(function () {
      // amliqRefreshTokens() already called extractUserAttributes(),
      // so T2C_TIER and T2C_PDF_PURCHASED are now up-to-date.
      if (self.isPro() || window.T2C_PDF_PURCHASED === true) {
        self._showActivationSuccess();
        if (typeof App !== 'undefined') {
          App.renderAllSections();
          self.enhanceSidebar();
          App.navigateTo(App.currentSection);
        }
      }
    });
  },

  _showActivationSpinner() {
    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'activation-overlay';
    overlay.className = 'activation-overlay';
    overlay.innerHTML = '<div class="activation-box">'
      + '<div class="activation-spinner"></div>'
      + '<h3 class="text-lg font-semibold text-slate-800 mt-4">Activating your subscription...</h3>'
      + '<p class="text-sm text-slate-500 mt-1">This usually takes a few seconds.</p>'
      + '</div>';
    document.body.appendChild(overlay);
  },

  _showActivationSuccess() {
    var overlay = document.getElementById('activation-overlay');
    if (overlay) overlay.remove();

    // Show toast notification
    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast('Subscription activated! All Pro features are now unlocked.');
    }

    // Track successful activation
    if (typeof Analytics !== 'undefined') {
      Analytics.track('Pro_Active', { billing_period: 'unknown' });
    }
  },

  _showActivationRetry() {
    var overlay = document.getElementById('activation-overlay');
    if (!overlay) return;
    overlay.innerHTML = '<div class="activation-box">'
      + '<h3 class="text-lg font-semibold text-slate-800">Almost there!</h3>'
      + '<p class="text-sm text-slate-500 mt-2 mb-4">'
      + 'Your payment was successful. It may take a moment to activate.'
      + '</p>'
      + '<button onclick="Subscription._retryActivation()" '
      + 'class="upgrade-btn-primary">Check Again</button>'
      + '<p class="text-xs text-slate-400 mt-3">'
      + 'If this persists, try logging out and back in.'
      + '</p>'
      + '</div>';
  },

  _retryActivation() {
    var overlay = document.getElementById('activation-overlay');
    if (overlay) {
      overlay.innerHTML = '<div class="activation-box">'
        + '<div class="activation-spinner"></div>'
        + '<h3 class="text-lg font-semibold text-slate-800 mt-4">Checking...</h3>'
        + '</div>';
    }
    this._pollSubscription(0);
  },

  _pollSubscription(attempt) {
    var maxAttempts = 5;
    var delayMs = 2000;

    if (attempt >= maxAttempts) {
      this._showActivationRetry();
      return;
    }

    var self = this;
    var token = sessionStorage.getItem('amliq_id_token');

    fetch(this.API_BASE_URL + '/subscription', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + (token || ''),
      },
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.tier === 'pro' || data.pdf_purchased === true) {
        // Update globals
        if (data.tier === 'pro') window.T2C_TIER = 'pro';
        if (data.pdf_purchased) window.T2C_PDF_PURCHASED = true;

        // Force token refresh so the JWT has updated claims for future page loads
        // Await the refresh before re-rendering to ensure the new token is saved
        var refreshDone = (typeof window.amliqRefreshTokens === 'function')
          ? window.amliqRefreshTokens()
          : Promise.resolve();

        Promise.resolve(refreshDone).then(function () {
          self._showActivationSuccess();

          // Re-render the page with updated tier
          if (typeof App !== 'undefined') {
            App.renderAllSections();
            self.enhanceSidebar();
            App.navigateTo(App.currentSection);
          }
        });
      } else {
        setTimeout(function () {
          self._pollSubscription(attempt + 1);
        }, delayMs);
      }
    })
    .catch(function () {
      setTimeout(function () {
        self._pollSubscription(attempt + 1);
      }, delayMs);
    });
  },

  // ─── INIT ──────────────────────────────────────────────────────────────────

  /**
   * Call after auth.js has run and App has initialized.
   */
  init() {
    this.enhanceSidebar();
    var checkoutHandled = this.handlePostCheckout();
    // If no explicit checkout signal was detected, do a background sync
    // to catch cases where Stripe redirected to a different domain
    if (!checkoutHandled) {
      this._syncSubscriptionStatus();
    }
  },
};
