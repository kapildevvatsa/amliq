// T2C — Analytics Wrapper (Plausible)
// Provides a safe wrapper around Plausible's custom event tracking.
// If Plausible is not loaded (e.g., ad blocker), calls are silently ignored.

const Analytics = {
  /**
   * Track a custom event.
   * @param {string} event - Event name (e.g., 'Upgrade_Clicked', 'PDF_Generated')
   * @param {Object} [props] - Optional properties (e.g., { feature: 'risk-assessment' })
   */
  track(event, props) {
    if (window.plausible) {
      window.plausible(event, { props: props || {} });
    }
  },
};
