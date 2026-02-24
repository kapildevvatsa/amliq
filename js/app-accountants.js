// T2C for Accountants — Core Application Logic
// Navigation, section rendering, dashboard, state management

const App = {

  currentSection: 'dashboard',
  countdownInterval: null,
  legalAccepted: false,
  legalGateActive: false,

  // ─── INIT ─────────────────────────────────────────────────────────────────
  init() {
    this.bindNavLinks();
    this.renderAllSections();
    this.showLegalGate();
  },

  setLegalGateAcceptedForTesting() {
    this.legalAccepted = true;
  },

  showLegalGate() {
    if (this.legalAccepted) {
      this.finishInitAfterLegalAcceptance();
      return;
    }

    this.legalGateActive = true;
    this.showModal(
      'Terms + Disclosure Acceptance',
      `
        <div class="space-y-4 text-sm text-slate-700">
          <p class="font-semibold text-slate-900">You must accept before entering this tool.</p>
          <p>
            This website is an educational aid only and is not legal, tax, financial, or compliance advice.
            Content may become outdated or incomplete. You must verify obligations directly with AUSTRAC and
            seek independent professional advice before acting.
          </p>
          <p>
            By continuing, you confirm you have read and understood the
            <a href="disclaimer.html" class="underline font-medium text-blue-700" target="_blank" rel="noopener noreferrer">Disclaimer</a>,
            <a href="terms.html" class="underline font-medium text-blue-700" target="_blank" rel="noopener noreferrer">Terms of Use</a>, and
            <a href="privacy.html" class="underline font-medium text-blue-700" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
          <p class="text-xs text-slate-500">
            Acceptance applies to this page visit only and is required again after refresh/reload.
          </p>
        </div>
      `,
      `
        <button onclick="App.declineLegalGate()" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">
          Decline
        </button>
        <button onclick="App.acceptLegalGate()" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Accept
        </button>
      `
    );
    this.setLegalGateModalState(true);
  },

  acceptLegalGate() {
    this.legalAccepted = true;
    this.legalGateActive = false;
    this.setLegalGateModalState(false);
    this.closeModal();
    this.finishInitAfterLegalAcceptance();
  },

  declineLegalGate() {
    window.location.href = 'index.html';
  },

  finishInitAfterLegalAcceptance() {
    this.navigateTo('dashboard');
    this.startCountdown();
    this.updateAllProgress();
  },

  setLegalGateModalState(isLocked) {
    const overlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');
    const closeBtn = document.getElementById('modal-close-btn') || document.querySelector('#modal-box button[onclick="App.closeModal()"]');

    if (overlay) overlay.style.padding = isLocked ? '0' : '';
    if (modalBox) {
      modalBox.style.maxWidth = isLocked ? '100vw' : '';
      modalBox.style.width = isLocked ? '100vw' : '';
      modalBox.style.maxHeight = isLocked ? '100vh' : '';
      modalBox.style.height = isLocked ? '100vh' : '';
      modalBox.style.borderRadius = isLocked ? '0' : '';
    }
    if (closeBtn) closeBtn.style.display = isLocked ? 'none' : '';
  },

  // ─── NAVIGATION ───────────────────────────────────────────────────────────
  bindNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const section = link.dataset.section;
        this.navigateTo(section);
        if (window.innerWidth < 1024) {
          document.getElementById('sidebar').classList.remove('open');
        }
      });
    });
  },

  navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
    this.currentSection = sectionId;
    window.scrollTo(0, 0);
  },

  // ─── RENDER ALL SECTIONS ──────────────────────────────────────────────────
  renderAllSections() {
    this.renderDashboard();
    this.renderAmIRegulated();
    this.renderObligationsOverview();
    this.renderKeyDates();
    this.renderRiskAssessment();
    this.renderProgramBuilder();
    this.renderGovernance();
    this.renderEnrolment();
    this.renderCDD();
    this.renderClientRiskRating();
    this.renderRedFlags();
    this.renderReporting();
    this.renderRecordKeeping();
    this.renderTraining();
    this.renderProgramReview();
    this.renderEvaluation();
    this.renderFormsLibrary();
    this.renderStarterKitForms();
    this.renderGlossary();
    this.renderFAQ();
    this.renderAustracLinks();
  },

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  renderDashboard() {
    const el = document.getElementById('section-dashboard');
    const today = new Date();
    let nudge = '';
    if (today < new Date('2026-03-31')) {
      nudge = { icon: '📚', text: 'Determine if your practice provides designated services and start building your AML/CTF program. Use the Service Checker to identify which of the 8 designated services you provide.', btn: 'Check My Services', sec: 'am-i-regulated' };
    } else if (today <= new Date('2026-06-30')) {
      nudge = { icon: '📝', text: 'Enrolment is now open — enrol with AUSTRAC and finalise your program before 1 July 2026.', btn: 'Go to Enrolment Guide', sec: 'enrolment' };
    } else {
      nudge = { icon: '⚠️', text: 'Your obligations are now live. Ensure you are conducting CDD on every designated service client and monitoring for suspicious activity.', btn: 'CDD Checklists', sec: 'cdd' };
    }

    el.innerHTML = `
      <div class="p-6 max-w-5xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">AML/CTF Compliance Dashboard</h1>
          <p class="text-slate-500 mt-1">Your overview for meeting AUSTRAC's accountant obligations from 1 July 2026.</p>
        </div>

        <!-- Countdown -->
        <div class="bg-slate-900 text-white rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="text-sm text-slate-400 mb-1">Obligations commence</div>
            <div class="text-xl font-bold">1 July 2026</div>
          </div>
          <div id="countdown-timer" class="flex gap-3">
            <div class="time-block"><div class="number" id="cd-days">--</div><div class="label">Days</div></div>
            <div class="time-block"><div class="number" id="cd-hours">--</div><div class="label">Hours</div></div>
            <div class="time-block"><div class="number" id="cd-mins">--</div><div class="label">Mins</div></div>
            <div class="time-block"><div class="number" id="cd-secs">--</div><div class="label">Secs</div></div>
          </div>
        </div>

        <!-- Today Nudge -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span class="text-2xl">${nudge.icon}</span>
          <div class="flex-1">
            <div class="font-semibold text-blue-800 mb-1">What should I do today?</div>
            <div class="text-blue-700 text-sm mb-2">${nudge.text}</div>
            <button onclick="App.navigateTo('${nudge.sec}')" class="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">${nudge.btn}</button>
          </div>
        </div>

        <!-- Overall Progress -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div class="flex items-center justify-between mb-3">
            <div class="font-semibold text-slate-700">Overall Compliance Readiness</div>
            <div class="text-2xl font-bold text-blue-600" id="overall-score">0%</div>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-3">
            <div class="progress-bar bg-blue-500 h-3 rounded-full" id="overall-bar" style="width:0%"></div>
          </div>
          <div class="text-xs text-slate-400 mt-2">Based on completed checklist items across all phases.</div>
        </div>

        <!-- Phase Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          ${[
            { phase: 1, title: 'Understand', icon: '📚', color: 'blue', sections: ['am-i-regulated', 'obligations-overview', 'key-dates'], keys: [] },
            { phase: 2, title: 'Build Program', icon: '🏗️', color: 'purple', sections: ['risk-assessment', 'program-builder', 'governance', 'enrolment'], keys: ['enrolment', 'riskAssessment', 'governance', 'seniorApproval'] },
            { phase: 3, title: 'Implement', icon: '⚙️', color: 'amber', sections: ['cdd', 'client-risk-rating', 'red-flags', 'reporting', 'record-keeping', 'training'], keys: ['cddProcedures', 'monitoring', 'reporting', 'recordKeeping', 'training'] },
            { phase: 4, title: 'Maintain', icon: '🔄', color: 'green', sections: ['program-review', 'evaluation'], keys: ['programReview', 'evaluation'] },
          ].map(p => `
            <div class="phase-card cursor-pointer" onclick="App.navigateTo('${p.sections[0]}')">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">${p.icon}</span>
                <div>
                  <div class="text-xs text-slate-500 font-medium">Phase ${p.phase}</div>
                  <div class="font-semibold text-slate-700">${p.title}</div>
                </div>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mb-1">
                <div class="progress-bar bg-${p.color}-500 h-2 rounded-full" id="phase-${p.phase}-bar" style="width:0%"></div>
              </div>
              <div class="text-xs text-slate-500"><span id="phase-${p.phase}-pct">0%</span> complete</div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Access -->
        <div class="mb-4">
          <h2 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Access</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${[
              { icon: '🔍', title: 'Service Checker', sec: 'am-i-regulated', color: 'blue' },
              { icon: '🪪', title: 'CDD Forms', sec: 'cdd', color: 'blue' },
              { icon: '🚩', title: 'Red Flags', sec: 'red-flags', color: 'red' },
              { icon: '✅', title: 'Enrolment', sec: 'enrolment', color: 'green' },
            ].map(q => `
              <button onclick="App.navigateTo('${q.sec}')" class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-${q.color}-400 hover:shadow-sm transition-all">
                <div class="text-2xl mb-2">${q.icon}</div>
                <div class="text-sm font-semibold text-slate-700">${q.title}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Key Dates -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h2 class="font-semibold text-slate-700 mb-3">Key Upcoming Dates</h2>
          <div class="space-y-2">
            ${[
              { date: '31 March 2026', event: 'AUSTRAC enrolment opens', badge: 'bg-blue-100 text-blue-700' },
              { date: '1 July 2026', event: 'AML/CTF obligations commence — all requirements apply from this date', badge: 'bg-red-100 text-red-700' },
              { date: '29 July 2026', event: 'Latest enrolment deadline (28 days after obligations commence)', badge: 'bg-amber-100 text-amber-700' },
            ].map(d => `
              <div class="flex items-start gap-3">
                <span class="tag ${d.badge} flex-shrink-0">${d.date}</span>
                <span class="text-sm text-slate-600">${d.event}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-6 text-xs text-slate-400 text-center">
          T2C — Not legal advice. All data stored locally. Last reviewed: February 2026.
          Always refer to <a href="https://www.austrac.gov.au" target="_blank" class="underline">austrac.gov.au</a> for the most current guidance.
        </div>
      </div>
    `;
  },

  // ─── COUNTDOWN ────────────────────────────────────────────────────────────
  startCountdown() {
    const target = new Date('2026-07-01T00:00:00+10:00');
    const update = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        document.getElementById('cd-days').textContent = '0';
        document.getElementById('cd-hours').textContent = '0';
        document.getElementById('cd-mins').textContent = '0';
        document.getElementById('cd-secs').textContent = '0';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      const d = document.getElementById('cd-days');
      const h = document.getElementById('cd-hours');
      const m = document.getElementById('cd-mins');
      const s = document.getElementById('cd-secs');
      if (d) d.textContent = String(days);
      if (h) h.textContent = String(hours).padStart(2, '0');
      if (m) m.textContent = String(mins).padStart(2, '0');
      if (s) s.textContent = String(secs).padStart(2, '0');
    };
    update();
    this.countdownInterval = setInterval(update, 1000);
  },

  // ─── PROGRESS TRACKING ────────────────────────────────────────────────────
  updateAllProgress() {
    const allKeys = Object.keys(AMLiqData.checklists);
    let total = 0, done = 0;
    allKeys.forEach(k => {
      AMLiqData.checklists[k].forEach(item => {
        total++;
        if (localStorage.getItem('check_' + item.id) === '1') done++;
      });
    });
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const scoreEl = document.getElementById('overall-score');
    const barEl = document.getElementById('overall-bar');
    if (scoreEl) scoreEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';

    const phaseKeys = [
      [],
      ['enrolment', 'riskAssessment', 'governance', 'seniorApproval'],
      ['cddProcedures', 'monitoring', 'reporting', 'recordKeeping', 'training'],
      ['programReview', 'evaluation']
    ];
    for (let p = 1; p <= 4; p++) {
      let pt = 0, pd = 0;
      phaseKeys[p].forEach(k => {
        if (!AMLiqData.checklists[k]) return;
        AMLiqData.checklists[k].forEach(item => {
          pt++;
          if (localStorage.getItem('check_' + item.id) === '1') pd++;
        });
      });
      const pp = pt > 0 ? Math.round((pd / pt) * 100) : 0;
      const bar = document.getElementById(`phase-${p}-bar`);
      const pctEl = document.getElementById(`phase-${p}-pct`);
      if (bar) bar.style.width = pp + '%';
      if (pctEl) pctEl.textContent = pp + '%';
    }
  },

  // ─── AM I REGULATED — SERVICE CHECKER ─────────────────────────────────────
  serviceCheckerQuestions: [
    { id: 1, service: 'Real estate transaction assistance', question: 'Does your practice help clients buy, sell, or transfer real estate (beyond just preparing their tax return)?', hint: 'E.g. structuring property acquisitions, CGT planning for property sales, advising on property investment structures' },
    { id: 2, service: 'Business/company transaction assistance', question: 'Does your practice help clients buy, sell, or transfer a business, company, or partnership interest?', hint: 'E.g. M&A advisory, share sale structuring, partnership buy-ins, business succession planning involving ownership transfers' },
    { id: 3, service: 'Managing client property for a transaction', question: 'Does your practice hold, manage, or control client funds or assets to help execute a transaction?', hint: 'E.g. holding settlement funds in a trust account, managing client monies during a business sale' },
    { id: 4, service: 'Equity/debt financing assistance', question: 'Does your practice help clients obtain or structure financing (equity or debt) for a company, trust, or other entity?', hint: 'E.g. preparing financials for bank loans, structuring capital raises, advising on funding options' },
    { id: 5, service: 'Shelf company sale/transfer', question: 'Does your practice sell or transfer shelf companies to clients?', hint: 'A shelf company is a pre-registered company that has never traded' },
    { id: 6, service: 'Creating or restructuring entities', question: 'Does your practice help clients create or restructure companies, trusts, partnerships, SMSFs, or other legal structures?', hint: 'E.g. company incorporation, trust establishment, SMSF setup, corporate restructuring, entity deregistration' },
    { id: 7, service: 'Nominee/officer services', question: 'Does your practice act as a nominee director, secretary, trustee, or arrange for someone to fill these roles for a client?', hint: 'This includes arranging for a staff member to be a company secretary or appointing a trustee' },
    { id: 8, service: 'Registered office address', question: "Does your practice provide its address as the registered office or principal place of business for any client entity?", hint: "Letting a client's company use your firm's address as its registered office with ASIC" },
  ],

  renderAmIRegulated() {
    const el = document.getElementById('section-am-i-regulated');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Am I Regulated?', 'Determine if your accounting practice provides designated services under the AML/CTF reforms.', '🔍')}

        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Key concept:</strong> AML/CTF obligations are triggered when you provide any of the <strong>8 designated services</strong>. Many routine accounting services (tax returns, BAS, bookkeeping, payroll) are <strong>exempt</strong>. Use the service checker below to determine if your practice is captured.
        </div>

        <!-- The 8 Designated Services -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">The 8 Designated Services for Accountants</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead><tr class="bg-slate-50 text-left">
                  <th class="px-2 py-2 font-semibold text-slate-600 w-8">#</th>
                  <th class="px-2 py-2 font-semibold text-slate-600">Designated Service</th>
                  <th class="px-2 py-2 font-semibold text-slate-600">Typical Examples</th>
                </tr></thead>
                <tbody class="divide-y divide-slate-100">
                  ${[
                    ['1', 'Assisting in real estate transactions', 'Advising on property acquisition structures, CGT planning for property sales'],
                    ['2', 'Assisting in buying/selling a business or company', 'M&A due diligence, share sale vs asset sale, partnership buy-ins'],
                    ['3', 'Managing client property for a transaction', 'Holding settlement funds in trust accounts, managing client money during a sale'],
                    ['4', 'Assisting with equity/debt financing', 'Preparing financials for loan applications, structuring capital raises'],
                    ['5', 'Selling or transferring a shelf company', 'Selling pre-registered companies to clients'],
                    ['6', 'Creating or restructuring entities', 'Setting up companies, trusts, SMSFs, partnerships; restructuring entities'],
                    ['7', 'Acting as or arranging nominee officers', 'Nominee director, company secretary, trustee arrangements'],
                    ['8', 'Providing a registered office address', "Letting clients use your firm's address as registered office with ASIC"],
                  ].map(([n, svc, ex]) => `<tr><td class="px-2 py-2 font-bold text-slate-500">${n}</td><td class="px-2 py-2 font-medium text-slate-700">${svc}</td><td class="px-2 py-2 text-slate-600">${ex}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Interactive Service Checker -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-bold text-slate-800 mb-1">Interactive Service Checker</h3>
          <p class="text-sm text-slate-500 mb-4">Answer each question to determine which designated services your practice provides.</p>
          <div id="service-checker-container">${this.renderServiceChecker()}</div>
        </div>

        <!-- Exempt vs Designated -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Exempt vs. Designated — Quick Reference</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead><tr class="bg-slate-50 text-left">
                  <th class="px-2 py-2 font-semibold text-slate-600">Service</th>
                  <th class="px-2 py-2 font-semibold text-slate-600 w-28">Status</th>
                </tr></thead>
                <tbody class="divide-y divide-slate-100">
                  ${[
                    ['Tax return preparation', 'Exempt'], ['BAS agent / GST work', 'Exempt'], ['Bookkeeping', 'Exempt'],
                    ['Payroll processing', 'Exempt'], ['Financial statement preparation', 'Exempt'], ['Audit and assurance', 'Exempt'],
                    ['General tax advisory', 'Exempt'], ['Setting up a new company', 'Designated'], ['Setting up a trust or SMSF', 'Designated'],
                    ['Business sale advisory (M&A)', 'Designated'], ['Acting as a nominee director', 'Designated'],
                    ['Providing registered office', 'Designated'], ['Holding client funds in trust', 'Designated'],
                    ['Structuring a loan application', 'Designated'], ['Selling a shelf company', 'Designated'],
                    ['CGT planning for property sale', 'Potentially'],
                  ].map(([svc, status]) => `<tr><td class="px-2 py-2 text-slate-700">${svc}</td><td class="px-2 py-2"><span class="tag ${status === 'Exempt' ? 'bg-green-100 text-green-700' : status === 'Designated' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}">${status}</span></td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Geographical Link -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Geographical Link Requirement</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <p class="text-sm text-slate-600 mb-3">AML/CTF obligations only apply when a designated service has a <strong>geographical link to Australia</strong>.</p>
            <div class="overflow-x-auto mb-3">
              <table class="w-full text-xs">
                <thead><tr class="bg-slate-50"><th class="px-2 py-2 text-left font-semibold text-slate-600">Link Exists When...</th><th class="px-2 py-2 text-left font-semibold text-slate-600">Example</th></tr></thead>
                <tbody class="divide-y divide-slate-100">
                  ${[
                    ['Service provided in Australia', 'Setting up an Australian company from your Sydney office'],
                    ['Service provided from Australia to overseas', 'Setting up a trust for an overseas client from your Melbourne office'],
                    ['Service provided to Australia from overseas', 'Overseas accountant sets up an Australian entity remotely'],
                    ['Transaction involves Australian entities or assets', 'Assisting in the purchase of Australian property'],
                  ].map(([w, ex]) => `<tr><td class="px-2 py-2 text-slate-700">${w}</td><td class="px-2 py-2 text-slate-600">${ex}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
            <p class="text-sm text-slate-500">Most Australian accounting practices will have a geographical link. See <a href="https://www.austrac.gov.au/business/new-to-austrac/geographical-link-requirement" target="_blank" class="underline text-blue-600">AUSTRAC's geographical link guidance</a>.</p>
          </div>
        </div>

        <!-- Reporting Groups -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Reporting Groups (Larger Firms)</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <p class="text-sm text-slate-600 mb-3">Larger accounting firms or firms that are part of a corporate group may form a <strong>reporting group</strong>.</p>
            <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside mb-3">
              <li>Two or more reporting entities may form a group if they share common ownership or control</li>
              <li>A reporting group may adopt a <strong>joint AML/CTF program</strong> covering all entities</li>
              <li>The group must nominate a <strong>lead entity</strong> responsible for the joint program</li>
            </ul>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              <strong>Note:</strong> The AUSTRAC Accounting Program Starter Kit is designed for practices with <strong>15 or fewer personnel</strong> that are not part of a reporting group. Larger firms should seek tailored compliance advice.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderServiceChecker() {
    return `
      <div class="space-y-3">
        ${this.serviceCheckerQuestions.map(s => {
          const saved = localStorage.getItem('amliq_acct_sc_' + s.id);
          return `
            <div class="border ${saved === 'yes' ? 'border-red-200 bg-red-50' : saved === 'no' ? 'border-green-200 bg-green-50' : 'border-slate-200'} rounded-xl p-4" id="sc-card-${s.id}">
              <div class="flex items-start gap-3">
                <span class="tag bg-slate-100 text-slate-600 flex-shrink-0">Service ${s.id}</span>
                <div class="flex-1">
                  <div class="font-semibold text-sm text-slate-800 mb-1">${s.question}</div>
                  <div class="text-xs text-slate-400 italic mb-3">${s.hint}</div>
                  <div class="flex gap-2">
                    <button onclick="App.serviceCheck(${s.id}, 'yes')" class="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${saved === 'yes' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'}">YES</button>
                    <button onclick="App.serviceCheck(${s.id}, 'no')" class="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${saved === 'no' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-200 hover:border-green-300'}">NO</button>
                  </div>
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>
      <div id="sc-result" class="mt-5">${this.renderServiceCheckerResult()}</div>
    `;
  },

  serviceCheck(serviceId, answer) {
    localStorage.setItem('amliq_acct_sc_' + serviceId, answer);
    document.getElementById('service-checker-container').innerHTML = this.renderServiceChecker();
  },

  renderServiceCheckerResult() {
    const results = this.serviceCheckerQuestions.map(s => ({
      id: s.id, service: s.service,
      answer: localStorage.getItem('amliq_acct_sc_' + s.id),
    }));
    const answered = results.filter(r => r.answer !== null);
    const triggered = results.filter(r => r.answer === 'yes');

    if (answered.length === 0) return '';

    if (triggered.length > 0) {
      return `
        <div class="decision-node result-regulated">
          <div class="flex items-center gap-2 mb-3"><span class="text-2xl">⚠️</span><h3 class="font-bold text-lg">Your practice provides ${triggered.length} designated service${triggered.length > 1 ? 's' : ''}</h3></div>
          <div class="mb-3">${triggered.map(t => `<div class="flex items-center gap-2 text-sm text-red-700 mb-1"><span class="tag bg-red-100 text-red-700">Service ${t.id}</span><span>${t.service}</span></div>`).join('')}</div>
          <p class="text-sm mb-3">You will need to <strong>enrol with AUSTRAC</strong> and implement a full <strong>AML/CTF program</strong> covering all designated service activities.</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <button onclick="App.navigateTo('obligations-overview')" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">View All Obligations</button>
            <button onclick="App.navigateTo('enrolment')" class="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">Enrolment Guide</button>
          </div>
          <div class="mt-4 p-3 bg-white/60 rounded-lg text-xs text-slate-500 border border-slate-200"><strong>Note:</strong> This is a preliminary assessment. Confirm with official AUSTRAC Accounting Guidance and seek professional advice if unsure.</div>
        </div>
        <button onclick="App.resetServiceChecker()" class="mt-3 text-sm text-blue-600 hover:underline">← Reset service checker</button>`;
    }

    if (answered.length === 8) {
      return `
        <div class="decision-node result-exempt">
          <div class="flex items-center gap-2 mb-3"><span class="text-2xl">✅</span><h3 class="font-bold text-lg">Based on your answers, your practice may not be captured</h3></div>
          <p class="text-sm mb-3">Your answers suggest you may not be providing any designated services. If your practice provides <strong>only</strong> exempt services (tax returns, BAS, bookkeeping, payroll), you likely do not have AML/CTF obligations.</p>
          <p class="text-sm">However, review AUSTRAC's guidance to confirm, and reconsider if your services change.</p>
          <div class="mt-4 p-3 bg-white/60 rounded-lg text-xs text-slate-500 border border-slate-200"><strong>Note:</strong> This is a preliminary indication only. Always confirm with AUSTRAC.</div>
        </div>
        <button onclick="App.resetServiceChecker()" class="mt-3 text-sm text-blue-600 hover:underline">← Reset service checker</button>`;
    }

    return `<div class="text-sm text-slate-500">Answer all 8 questions to see your full assessment.</div>`;
  },

  resetServiceChecker() {
    this.serviceCheckerQuestions.forEach(s => localStorage.removeItem('amliq_acct_sc_' + s.id));
    document.getElementById('service-checker-container').innerHTML = this.renderServiceChecker();
  },

  // ─── OBLIGATIONS OVERVIEW ─────────────────────────────────────────────────
  renderObligationsOverview() {
    const el = document.getElementById('section-obligations-overview');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Obligations Overview', 'What the AML/CTF reforms mean for Australian accounting professionals, in plain English.', '📋')}

        <!-- What Changed -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">What Changed?</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3 open">
            <p class="text-sm text-slate-600 mb-3">Australia's AML/CTF Act (Tranche 2 reforms) extends anti-money laundering obligations to accountants and other professional services for the first time, effective <strong>1 July 2026</strong>.</p>
            <p class="text-sm text-slate-600 mb-3">Accountants are internationally recognised as <strong class="text-red-600">"gatekeeper" professionals</strong> — their expertise in structuring transactions, creating entities, and managing funds makes them attractive targets for criminal exploitation. AUSTRAC's 2024 National Risk Assessment rated accounting as a <strong class="text-red-600">HIGH</strong> money laundering risk sector.</p>
            <p class="text-sm text-slate-600 mb-3">Approximately <strong>90,000 new reporting entities</strong> are being brought into the AML/CTF regime under Tranche 2, aligning Australia with FATF standards.</p>
            <div class="austrac-callout text-sm">
              <strong class="text-blue-800">AUSTRAC says:</strong> "Accountants are gatekeeper professionals — their services can be exploited to create entities, structure transactions, and manage funds in ways that facilitate money laundering and terrorism financing."
            </div>
          </div>
        </div>

        <!-- Who Is Affected -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Who Is Affected?</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <p class="text-sm text-slate-600 mb-3">Any accounting practice that provides <strong>one or more of the 8 designated services</strong> is captured. Use the <button onclick="App.navigateTo('am-i-regulated')" class="underline text-blue-600">Service Checker</button> to check your practice.</p>
            <h4 class="font-semibold text-slate-700 mb-2">What is EXEMPT (NOT designated services):</h4>
            <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside mb-3">
              <li>Tax return preparation (individual & business)</li>
              <li>BAS agent work and GST</li>
              <li>Bookkeeping and payroll processing</li>
              <li>Financial statement preparation (standalone)</li>
              <li>Audit and assurance</li>
              <li>General tax advisory (not linked to a designated service transaction)</li>
            </ul>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <strong>Mixed practices:</strong> If your practice does tax returns (exempt) AND sets up companies (designated), you ARE captured for the company setup activities. CDD applies only to designated service engagements.
            </div>
          </div>
        </div>

        <!-- 10 Core Obligations -->
        <div class="mb-5">
          <h2 class="font-bold text-slate-800 text-lg mb-3">Your 10 Core Obligations</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${AMLiqData.obligations.map(o => `
              <button onclick="App.navigateTo('${o.section}')"
                class="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-blue-300 hover:shadow-sm transition-all group">
                <div class="flex items-start gap-3">
                  <span class="text-xl flex-shrink-0">${o.icon}</span>
                  <div>
                    <div class="font-semibold text-slate-700 text-sm group-hover:text-blue-600">${o.num}. ${o.title}</div>
                    <div class="text-xs text-slate-500 mt-1">${o.summary}</div>
                  </div>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Penalties -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">What Happens If You Don't Comply?</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <p class="text-sm text-slate-600 mb-3">AUSTRAC will take a <strong>proportionate, risk-based approach</strong> for newly regulated sectors. However, enforcement will focus on entities that <strong>fail to enrol</strong> or <strong>make no meaningful implementation effort</strong>.</p>
            <p class="text-sm text-slate-600 mb-3">Penalties include: civil penalty orders (up to <strong>$28.2 million</strong> for body corporates), infringement notices, enforceable undertakings, remedial directions, external audits at your expense, and deregistration.</p>
            <div class="austrac-callout text-sm">
              <strong class="text-blue-800">Key message:</strong> AUSTRAC is not expecting perfection from day one. They want to see a <strong>genuine, good-faith effort</strong> to understand obligations, build a program, and progressively improve. The biggest risk is doing nothing at all.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ─── KEY DATES ────────────────────────────────────────────────────────────
  renderKeyDates() {
    const el = document.getElementById('section-key-dates');
    const dates = [
      { date: '31 March 2026', label: 'AUSTRAC Enrolment Opens', detail: 'Enrolment via AUSTRAC Online (online.austrac.gov.au) opens for accounting practices. Begin the enrolment process as soon as possible.', status: 'open', icon: '🟢' },
      { date: 'Before 1 July 2026', label: 'Complete your AML/CTF Program', detail: 'Your AML/CTF program (risk assessment, policies, processes, governance) should be completed and approved by senior management before obligations commence.', status: 'prep', icon: '🔵' },
      { date: 'Before 1 July 2026', label: 'Train Your Staff', detail: 'All relevant staff should receive initial AML/CTF training before obligations commence.', status: 'prep', icon: '🔵' },
      { date: '1 July 2026', label: 'Obligations Commence', detail: 'All AML/CTF obligations are live. You must conduct CDD on every client receiving a designated service, monitor for suspicious activity, and be ready to file reports.', status: 'critical', icon: '🔴' },
      { date: 'Within 28 days of first service', label: 'Enrolment Deadline', detail: 'You must enrol with AUSTRAC within 28 days of first providing a designated service. If you first provide a service on 1 July 2026, you must enrol by 29 July 2026.', status: 'deadline', icon: '🟡' },
      { date: '29 July 2026', label: 'Latest Possible Enrolment Date', detail: 'The absolute latest date to enrol is 29 July 2026 (if your first designated service was provided on 1 July 2026).', status: 'deadline', icon: '🟡' },
      { date: 'Within 14 days of appointment', label: 'Notify AUSTRAC of Compliance Officer', detail: 'Once you appoint your AML/CTF compliance officer, you must notify AUSTRAC within 14 days via AUSTRAC Online.', status: 'ongoing', icon: '🟠' },
      { date: 'Annually (minimum)', label: 'Refresher Training & Compliance Report', detail: 'AML/CTF training must be refreshed at least annually. An annual compliance report must also be submitted to AUSTRAC.', status: 'ongoing', icon: '🟠' },
      { date: 'Every 3 years (minimum)', label: 'Independent Evaluation', detail: 'An independent evaluation of your AML/CTF program must be conducted at least once every 3 years.', status: 'ongoing', icon: '🟠' },
    ];

    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Key Dates & Timeline', 'Important dates for meeting your AML/CTF obligations.', '📅')}
        <div class="space-y-3">
          ${dates.map(d => `
            <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-4">
              <span class="text-xl flex-shrink-0">${d.icon}</span>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span class="font-semibold text-slate-800 text-sm">${d.label}</span>
                  <span class="tag ${d.status === 'critical' ? 'bg-red-100 text-red-700' : d.status === 'deadline' ? 'bg-amber-100 text-amber-700' : d.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${d.date}</span>
                </div>
                <p class="text-sm text-slate-600">${d.detail}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ─── RISK ASSESSMENT ──────────────────────────────────────────────────────
  renderRiskAssessment() {
    const el = document.getElementById('section-risk-assessment');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Risk Assessment Wizard', "Assess your ML/TF/PF risk profile across four categories, aligned to AUSTRAC's risk framework.", '⚠️')}
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Context:</strong> AUSTRAC's 2024 National Risk Assessment rated the accounting sector as <strong>HIGH</strong> for money laundering risk. Accountants are recognised as "gatekeeper" professionals whose services can be exploited for entity creation, transaction structuring, and fund management.
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-700">
          <strong>Disclaimer:</strong> This wizard helps you understand your risk profile for guidance purposes. It does not replace the formal ML/TF/PF risk assessment required under the AML/CTF Rules. Consider engaging a professional to complete your formal risk assessment.
        </div>
        <div id="risk-wizard-container">
          ${RiskWizard.renderStart()}
        </div>
      </div>
    `;
  },

  // ─── PROGRAM BUILDER ──────────────────────────────────────────────────────
  renderProgramBuilder() {
    const el = document.getElementById('section-program-builder');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('AML/CTF Program Builder', "A comprehensive checklist of everything your AML/CTF program should contain — aligned to AUSTRAC's Accounting Program Starter Kit.", '🏗️')}
        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">AUSTRAC Starter Kit alignment:</strong> The starter kit contains four core documents: Customise Guide, Risk Assessment, Policy Document, and Process Document. Once customised and approved by senior management, these together form your official AML/CTF program.
          <div class="mt-2 text-amber-700 font-medium">The starter kit is NOT designed to be used as-is. You must complete the customisation step to create a program specific to your practice.</div>
        </div>

        <!-- AUSTRAC Downloadable Templates -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-1">AUSTRAC Official Templates</h3>
          <p class="text-xs text-slate-500 mb-3">Download the official Word documents from AUSTRAC's Accounting Program Starter Kit. Customise and use them as your AML/CTF program.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${[
              { name: 'Starter Kit Document Library', desc: 'All template documents in one place' },
              { name: 'Customise Guide', desc: 'Step-by-step customisation instructions' },
              { name: 'Risk Assessment Template', desc: 'Formal risk assessment document' },
              { name: 'Policy & Process Documents', desc: 'Policy and process templates' },
            ].map(t => `
              <a href="https://www.austrac.gov.au/reforms/program-starter-kits/accounting-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library" target="_blank" rel="noopener" class="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <span class="text-blue-500 text-lg">📄</span>
                <div>
                  <div class="text-sm font-medium text-slate-700">${t.name}</div>
                  <div class="text-xs text-slate-400">${t.desc}</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- 4-Step Customisation Process -->
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-3">AUSTRAC's 4-Step Customisation Process</h3>
          <div class="space-y-3">
            ${[
              { n: 1, title: 'Customise your risk assessment', desc: 'Identify ML/TF/PF risks relevant to your practice across client, service, delivery channel, and geographic categories.' },
              { n: 2, title: 'Customise personnel sections', desc: 'Assign AML/CTF roles, conduct personnel due diligence, and plan staff training.' },
              { n: 3, title: 'Tailor client sections', desc: 'Establish CDD procedures for each entity type, monitoring processes, and risk response controls.' },
              { n: 4, title: 'Document and approve your program', desc: 'Finalise all documents and obtain formal senior management/partner approval.' },
            ].map(s => `
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">${s.n}</div>
                <div>
                  <div class="text-sm font-semibold text-slate-700">${s.title}</div>
                  <div class="text-xs text-slate-500">${s.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mb-4 flex items-center gap-4">
          <div class="flex-1">
            <div class="text-sm text-slate-500 mb-1">Overall Program Completion</div>
            <div class="w-full bg-slate-100 rounded-full h-3">
              <div class="progress-bar bg-blue-500 h-3 rounded-full" id="program-overall-bar" style="width:0%"></div>
            </div>
          </div>
          <div class="text-xl font-bold text-blue-600" id="program-overall-pct">0%</div>
          <button onclick="Checklist.exportProgress()" class="text-sm text-blue-600 hover:underline no-print">Export Progress</button>
        </div>
        <div id="program-checklist-container">
          ${Checklist.renderAll()}
        </div>
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── GOVERNANCE ───────────────────────────────────────────────────────────
  renderGovernance() {
    const el = document.getElementById('section-governance');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Governance Setup', 'Establish the governance framework for your AML/CTF program.', '👤')}

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
          <strong>Three key governance roles:</strong> AML/CTF Compliance Officer, Senior Manager, and Governing Body. In sole practices, one person may hold all three roles.
          <div class="mt-2"><strong>Senior Manager personal obligations (cannot be delegated):</strong> approve the risk assessment, approve AML/CTF policies, approve high-risk client relationships and PEP engagements, approve third-party CDD reliance arrangements.</div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-5 border-b border-slate-200 flex-wrap">
          ${['Compliance Officer', 'Roles Assignment', 'Personnel Due Diligence'].map((tab, i) => `
            <button onclick="App.switchTab('gov-tab', ${i})"
              class="gov-tab pb-2 px-1 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="gov-tab-0">${Forms.renderComplianceOfficerForm()}</div>
        <div id="gov-tab-1" class="hidden">${Forms.renderRolesForm()}</div>
        <div id="gov-tab-2" class="hidden">${Forms.renderPersonnelDDForm()}</div>
      </div>
    `;
  },

  // ─── ENROLMENT ────────────────────────────────────────────────────────────
  renderEnrolment() {
    const el = document.getElementById('section-enrolment');
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Enrolment Guide', 'Step-by-step guidance for enrolling with AUSTRAC as a reporting entity.', '✅')}

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
          <strong>AUSTRAC's regulatory expectation:</strong> By 30 June 2026, AUSTRAC expects all Tranche 2 entities to have enrolled with AUSTRAC, adopted an AML/CTF program, trained staff, and implemented reporting systems.
        </div>

        <!-- Steps -->
        <div class="space-y-4 mb-6">
          ${[
            { n: 1, title: 'Confirm You Need to Enrol', body: 'Use the <button onclick="App.navigateTo(\'am-i-regulated\')" class="underline text-blue-600">Service Checker</button> to confirm your practice provides at least one of the 8 designated services. If you provide only exempt services (tax returns, BAS, bookkeeping), you do not need to enrol.' },
            { n: 2, title: 'Prepare Your Information', body: '<ul class="list-disc list-inside space-y-1 text-slate-600"><li>Australian Business Number (ABN)</li><li>Practice name and structure (sole trader, partnership, company, trust)</li><li>Contact person details</li><li>Compliance officer details (name, role)</li><li>Description of designated services provided (which of the 8)</li><li>Practice address(es)</li></ul>' },
            { n: 3, title: 'Enrol via AUSTRAC Online', body: 'Enrolment opens <strong>31 March 2026</strong>. Enrol at <a href="https://online.austrac.gov.au" target="_blank" class="underline text-blue-600">online.austrac.gov.au</a>. You must enrol within 28 days of first providing a designated service.' },
            { n: 4, title: 'Nominate Your Compliance Officer', body: 'You must notify AUSTRAC of your compliance officer\'s details within <strong>14 days</strong> of their appointment. See the <button onclick="App.navigateTo(\'governance\')" class="underline text-blue-600">Governance Setup</button> section.' },
            { n: 5, title: 'Confirm and Record', body: 'Save your enrolment confirmation. Record the enrolment date. Add to your record-keeping system and retain for 7 years.' },
          ].map(s => `
            <div class="bg-white rounded-xl border border-slate-200 p-5 flex gap-4">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">${s.n}</div>
              <div>
                <div class="font-semibold text-slate-800 mb-2">${s.title}</div>
                <div class="text-sm text-slate-600">${s.body}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Key Dates -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          ${[
            { label: 'Enrolment Opens', date: '31 March 2026', color: 'green' },
            { label: 'Obligations Commence', date: '1 July 2026', color: 'red' },
            { label: 'Enrolment Deadline', date: '29 July 2026', color: 'amber' },
          ].map(d => `
            <div class="bg-${d.color}-50 border border-${d.color}-200 rounded-xl p-3 text-center">
              <div class="text-xs font-semibold text-${d.color}-700 uppercase tracking-wider">${d.label}</div>
              <div class="font-bold text-${d.color}-800 text-sm mt-1">${d.date}</div>
            </div>
          `).join('')}
        </div>

        <!-- Checklist -->
        ${Checklist.renderSection('enrolment', 'Enrolment Checklist')}
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── CDD ──────────────────────────────────────────────────────────────────
  renderCDD() {
    const el = document.getElementById('section-cdd');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Customer Due Diligence (CDD)', 'Step-by-step guidance on identifying and verifying clients for each entity type.', '🪪')}

        <!-- Who Is Your Client — critical clarification for accountants -->
        <div class="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4 text-sm">
          <div class="font-bold text-amber-800 mb-1">Important: CDD Applies Only to Designated Service Clients</div>
          <p class="text-amber-700">CDD is only required for clients to whom you are providing a <strong>designated service</strong>. If a client only engages you for tax returns or bookkeeping (exempt services), you do not need AML/CTF CDD for that client. However, if you also set up a company for that same client, CDD is required for that designated service engagement.</p>
        </div>

        <div class="austrac-callout mb-4 text-sm">
          <strong class="text-blue-800">Overarching principle:</strong> You must conduct initial CDD <em>before</em> providing a designated service. If CDD cannot be completed satisfactorily, consider whether to decline or cease providing the service. CDD data is collected under a legal obligation — handle it in accordance with the Australian Privacy Principles.
        </div>

        <!-- Client Risk Rating Table -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-3">Client Risk Rating Table <span class="text-xs font-normal text-slate-400 ml-1">(AUSTRAC Starter Kit)</span></h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-slate-200">
                  <th class="text-left py-2 pr-3 font-semibold text-slate-600 w-24">Rating</th>
                  <th class="text-left py-2 pr-3 font-semibold text-slate-600">Risk Factors Present</th>
                  <th class="text-left py-2 font-semibold text-slate-600 w-32">Controls</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-red-100 text-red-700 font-bold">HIGH</span></td>
                  <td class="py-2 pr-3 text-slate-600">Complex trust/multi-layered structures; client from FATF grey/blacklisted country; foreign PEP; evasive about beneficial owners; client refused by other firms; source of funds unexplained; entity creation with no apparent business purpose</td>
                  <td class="py-2 text-slate-600">Enhanced CDD; source of funds &amp; wealth check; adverse media check; senior management/partner approval</td>
                </tr>
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-amber-100 text-amber-700 font-bold">MEDIUM</span></td>
                  <td class="py-2 pr-3 text-slate-600">Non-face-to-face engagement; domestic PEP; third-party intermediary; entity restructuring with some complexity; international connections; cash-intensive business client</td>
                  <td class="py-2 text-slate-600">Standard CDD (simplified CDD not appropriate)</td>
                </tr>
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-green-100 text-green-700 font-bold">LOW</span></td>
                  <td class="py-2 pr-3 text-slate-600">Well-known, long-standing client; simple domestic entity; routine designated service; no medium or high-risk factors</td>
                  <td class="py-2 text-slate-600">Simplified CDD may apply</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- CDD Tabs -->
        <div class="flex gap-2 mb-5 overflow-x-auto border-b border-slate-200">
          ${['Individual', 'Company', 'Trust/SMSF', 'Partnership', 'Foreign', 'EDD', 'Ongoing CDD', 'PEP/Sanctions', 'SMR Decision', 'Delayed CDD', '3rd Party Reliance', 'CDD Outcome'].map((tab, i) => `
            <button onclick="App.switchTab('cdd-tab', ${i})"
              class="cdd-tab pb-2 px-2 text-sm font-medium whitespace-nowrap ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="cdd-tab-0">${Forms.renderCDDIndividual()}</div>
        <div id="cdd-tab-1" class="hidden">${Forms.renderCDDCompany()}</div>
        <div id="cdd-tab-2" class="hidden">${Forms.renderCDDTrust()}</div>
        <div id="cdd-tab-3" class="hidden">${Forms.renderCDDPartnership()}</div>
        <div id="cdd-tab-4" class="hidden">${Forms.renderCDDForeign()}</div>
        <div id="cdd-tab-5" class="hidden">${Forms.renderEDD()}</div>
        <div id="cdd-tab-6" class="hidden">${Checklist.renderSection('ongoingCDD', 'Ongoing CDD Review Checklist')}</div>
        <div id="cdd-tab-7" class="hidden">${Forms.renderPEPScreening()}</div>
        <div id="cdd-tab-8" class="hidden">${Forms.renderSMRDecision()}</div>
        <div id="cdd-tab-9" class="hidden">${this.renderDelayedCDD()}</div>
        <div id="cdd-tab-10" class="hidden">${this.renderThirdPartyReliance()}</div>
        <div id="cdd-tab-11" class="hidden">${this.renderCDDOutcome()}</div>
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── CDD SUB-SECTIONS ─────────────────────────────────────────────────────
  renderDelayedCDD() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform" target="_blank" rel="noopener" class="underline text-blue-600">Delayed Initial CDD (Reform)</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When May You Delay CDD?</h3>
          <p class="text-sm text-slate-600 mb-3">AUSTRAC recognises that some designated services may require starting work before CDD is fully completed. You may delay initial CDD only if <strong>both</strong> conditions are met:</p>
          <div class="space-y-2 mb-4">
            <div class="flex items-start gap-2 text-sm text-slate-700"><span class="text-green-600 font-bold mt-0.5">1.</span><span>You determine on reasonable grounds that there is <strong>low additional ML/TF/PF risk</strong> if you delay.</span></div>
            <div class="flex items-start gap-2 text-sm text-slate-700"><span class="text-green-600 font-bold mt-0.5">2.</span><span>Delaying is <strong>essential to avoid interrupting the ordinary course of business</strong>.</span></div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mb-4">
            <strong>Critical:</strong> Sanctions screening must be completed <strong>without delay</strong> even when other CDD is delayed.
          </div>
          <div class="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            <strong>Accounting examples where delay may be appropriate:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Urgent entity creation for a time-sensitive business deal</li>
              <li>SMSF setup required before end of financial year deadline</li>
              <li>Cross-border transaction with tight settlement deadlines</li>
            </ul>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Delayed CDD Record</h3>
          ${this.renderSimpleForm('delayed-cdd', [
            { label: 'Client name', type: 'text', id: 'dc-name' },
            { label: 'Designated service being provided', type: 'text', id: 'dc-service' },
            { label: 'Reason for delay', type: 'text', id: 'dc-reason' },
            { label: 'Low ML/TF/PF risk assessed and documented?', type: 'select', id: 'dc-risk', options: ['Yes', 'No'] },
            { label: 'Delay essential to avoid interrupting business?', type: 'select', id: 'dc-essential', options: ['Yes', 'No'] },
            { label: 'Sanctions screening completed without delay?', type: 'select', id: 'dc-sanctions', options: ['Yes', 'No'] },
            { label: 'Date service commenced', type: 'date', id: 'dc-started' },
            { label: 'CDD completion target date', type: 'date', id: 'dc-target' },
            { label: 'CDD actually completed date', type: 'date', id: 'dc-completed' },
            { label: 'Any concerns identified after completion?', type: 'select', id: 'dc-concerns', options: ['No', 'Yes'] },
            { label: 'Action taken (if concerns found)', type: 'text', id: 'dc-action' },
          ])}
        </div>
      </div>
    `;
  },

  renderThirdPartyReliance() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform" target="_blank" rel="noopener" class="underline text-blue-600">Reliance Under CDD Arrangements (Reform)</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-2">What Is Third-Party Reliance?</h3>
          <p class="text-sm text-slate-600 mb-3">You may rely on CDD conducted by another reporting entity (e.g., a lawyer on a shared transaction) rather than conducting CDD yourself from scratch.</p>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mb-3">
            <strong>Risk Note:</strong> A third party <em>not enrolled with AUSTRAC</em> representing the client is a <strong>medium risk factor</strong>. Senior management must approve written reliance agreements.
          </div>
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <strong>Critical Rule:</strong> You <strong>remain responsible</strong> for ensuring CDD obligations are met, even when relying on a third party.
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Third-Party Reliance Record</h3>
          ${this.renderSimpleForm('tp-reliance', [
            { label: 'Client name', type: 'text', id: 'tpr-customer' },
            { label: 'Third party relied upon (name/firm)', type: 'text', id: 'tpr-party' },
            { label: 'Is third party a reporting entity?', type: 'select', id: 'tpr-re', options: ['Yes', 'No', 'Unknown'] },
            { label: 'Is third party enrolled with AUSTRAC?', type: 'select', id: 'tpr-austrac', options: ['Yes', 'No', 'Unknown'] },
            { label: 'Jurisdiction', type: 'text', id: 'tpr-jurisdiction' },
            { label: "Third party's ML/TF risk framework assessed?", type: 'select', id: 'tpr-assessed', options: ['Yes', 'No'] },
            { label: 'CDD standards agreed?', type: 'select', id: 'tpr-standards', options: ['Yes', 'No'] },
            { label: 'Arrangement documented in AML/CTF program?', type: 'select', id: 'tpr-documented', options: ['Yes', 'No'] },
            { label: 'Senior management approval obtained?', type: 'select', id: 'tpr-approval', options: ['Yes', 'No'] },
            { label: 'Date of reliance', type: 'date', id: 'tpr-date' },
            { label: 'CDD information received (summary)', type: 'text', id: 'tpr-info' },
          ])}
        </div>
      </div>
    `;
  },

  renderCDDOutcome() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service" target="_blank" rel="noopener" class="underline text-blue-600">CDD Before Providing a Designated Service</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When CDD Cannot Be Completed</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead><tr class="border-b border-slate-200">
                <th class="text-left py-2 pr-3 font-semibold text-slate-600">Scenario</th>
                <th class="text-left py-2 font-semibold text-slate-600">Recommended Action</th>
              </tr></thead>
              <tbody class="divide-y divide-slate-100">
                ${[
                  ['Client refuses to provide identification', 'Decline the designated service engagement. Consider filing an SMR if refusal is suspicious.'],
                  ['Client provides inconsistent or fraudulent documents', 'Do not proceed. Escalate internally. File an SMR.'],
                  ['Beneficial owner cannot be identified', 'Do not proceed until identified. Apply EDD.'],
                  ['Client is on DFAT sanctions list', 'Do NOT proceed under any circumstances. Seek legal advice.'],
                  ['CDD reveals a PEP', 'Do not automatically decline — apply EDD and obtain senior management/partner approval.'],
                  ['High-risk jurisdiction connection', 'Apply EDD. May proceed if risk adequately mitigated and documented.'],
                  ['Source of funds cannot be verified', 'Consider declining. If proceeding, apply EDD and document rationale. File SMR if suspicious.'],
                  ['Complex structure with no commercial rationale', 'Escalate to compliance officer. Apply EDD. Consider declining engagement.'],
                ].map(([s, a]) => `<tr><td class="py-2 pr-3 text-slate-600">${s}</td><td class="py-2 text-slate-600">${a}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 mt-4">
            <strong>AUSTRAC guidance:</strong> Filing an SMR does <em>not</em> automatically mean you must decline the engagement — a senior manager/partner can provide written approval to continue the relationship even after an SMR is filed.
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">CDD Outcome Record</h3>
          ${this.renderSimpleForm('cdd-outcome', [
            { label: 'Client name', type: 'text', id: 'co-name' },
            { label: 'Designated service', type: 'text', id: 'co-service' },
            { label: 'CDD issue encountered', type: 'select', id: 'co-issue', options: ['Refused ID', 'Inconsistent documents', 'Beneficial owner unclear', 'Sanctions match', 'PEP identified', 'High-risk jurisdiction', 'Source of funds unverifiable', 'Complex structure — no rationale', 'Other'] },
            { label: 'Detail of issue', type: 'text', id: 'co-detail' },
            { label: 'Action taken', type: 'select', id: 'co-action', options: ['Engagement declined', 'EDD applied and proceeded', 'SMR filed', 'Sanctions freeze — seek legal advice'] },
            { label: 'Rationale for decision', type: 'text', id: 'co-rationale' },
            { label: 'Senior management/partner approval obtained?', type: 'select', id: 'co-approval', options: ['N/A', 'Yes', 'No'] },
            { label: 'SMR filed?', type: 'select', id: 'co-smr', options: ['No', 'Yes'] },
            { label: 'Documented by', type: 'text', id: 'co-by' },
            { label: 'Date', type: 'date', id: 'co-date' },
          ])}
        </div>
      </div>
    `;
  },

  // ─── CLIENT RISK RATING GUIDE ─────────────────────────────────────────────
  renderClientRiskRating() {
    const el = document.getElementById('section-client-risk-rating');
    const examples = [
      {
        risk: 'LOW',
        color: 'green',
        title: 'Low-Risk Client',
        scenario: 'A well-known, long-standing client (individual sole trader) asks you to set up a simple Pty Ltd company for their existing business. They are an Australian resident with a clear business profile.',
        steps: [
          'Client is well-known — you have prepared their tax returns for 5 years',
          'Designated service: Service 6 (creating a body corporate)',
          'Initial CDD: verify identity using driver\'s licence (already on file)',
          'Client is not a PEP; DFAT sanctions check clear',
          'No medium or high-risk factors identified — rated LOW',
          'Simplified CDD applied: baseline identity verification, sanctions check, PEP check',
          'Company created, records filed, engagement concludes',
        ],
        insight: 'For a low-risk, well-known client, simplified CDD may apply — but you still need to identify them and document the risk assessment.',
      },
      {
        risk: 'MEDIUM',
        color: 'amber',
        title: 'Medium-Risk Client',
        scenario: 'A new client (company) engages you to restructure their corporate group and assist with financing for the restructure. The engagement involves entity restructuring (Service 6) and financing assistance (Service 4).',
        steps: [
          'New client — no prior relationship, referred by another firm',
          'Two designated services triggered: Service 6 (restructuring) + Service 4 (financing)',
          'Medium risk factors: new client, third-party referral, some entity complexity',
          'Standard CDD applied: verify company via ASIC, identify all beneficial owners (25%+)',
          'PEP/sanctions screening completed for all beneficial owners — no matches',
          'Source of funds verified: business revenue consistent with financial statements',
          'Risk rating: MEDIUM — standard CDD appropriate, simplified CDD NOT appropriate',
          'Ongoing monitoring set: review at next engagement or annually',
        ],
        insight: 'Multiple designated services and a new client referral move the rating to medium. Standard CDD applies — simplified CDD is not appropriate.',
      },
      {
        risk: 'HIGH',
        color: 'red',
        title: 'High-Risk Client',
        scenario: 'A foreign national contacts you to set up a discretionary trust with a corporate trustee. The trust will hold Australian property. The client is evasive about beneficial ownership and the source of funds is unclear.',
        steps: [
          'Multiple high-risk factors: foreign client, trust (inherently high-risk), evasive about beneficial owners, unclear source of funds',
          'Designated service: Service 6 (creating a legal arrangement — trust)',
          'Compliance officer escalation triggered by red flags',
          'Enhanced due diligence applied: detailed source-of-funds inquiries, additional ID verification',
          'Client unable to satisfactorily explain source of wealth — inconsistent with known profile',
          'Adverse media check reveals links to investigations in another jurisdiction',
          'Compliance officer forms reasonable grounds for suspicion — SMR filed within 3 business days',
          'Senior partner provides written decision: engagement declined due to unresolved risk',
        ],
        insight: 'Trusts are inherently high-risk per AUSTRAC. Combined with a foreign client, evasive behaviour, and unclear funds, this engagement requires EDD and senior management involvement. Declining is appropriate when risk cannot be mitigated.',
      },
    ];

    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Client Risk Rating Guide', 'Worked examples showing how to apply risk ratings for accounting designated services.', '📊')}
        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">AUSTRAC approach:</strong> Risk-based CDD means applying the right level of due diligence based on the client's risk profile. Low-risk clients may qualify for simplified CDD. High-risk clients require enhanced CDD and senior management approval. Trusts are rated as inherently high-risk by AUSTRAC.
        </div>
        <div class="space-y-6">
          ${examples.map(e => `
            <div class="bg-white rounded-xl border border-slate-200 p-5">
              <div class="flex items-center gap-3 mb-3">
                <span class="tag bg-${e.color}-100 text-${e.color}-700 font-bold">${e.risk} RISK</span>
                <h3 class="font-bold text-slate-800">${e.title}</h3>
              </div>
              <p class="text-sm text-slate-600 italic mb-4">"${e.scenario}"</p>
              <ol class="space-y-2 mb-4">
                ${e.steps.map((s, i) => `
                  <li class="flex items-start gap-2 text-sm text-slate-600">
                    <span class="w-5 h-5 rounded-full bg-${e.color}-100 text-${e.color}-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">${i + 1}</span>
                    <span>${s}</span>
                  </li>
                `).join('')}
              </ol>
              <div class="bg-${e.color}-50 border border-${e.color}-200 rounded-lg p-3 text-sm text-${e.color}-800">
                <strong>Key insight:</strong> ${e.insight}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  // ─── RED FLAGS ──────────────────────────────────────────────────────────
  renderRedFlags() {
    const el = document.getElementById('section-red-flags');
    if (!el) return;
    const categories = [
      { key: 'all', label: 'All' },
      { key: 'client', label: 'Client Risk' },
      { key: 'service', label: 'Service/Transaction' },
      { key: 'delivery', label: 'Delivery Channel' },
      { key: 'jurisdiction', label: 'Foreign Jurisdiction' },
    ];
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Red Flags & Suspicious Activity', 'AUSTRAC\'s accountant-specific warning signs of money laundering across 4 risk categories — aligned to official "Risk insights and indicators of suspicious activity for accountants" guidance.', '🚩')}

        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-accountants" target="_blank" rel="noopener" class="underline text-blue-600">Risk Insights — Accountant Suspicious Activity Indicators</a>
          <div class="mt-1 text-slate-600">AUSTRAC states that criminals exploit accountants\' professional expertise to create <strong>distance from illegal proceeds</strong> using intermediaries, third-party involvement, and complex business structures.</div>
        </div>

        <input type="text" id="rf-search" placeholder="Search red flags..." oninput="App.searchRedFlags()"
          class="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400">

        <div class="flex gap-2 mb-4 flex-wrap">
          ${categories.map(c => `
            <button onclick="App.filterRedFlags('${c.key}')" data-category="${c.key}"
              class="rf-filter px-3 py-1.5 rounded-full text-xs font-medium border ${c.key === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-bold text-slate-800 mb-2">What Should I Do?</h3>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
            ${[
              { step: '1. STOP', desc: 'Do not tip off the client', color: 'red' },
              { step: '2. DOCUMENT', desc: 'Record observations in writing', color: 'amber' },
              { step: '3. ESCALATE', desc: 'Report to compliance officer', color: 'blue' },
              { step: '4. REPORT', desc: 'File SMR if grounds exist', color: 'green' },
            ].map(s => `
              <div class="bg-${s.color}-50 border border-${s.color}-200 rounded-lg p-2">
                <div class="font-bold text-${s.color}-700">${s.step}</div>
                <div class="text-${s.color}-600 mt-0.5">${s.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="space-y-3" id="rf-list">
          ${AMLiqData.redFlags.map(rf => `
            <div class="rf-card bg-white rounded-xl border border-slate-200 p-4" data-category="${rf.category}">
              <div class="flex items-start gap-3">
                <span class="text-lg flex-shrink-0 mt-0.5">${rf.severity === 'red' ? '🔴' : '🟠'}</span>
                <div class="flex-1">
                  <div class="font-semibold text-slate-800 text-sm cursor-pointer hover:text-blue-600" onclick="App.toggleRedFlagDetail('${rf.id}')">
                    ${rf.title}
                  </div>
                  <div id="rf-detail-${rf.id}" class="hidden text-sm text-slate-600 mt-1">${rf.detail}</div>
                  <button onclick="App.navigateTo('reporting')"
                    class="mt-2 text-xs text-blue-600 hover:underline block">View Reporting Guide →</button>
                </div>
                <div class="text-xs text-slate-400 mt-0.5">${{ client: 'Client Risk', service: 'Service/Transaction', delivery: 'Delivery Channel', jurisdiction: 'Foreign Jurisdiction' }[rf.category]}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterRedFlags(category) {
    document.querySelectorAll('.rf-filter').forEach(btn => {
      btn.className = btn.className.replace('bg-blue-600 text-white border-blue-600', 'bg-white text-slate-600 border-slate-200 hover:border-blue-300');
    });
    const activeBtn = document.querySelector(`.rf-filter[data-category="${category}"]`);
    if (activeBtn) activeBtn.className = activeBtn.className.replace('bg-white text-slate-600 border-slate-200 hover:border-blue-300', 'bg-blue-600 text-white border-blue-600');
    document.querySelectorAll('.rf-card').forEach(card => {
      card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
    });
  },

  searchRedFlags() {
    const q = document.getElementById('rf-search').value.toLowerCase();
    document.querySelectorAll('.rf-card').forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  },

  toggleRedFlagDetail(id) {
    const el = document.getElementById('rf-detail-' + id);
    if (el) el.classList.toggle('hidden');
  },

  // ─── REPORTING ────────────────────────────────────────────────────────────
  renderReporting() {
    const el = document.getElementById('section-reporting');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Reporting to AUSTRAC', 'When and how to file Suspicious Matter Reports (SMRs), Threshold Transaction Reports (TTRs), IFTIs, and Annual Compliance Reports.', '📤')}

        <div class="tipping-off-warning mb-5">
          <div class="flex items-center gap-2 mb-2"><span class="text-red-600 font-bold">🚫 TIPPING-OFF PROHIBITION — APPLIES TO ALL REPORTING</span></div>
          <p class="text-sm text-red-800">You MUST NOT tell the client, or any other person who doesn't need to know, that you have filed or intend to file an SMR, or that you have any suspicion about them. This is a <strong>criminal offence</strong> — up to 2 years imprisonment.</p>
        </div>

        <div class="flex gap-2 mb-5 border-b border-slate-200 flex-wrap">
          ${['SMRs', 'TTRs', 'IFTIs', 'Annual Report', 'Escalation Guide'].map((tab, i) => `
            <button onclick="App.switchTab('rep-tab', ${i})"
              class="rep-tab pb-2 px-2 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="rep-tab-0">${this.renderSMRGuide()}</div>
        <div id="rep-tab-1" class="hidden">${this.renderTTRGuide()}</div>
        <div id="rep-tab-2" class="hidden">${this.renderIFTIGuide()}</div>
        <div id="rep-tab-3" class="hidden">${this.renderAnnualComplianceReport()}</div>
        <div id="rep-tab-4" class="hidden">${this.renderEscalationGuide()}</div>
      </div>
    `;
  },

  renderSMRGuide() {
    return `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When Must You File an SMR?</h3>
          <p class="text-sm text-slate-600 mb-3">You must submit an SMR if you suspect, on <strong>reasonable grounds</strong>, that:</p>
          <ul class="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>A client or matter may be linked to money laundering, terrorism financing, or proliferation financing</li>
            <li>A client is not who they claim to be</li>
            <li>Information you hold may be relevant to the investigation of a crime (including tax evasion, fraud, bribery, corruption)</li>
            <li>A transaction or entity creation has no clear business purpose or seems unusual for the client</li>
          </ul>
          <div class="austrac-callout mt-4 text-sm">
            <strong class="text-blue-800">"Reasonable grounds"</strong> = an objective standard. Would a reasonable person with similar knowledge and experience reach the same suspicion? You do NOT need certainty — suspicion on reasonable grounds is sufficient.
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="font-bold text-red-700 mb-2">⏰ Terrorism Financing</div>
            <div class="text-2xl font-black text-red-600">24 hours</div>
            <div class="text-sm text-red-700 mt-1">If suspicion relates to terrorism financing</div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div class="font-bold text-amber-700 mb-2">⏰ All Other Suspicions</div>
            <div class="text-2xl font-black text-amber-600">3 business days</div>
            <div class="text-sm text-amber-700 mt-1">From forming the suspicion</div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Key SMR Rules</h3>
          <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Submit a <strong>separate SMR for each new suspicion</strong></li>
            <li>Reference previous SMRs on the same client</li>
            <li>Obligations apply even if you <strong>decline</strong> the engagement</li>
            <li>Include: firm details, staff details, comprehensive client information, suspicious activity details, supporting evidence</li>
          </ul>
          <div class="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
            <strong>How to file:</strong> Via <a href="https://online.austrac.gov.au" target="_blank" class="underline text-blue-600">AUSTRAC Online</a>. File a <strong>separate SMR</strong> each time you form a new suspicion.
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Accounting-Specific Example</h3>
          <div class="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3 italic">
            A new client asks you to set up a company and a trust with a corporate trustee. The client wants the entity structures completed within 48 hours and is vague about the business purpose. When asked about beneficial owners, the client names individuals you cannot independently verify and who appear to be based in a FATF-blacklisted jurisdiction. The compliance officer should file an SMR regardless of whether the firm proceeds with the engagement.
          </div>
        </div>

        <!-- SMR Decision Tool -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Should I File an SMR? — Quick Decision</h3>
          <div id="smr-decision" class="space-y-3">
            <p class="text-sm text-slate-600">Answer these questions to help assess whether an SMR may be warranted:</p>
            ${[
              'Do I have a genuine suspicion (not just a concern) about this client or engagement?',
              'Could a reasonable person with the same information share my suspicion?',
              'Is the suspicion related to money laundering, terrorism financing, or another serious offence?',
              'Have I documented the red flags or suspicious indicators?',
            ].map((q, i) => `
              <div class="flex items-start gap-3 text-sm">
                <input type="checkbox" id="smr-q${i}" class="mt-0.5 h-4 w-4 rounded border-slate-300" onchange="App.updateSMRDecision()">
                <label for="smr-q${i}" class="text-slate-700 cursor-pointer">${q}</label>
              </div>
            `).join('')}
            <div id="smr-result" class="hidden mt-3 p-3 rounded-lg text-sm"></div>
          </div>
        </div>
      </div>
    `;
  },

  updateSMRDecision() {
    const checks = [0,1,2,3].map(i => document.getElementById('smr-q'+i)?.checked);
    const count = checks.filter(Boolean).length;
    const result = document.getElementById('smr-result');
    if (result) {
      result.className = result.className.replace('hidden', '');
      if (count >= 3) {
        result.className = 'mt-3 p-3 rounded-lg text-sm bg-amber-50 border border-amber-300 text-amber-800';
        result.innerHTML = '<strong>An SMR is likely warranted.</strong> Escalate to your compliance officer immediately. Remember: you do not need certainty, only reasonable suspicion.';
      } else if (count >= 2) {
        result.className = 'mt-3 p-3 rounded-lg text-sm bg-blue-50 border border-blue-200 text-blue-800';
        result.innerHTML = '<strong>Consider escalating internally.</strong> Discuss with your compliance officer and document your observations.';
      } else {
        result.className = 'mt-3 p-3 rounded-lg text-sm bg-green-50 border border-green-200 text-green-800';
        result.innerHTML = '<strong>An SMR may not be required at this stage.</strong> Continue monitoring the relationship and document any future concerns.';
      }
    }
  },

  renderTTRGuide() {
    return `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When Is a TTR Required?</h3>
          <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-center">
            <div class="text-sm text-red-700 font-semibold">Physical cash payment of</div>
            <div class="text-3xl font-black text-red-600 my-1">$10,000 or more</div>
            <div class="text-sm text-red-700">in Australian or foreign equivalent currency (banknotes and coins)</div>
          </div>
          <p class="text-sm text-slate-600 mb-3"><strong>Physical currency only</strong> — TTR does NOT apply to:</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${['Electronic bank transfers', 'Cheques', 'Credit/debit cards', 'Cryptocurrency'].map(x => `
              <div class="bg-green-50 border border-green-200 rounded-lg p-2 text-center text-xs text-green-700 font-medium">✓ Not TTR: ${x}</div>
            `).join('')}
          </div>
        </div>

        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div class="font-bold text-amber-700">Filing Deadline</div>
          <div class="text-2xl font-black text-amber-600">10 business days</div>
          <div class="text-sm text-amber-700">after the transaction</div>
        </div>

        <!-- TTR Calculator -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">TTR Calculator</h3>
          <div class="flex items-center gap-3">
            <div class="form-field flex-1">
              <label>Cash amount received (AUD)</label>
              <input type="number" id="ttr-amount" placeholder="e.g. 15000" oninput="App.calcTTR()">
            </div>
          </div>
          <div id="ttr-result" class="hidden mt-3 p-3 rounded-lg text-sm"></div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-2">Structuring Warning</h3>
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <strong>Structuring is a criminal offence.</strong> If a client breaks cash payments into amounts just under $10,000 to avoid the TTR threshold, this is called "structuring" and is itself a criminal offence. This should <em>also</em> trigger an SMR.
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Accounting-Specific Note</h3>
          <div class="text-sm text-slate-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
            While cash payments to accounting firms are uncommon, they can occur — for example, a cash-intensive business client paying fees in cash. The obligation applies regardless of whether the cash payment seems legitimate. If a client asks about keeping payments below $10,000, this is itself a red flag.
          </div>
        </div>
      </div>
    `;
  },

  calcTTR() {
    const amount = parseFloat(document.getElementById('ttr-amount').value);
    const result = document.getElementById('ttr-result');
    if (!result) return;
    if (isNaN(amount)) { result.className = 'hidden'; return; }
    result.className = result.className.replace('hidden', '');
    if (amount >= 10000) {
      result.className = 'mt-3 p-3 rounded-lg text-sm bg-red-50 border border-red-300 text-red-800';
      result.innerHTML = `<strong>TTR required.</strong> $${amount.toLocaleString()} exceeds the $10,000 threshold. File a Threshold Transaction Report via <a href="https://online.austrac.gov.au" target="_blank" class="underline">AUSTRAC Online</a> within 10 business days.`;
    } else {
      result.className = 'mt-3 p-3 rounded-lg text-sm bg-green-50 border border-green-200 text-green-800';
      result.innerHTML = `<strong>No TTR required</strong> for $${amount.toLocaleString()} (below $10,000 threshold). However, if you suspect structuring or the transaction is otherwise suspicious, consider whether an SMR is warranted.`;
    }
  },

  renderIFTIGuide() {
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <h3 class="font-bold text-slate-800">International Fund Transfer Instructions (IFTIs)</h3>
        <p class="text-sm text-slate-600">An IFTI report is required when you are involved in <strong>sending or receiving international electronic fund transfers</strong>.</p>
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div class="font-bold text-amber-700">Filing Deadline</div>
          <div class="text-2xl font-black text-amber-600">10 business days</div>
          <div class="text-sm text-amber-700">after the transfer instruction</div>
        </div>
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">Do IFTIs Apply to Accountants?</strong>
          <ul class="list-disc list-inside mt-1 space-y-1 text-slate-600">
            <li>If your practice holds client funds in a trust account (Designated Service 3) and receives <strong>international wire transfers</strong>, you may have IFTI obligations</li>
            <li>If you facilitate or instruct international fund transfers as part of a designated service</li>
            <li>Most small-to-medium accounting practices will <strong>not</strong> encounter IFTI obligations</li>
          </ul>
        </div>
        <p class="text-sm text-slate-600">File IFTIs via <a href="https://online.austrac.gov.au" target="_blank" class="underline text-blue-600">AUSTRAC Online</a>.</p>
      </div>
    `;
  },

  renderAnnualComplianceReport() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit/step-2-use-your-accounting-program" target="_blank" rel="noopener" class="underline text-blue-600">Step 2: Use Your Accounting Program</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Annual Compliance Report</h3>
          <p class="text-sm text-slate-600 mb-4">Accounting practices must submit an annual AML/CTF compliance report to AUSTRAC demonstrating how the firm is meeting its obligations.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            ${[
              { label: 'Frequency', value: 'Annually' },
              { label: 'Covers', value: 'Previous calendar year' },
              { label: 'Filed via', value: 'AUSTRAC Online' },
            ].map(i => `
              <div class="bg-slate-50 rounded-lg p-3 text-center">
                <div class="text-xs text-slate-500 mb-1">${i.label}</div>
                <div class="font-semibold text-slate-700 text-sm">${i.value}</div>
              </div>
            `).join('')}
          </div>
          <h4 class="font-semibold text-slate-700 mb-2 text-sm">What to Include:</h4>
          <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Confirmation of AML/CTF program maintenance</li>
            <li>Summary of risk assessment reviews</li>
            <li>Training completion records</li>
            <li>Number of SMRs/TTRs filed during the period</li>
            <li>Any program changes made during the period</li>
            <li>Independent evaluation status</li>
            <li>Compliance officer details</li>
          </ul>
          <div class="mt-4">
            <a href="https://online.austrac.gov.au" target="_blank" rel="noopener"
              class="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              File via AUSTRAC Online →
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderEscalationGuide() {
    return `
      <div class="space-y-4">
        <h3 class="font-bold text-slate-800">Internal Escalation Process</h3>
        <div class="space-y-3">
          ${[
            { step: 1, who: 'Accountant / Staff', action: 'Identifies a red flag or suspicious behaviour', detail: 'Document your observation immediately. Note the date, time, client details, what you observed, and why it concerned you.', color: 'blue' },
            { step: 2, who: 'Accountant / Staff', action: 'Stop — do not tip off the client', detail: 'Continue behaving normally with the client. Do not indicate your concern. Do not ask probing questions that might alert them.', color: 'red' },
            { step: 3, who: 'Accountant / Staff', action: 'Escalate to AML/CTF Compliance Officer', detail: 'Report your observations to the designated escalation point (compliance officer or managing partner). Submit your written documentation.', color: 'amber' },
            { step: 4, who: 'Compliance Officer', action: 'Assess the suspicion', detail: 'The compliance officer reviews the information, assesses the risk level, and decides whether grounds exist to file an SMR.', color: 'purple' },
            { step: 5, who: 'Compliance Officer', action: 'File SMR if warranted', detail: 'If reasonable grounds for suspicion exist, file an SMR via AUSTRAC Online within the required timeframe (24 hours for terrorism; 3 business days otherwise).', color: 'green' },
            { step: 6, who: 'Compliance Officer', action: 'Document and consider engagement status', detail: 'Whether or not an SMR is filed, document the decision and reasons. Consider whether to continue, limit, or terminate the engagement.', color: 'slate' },
          ].map(s => `
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-${s.color}-100 text-${s.color}-700 flex items-center justify-center font-bold text-sm flex-shrink-0">${s.step}</div>
              <div class="bg-white rounded-xl border border-slate-200 p-4 flex-1">
                <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider">${s.who}</div>
                <div class="font-semibold text-slate-800 mb-1">${s.action}</div>
                <div class="text-sm text-slate-600">${s.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ─── RECORD KEEPING ───────────────────────────────────────────────────────
  renderRecordKeeping() {
    const el = document.getElementById('section-record-keeping');
    if (!el) return;
    const recordTypes = [
      { cat: 'Client identification records', examples: 'CDD forms, copies of ID documents, beneficial owner records, PEP/TFS screening results' },
      { cat: 'Engagement records', examples: 'Engagement letters for designated services, scope of work, instructions' },
      { cat: 'Transaction records', examples: 'Entity incorporation records, trust deeds, financing documents, restructuring records' },
      { cat: 'AML/CTF program documentation', examples: 'Risk assessment, policy document, process document, governance records' },
      { cat: 'Reporting records', examples: 'Internal copies of SMRs, TTRs, annual compliance reports; internal escalation records' },
      { cat: 'Training records', examples: 'Attendance records, training materials, quiz results, training dates' },
      { cat: 'Personnel records', examples: 'Due diligence records for AML/CTF roles, compliance officer appointment records' },
      { cat: 'Review and evaluation records', examples: 'Program review records, independent evaluation reports, change logs' },
    ];
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Record Keeping', 'What to keep, how to keep it, and for how long.', '🗂️')}

        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-center">
          <div class="text-sm font-semibold text-red-700">Minimum retention period for ALL AML/CTF records</div>
          <div class="text-3xl font-black text-red-600 my-1">7 years</div>
          <div class="text-sm text-red-600">from when the record was made or the business relationship ended (whichever is later)</div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-bold text-slate-800 mb-3">What Records to Keep</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="bg-slate-50 text-left">
                <th class="px-3 py-2 font-semibold text-slate-600">Record Type</th>
                <th class="px-3 py-2 font-semibold text-slate-600">Examples</th>
              </tr></thead>
              <tbody>
                ${recordTypes.map((r, i) => `
                  <tr class="${i % 2 === 1 ? 'bg-slate-50' : ''}">
                    <td class="px-3 py-2 font-medium text-slate-700">${r.cat}</td>
                    <td class="px-3 py-2 text-slate-600">${r.examples}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
          <strong>Accountant-Specific Note:</strong> Many accounting practices already retain client files for 7 years under professional standards. AML/CTF records should be integrated into existing file retention practices but may require additional categories (e.g., PEP screening records, SMR copies). SMR-related records must be stored separately from client files to protect the tipping-off prohibition.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          ${[
            { icon: '🔒', title: 'Stored Securely', desc: 'Protection against unauthorised access, loss, or damage. Digital records must be backed up.' },
            { icon: '🔍', title: 'Retrievable', desc: 'Must be accessible within a reasonable timeframe if AUSTRAC requests them.' },
            { icon: '🔐', title: 'Privacy Compliant', desc: 'Must comply with Australian Privacy Principles (APP) under the Privacy Act 1988.' },
          ].map(c => `
            <div class="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div class="text-2xl mb-2">${c.icon}</div>
              <div class="font-semibold text-slate-700 mb-1">${c.title}</div>
              <div class="text-xs text-slate-500">${c.desc}</div>
            </div>
          `).join('')}
        </div>

        ${Checklist.renderSection('recordAudit', 'Record Keeping Self-Audit Checklist')}
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── TRAINING ─────────────────────────────────────────────────────────────
  renderTraining() {
    const el = document.getElementById('section-training');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Staff Training & Awareness', 'Plan, deliver, and track AML/CTF training for your team.', '🎓')}

        <div class="flex gap-2 mb-5 border-b border-slate-200 flex-wrap">
          ${['Training Plan', 'Training Modules', 'Attendance Record', 'Knowledge Quiz'].map((tab, i) => `
            <button onclick="App.switchTab('tr-tab', ${i})"
              class="tr-tab pb-2 px-2 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="tr-tab-0">${Forms.renderTrainingPlan()}</div>
        <div id="tr-tab-1" class="hidden">${this.renderTrainingModules()}</div>
        <div id="tr-tab-2" class="hidden">${Forms.renderAttendanceRecord()}</div>
        <div id="tr-tab-3" class="hidden"><div id="quiz-container">${Quiz.render()}</div></div>
      </div>
    `;
  },

  renderTrainingModules() {
    const modules = [
      { n: 1, title: 'ML/TF/PF Overview', content: 'What is money laundering, terrorism financing, and proliferation financing? Why are accountants a target? The gatekeeper role.', audience: 'All staff' },
      { n: 2, title: 'The 8 Designated Services', content: 'Which services trigger AML/CTF obligations? How to identify when you\'re providing one. Exempt vs designated.', audience: 'All staff' },
      { n: 3, title: 'Legal Obligations', content: 'Overview of AML/CTF Act obligations for accountants under the Tranche 2 reforms.', audience: 'All staff' },
      { n: 4, title: 'Your AML/CTF Program', content: 'Walk through your practice\'s specific program — risk assessment, policies, and processes.', audience: 'All staff' },
      { n: 5, title: 'Customer Due Diligence', content: 'How to perform initial CDD for individuals, companies, trusts/SMSFs, and partnerships. Verifying identity documents.', audience: 'Client-facing staff' },
      { n: 6, title: 'Beneficial Ownership', content: 'How to identify and verify beneficial owners for companies, trusts, and multi-layered structures. The 25% threshold.', audience: 'Client-facing staff' },
      { n: 7, title: 'PEP & Sanctions Screening', content: 'What PEPs and TFS are. How to screen clients. What to do if a match is found.', audience: 'Client-facing staff, compliance officer' },
      { n: 8, title: 'Client Risk Rating', content: 'How to assign risk ratings (low, medium, high). Worked examples from the AUSTRAC starter kit.', audience: 'Client-facing staff' },
      { n: 9, title: 'Red Flags & Suspicious Activity', content: 'AUSTRAC\'s accountant-specific red flag indicators across all 4 categories. How to recognise exploitation.', audience: 'All staff' },
      { n: 10, title: 'Reporting Obligations', content: 'When and how to file SMRs, TTRs, and IFTIs. Internal escalation process. Annual compliance report.', audience: 'All staff' },
      { n: 11, title: 'Tipping-Off Prohibition', content: 'What you must not disclose. Penalties for tipping off. What you CAN do when you have concerns.', audience: 'All staff' },
      { n: 12, title: 'Record Keeping', content: 'What to keep, how to store it, for how long. Privacy obligations. Tipping-off protection for SMR records.', audience: 'Admin staff, compliance officer' },
      { n: 13, title: 'Ongoing CDD & Monitoring', content: 'How to conduct ongoing monitoring. When to re-assess client risk. Triggers for additional review.', audience: 'Client-facing staff' },
      { n: 14, title: 'Program Review & Evaluation', content: 'When and how to review the AML/CTF program. Review triggers. Independent evaluation planning.', audience: 'Compliance officer, partners' },
    ];
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${modules.map(m => `
          <div class="bg-white rounded-xl border border-slate-200 p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="tag bg-blue-100 text-blue-700">Module ${m.n}</span>
              <span class="tag bg-slate-100 text-slate-600">${m.audience}</span>
            </div>
            <div class="font-semibold text-slate-800 mb-1">${m.title}</div>
            <div class="text-sm text-slate-600">${m.content}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ─── PROGRAM REVIEW ───────────────────────────────────────────────────────
  renderProgramReview() {
    const el = document.getElementById('section-program-review');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Program Review & Maintenance', 'Your AML/CTF program must remain current as risks, operations, and regulatory expectations change.', '🔄')}

        <div class="flex gap-2 mb-5 border-b border-slate-200">
          ${['Review Triggers', 'Review Checklist', 'Change Log'].map((tab, i) => `
            <button onclick="App.switchTab('rev-tab', ${i})"
              class="rev-tab pb-2 px-2 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="rev-tab-0">${this.renderReviewTriggers()}</div>
        <div id="rev-tab-1" class="hidden">${Checklist.renderSection('programReview', 'Program Review Checklist')}</div>
        <div id="rev-tab-2" class="hidden">${Forms.renderChangeLog()}</div>
      </div>
    `;
    Checklist.updateProgress();
  },

  renderReviewTriggers() {
    const triggers = [
      { trigger: 'Scheduled periodic review', example: 'Your program specifies reviews every 6 or 12 months' },
      { trigger: 'Changes to designated services', example: 'You start offering trust creation (Service 6) when you previously only did financing (Service 4)' },
      { trigger: 'Changes to client types', example: 'You begin servicing overseas clients or clients in high-risk industries' },
      { trigger: 'Changes to jurisdictions', example: 'You begin dealing with clients linked to new high-risk jurisdictions' },
      { trigger: 'Internal incidents or control failures', example: 'A CDD step was missed; a suspicious activity was not escalated' },
      { trigger: 'Regulatory or legislative updates', example: 'AUSTRAC issues new guidance or the AML/CTF Rules change' },
      { trigger: 'New or emerging ML/TF/PF risks', example: 'New typologies identified by AUSTRAC or law enforcement' },
      { trigger: 'AUSTRAC communications', example: 'AUSTRAC issues a sector alert, NRA update, or direct regulatory feedback' },
      { trigger: 'Adverse independent evaluation findings', example: 'An evaluator identifies gaps or weaknesses in your program' },
      { trigger: 'Significant practice changes', example: 'New partner, office relocation, practice merger, new technology platforms' },
    ];
    return `
      <div class="space-y-2">
        ${triggers.map(t => `
          <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
            <span class="text-amber-500 text-lg flex-shrink-0">⚡</span>
            <div>
              <div class="font-semibold text-slate-800 text-sm">${t.trigger}</div>
              <div class="text-sm text-slate-500">Example: ${t.example}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ─── EVALUATION ───────────────────────────────────────────────────────────
  renderEvaluation() {
    const el = document.getElementById('section-evaluation');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Independent Evaluation Planning', 'Plan for the required independent evaluation of your AML/CTF program.', '🔎')}

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
          <div class="font-semibold text-blue-800 mb-1">AUSTRAC Requirement</div>
          <p class="text-sm text-blue-700">An independent evaluation must be conducted at least once every <strong>3 years</strong>. The evaluator must be independent of the program (not the compliance officer or anyone who designed the program).</p>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
          <strong>Accountant-Specific Consideration:</strong> Many accounting practices may choose to have their AML/CTF program evaluated by another accounting firm (peer review), an external compliance consultant, or an internal audit function (for larger firms).
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          ${[
            { who: 'External compliance consultant', ok: true },
            { who: 'Peer review (another accounting firm)', ok: true },
            { who: 'Internal audit function (if independent of AML/CTF program)', ok: true },
            { who: 'The AML/CTF compliance officer', ok: false },
            { who: 'The person who built the program', ok: false },
            { who: 'Staff directly involved in AML/CTF operations', ok: false },
          ].map(p => `
            <div class="${p.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl p-3 text-sm">
              <span class="${p.ok ? 'text-green-600' : 'text-red-600'} font-bold">${p.ok ? '✓ OK' : '✗ Not permitted'}</span>
              <div class="${p.ok ? 'text-green-800' : 'text-red-800'} mt-1">${p.who}</div>
            </div>
          `).join('')}
        </div>

        ${Forms.renderEvaluationPlan()}
      </div>
    `;
  },
  // ─── FORMS LIBRARY ────────────────────────────────────────────────────────
  renderFormsLibrary() {
    const el = document.getElementById('section-forms-library');
    if (!el) return;
    const forms = [
      { n: 1, name: 'CDD — Individual / Sole Trader', section: 'cdd', tab: 0 },
      { n: 2, name: 'CDD — Company', section: 'cdd', tab: 1 },
      { n: 3, name: 'CDD — Trust / SMSF', section: 'cdd', tab: 2 },
      { n: 4, name: 'CDD — Partnership', section: 'cdd', tab: 3 },
      { n: 5, name: 'CDD — Foreign Client (Supplement)', section: 'cdd', tab: 4 },
      { n: 6, name: 'Enhanced Due Diligence Record', section: 'cdd', tab: 5 },
      { n: 7, name: 'Ongoing CDD Review', section: 'cdd', tab: 6 },
      { n: 8, name: 'PEP/TFS Screening Record', section: 'cdd', tab: 7 },
      { n: 9, name: 'SMR Decision Record', section: 'cdd', tab: 8 },
      { n: 10, name: 'Delayed CDD Record', section: 'cdd', tab: 9 },
      { n: 11, name: 'Third-Party Reliance Record', section: 'cdd', tab: 10 },
      { n: 12, name: 'CDD Outcome Record', section: 'cdd', tab: 11 },
      { n: 13, name: 'Compliance Officer Appointment', section: 'governance', tab: 0 },
      { n: 14, name: 'AML/CTF Roles Assignment', section: 'governance', tab: 1 },
      { n: 15, name: 'Personnel Due Diligence Record', section: 'governance', tab: 2 },
      { n: 16, name: 'Training Plan', section: 'training', tab: 0 },
      { n: 17, name: 'Training Attendance Record', section: 'training', tab: 2 },
      { n: 18, name: 'Program Review Record', section: 'program-review', tab: 1 },
      { n: 19, name: 'Change Log', section: 'program-review', tab: 2 },
      { n: 20, name: 'Independent Evaluation Plan', section: 'evaluation', tab: 0 },
      { n: 21, name: 'Enrolment Checklist', section: 'enrolment', tab: 0 },
      { n: 22, name: 'Risk Assessment Summary', section: 'risk-assessment', tab: 0 },
    ];

    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Forms & Templates Library', 'All interactive forms and templates in one place. All data stays in your browser.', '📁')}

        <div class="flex gap-2 mb-4 flex-wrap">
          <button onclick="App.exportAllData()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Export All Data (JSON)</button>
          <label class="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 cursor-pointer">
            Import Data<input type="file" accept=".json" class="hidden" onchange="App.importData(event)">
          </label>
          <button onclick="window.print()" class="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300">Print Current View</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${forms.map(f => `
            <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-2 hover:border-blue-200 hover:shadow-sm transition-all">
              <div class="flex items-center gap-2">
                <span class="tag bg-slate-100 text-slate-600 text-xs">#${f.n}</span>
                <span class="text-sm font-medium text-slate-700">${f.name}</span>
              </div>
              <button onclick="App.goToForm('${f.section}', ${f.tab})"
                class="text-xs text-blue-600 hover:underline whitespace-nowrap flex-shrink-0">Open →</button>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 text-xs text-slate-400">All forms store data in your browser's localStorage. Export regularly as a backup. Data is never transmitted to any server.</div>
      </div>
    `;
  },

  // ─── STARTER KIT FORMS ─────────────────────────────────────────────────────
  renderStarterKitForms() {
    const el = document.getElementById('section-starter-kit-forms');
    if (!el) return;
    const mapping = [
      { austrac: 'Onboarding form — Individuals and sole traders', purpose: 'Collect initial client information during engagement', amliq: 'CDD — Individual / Sole Trader', section: 'cdd', tab: 0 },
      { austrac: 'Onboarding form — Entity (trust, company, etc.)', purpose: 'Collect initial information for entity clients', amliq: 'CDD — Company / Trust / Partnership', section: 'cdd', tab: 1 },
      { austrac: 'Initial CDD form — Individual', purpose: 'Verify identity, assess risk, complete CDD checks', amliq: 'CDD — Individual / Sole Trader', section: 'cdd', tab: 0 },
      { austrac: 'Initial CDD form — Entity', purpose: 'Verify entity identity, beneficial owners, CDD checks', amliq: 'CDD — Company / Trust / Partnership', section: 'cdd', tab: 1 },
      { austrac: 'Guided form: Escalation', purpose: 'Document escalation of high-risk or suspicious matters', amliq: 'Suspicious Activity (Red Flags)', section: 'red-flags', tab: 0 },
      { austrac: 'Guided form: Enhanced CDD', purpose: 'Document enhanced due diligence for high-risk clients', amliq: 'Enhanced Due Diligence Record', section: 'cdd', tab: 5 },
      { austrac: 'Process: Sanctions check', purpose: 'Step-by-step sanctions screening', amliq: 'PEP/TFS Screening Record', section: 'cdd', tab: 7 },
      { austrac: 'Process: PEP check', purpose: 'Step-by-step PEP screening', amliq: 'PEP/TFS Screening Record', section: 'cdd', tab: 7 },
      { austrac: 'Source of funds and source of wealth check', purpose: 'Verify where funds and wealth originate', amliq: 'Enhanced Due Diligence Record', section: 'cdd', tab: 5 },
      { austrac: 'Adverse media check process', purpose: 'Open-source background checks on clients', amliq: 'Enhanced Due Diligence Record', section: 'cdd', tab: 5 },
      { austrac: 'Periodic review and update form', purpose: 'Ongoing CDD review of existing clients', amliq: 'Ongoing CDD Review', section: 'cdd', tab: 6 },
      { austrac: 'Personnel due diligence forms', purpose: 'Assess suitability of staff in AML/CTF roles', amliq: 'Personnel Due Diligence Record', section: 'governance', tab: 2 },
      { austrac: 'AML/CTF Roles Form', purpose: 'Define AML/CTF responsibilities', amliq: 'AML/CTF Roles Assignment', section: 'governance', tab: 1 },
    ];
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('AUSTRAC Starter Kit Forms Reference', 'Maps AUSTRAC\'s official form names from the Accounting Program Starter Kit to the corresponding T2C templates.', '📋')}
        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/reforms/program-starter-kits/accounting-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library" target="_blank" rel="noopener" class="underline text-blue-600">Accounting Program Starter Kit Document Library</a>
          <div class="mt-1 text-slate-600">These are the official form names used in AUSTRAC's Accounting Program Starter Kit. T2C provides equivalent guidance-only templates.</div>
        </div>
        <div class="space-y-2">
          ${mapping.map(m => `
            <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="text-sm font-semibold text-slate-700">${m.austrac}</div>
                <div class="text-xs text-slate-500 mt-0.5">${m.purpose}</div>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-xs text-slate-400 mb-1">T2C equivalent</div>
                <button onclick="App.goToForm('${m.section}', ${m.tab})" class="text-xs text-blue-600 hover:underline font-medium">${m.amliq} →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ─── GLOSSARY ─────────────────────────────────────────────────────────────
  renderGlossary() {
    const el = document.getElementById('section-glossary');
    if (!el) return;
    const sorted = [...AMLiqData.glossary].sort((a, b) => a.term.localeCompare(b.term));
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Jargon Buster', 'Plain-English definitions of every AML/CTF term used in this tool and AUSTRAC guidance — including accountant-specific terminology.', '📖')}
        <input type="text" id="gloss-search" placeholder="Search terms..." oninput="App.filterGlossary()"
          class="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400">
        <div id="glossary-list" class="space-y-2">
          ${sorted.map(g => `
            <div class="gloss-item bg-white rounded-xl border border-slate-200 p-4">
              <div class="font-bold text-slate-800 text-sm mb-1">${g.term}</div>
              <div class="text-sm text-slate-600">${g.definition}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterGlossary() {
    const q = document.getElementById('gloss-search').value.toLowerCase();
    document.querySelectorAll('.gloss-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  renderFAQ() {
    const el = document.getElementById('section-faq');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Frequently Asked Questions', 'Common questions about AML/CTF obligations for accountants and tax agents, answered in plain English.', '❓')}
        <input type="text" id="faq-search" placeholder="Search FAQs..." oninput="App.filterFAQ()"
          class="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400">
        <div id="faq-list" class="space-y-2">
          ${AMLiqData.faq.map((f, i) => `
            <div class="faq-item bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button onclick="App.toggleFAQ(${i})"
                class="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-slate-50">
                <span class="font-medium text-slate-800 text-sm">${f.q}</span>
                <span id="faq-chevron-${i}" class="text-slate-400 flex-shrink-0 mt-0.5">▼</span>
              </button>
              <div id="faq-body-${i}" class="hidden px-5 pb-4">
                <p class="text-sm text-slate-600 mb-2">${f.a}</p>
                <div class="text-xs text-slate-400">Source: ${f.source}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  toggleFAQ(i) {
    const body = document.getElementById('faq-body-' + i);
    const chevron = document.getElementById('faq-chevron-' + i);
    if (body) body.classList.toggle('hidden');
    if (chevron) chevron.textContent = body.classList.contains('hidden') ? '▼' : '▲';
  },

  filterFAQ() {
    const q = document.getElementById('faq-search').value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  },

  // ─── AUSTRAC LINKS ────────────────────────────────────────────────────────
  renderAustracLinks() {
    const el = document.getElementById('section-austrac-links');
    if (!el) return;
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('AUSTRAC Links & Source Documents', 'Official AUSTRAC resources that form the basis of this tool.', '🔗')}
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Important:</strong> Always refer directly to AUSTRAC's official publications for the most current and authoritative guidance. This tool is based on materials as of February 2026 and should be used alongside, not instead of, the official AUSTRAC Accounting Program Starter Kit.
        </div>
        ${(() => {
          const grouped = {};
          (AMLiqData.austracLinks || []).forEach(l => {
            const cat = l.category || 'General';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(l);
          });
          return Object.entries(grouped).map(([cat, links]) => `
            <div class="mb-6">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">${cat}</h3>
              <div class="space-y-2">
                ${links.map(l => `
                  <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
                    <span class="text-blue-500 text-lg flex-shrink-0">🔗</span>
                    <div class="flex-1 min-w-0">
                      <a href="${l.url}" target="_blank" rel="noopener" class="font-semibold text-blue-600 hover:underline text-sm">${l.title}</a>
                      <div class="text-xs text-slate-500 mt-1">${l.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('');
        })()}
      </div>
    `;
  },

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  pageHeader(title, subtitle, icon = '') {
    return `
      <div class="page-header mb-6 pb-4 border-b border-slate-200">
        <div class="flex items-center gap-3 mb-1">
          ${icon ? `<span class="text-3xl">${icon}</span>` : ''}
          <h1 class="text-2xl font-bold text-slate-800">${title}</h1>
        </div>
        <p class="text-slate-500 text-sm">${subtitle}</p>
        <div class="text-xs text-slate-400 mt-1">Content sourced from AUSTRAC guidance — last reviewed February 2026. Not legal advice.</div>
      </div>
    `;
  },

  switchTab(prefix, tabIndex) {
    const baseClass = prefix.replace('-tab', '');
    const tabs = document.querySelectorAll(`.${baseClass}-tab`);
    tabs.forEach((tab, i) => {
      const panel = document.getElementById(`${prefix}-${i}`);
      if (i === tabIndex) {
        tab.classList.remove('text-slate-500', 'hover:text-slate-700');
        tab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
        if (panel) panel.classList.remove('hidden');
      } else {
        tab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        tab.classList.add('text-slate-500', 'hover:text-slate-700');
        if (panel) panel.classList.add('hidden');
      }
    });
  },

  toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    if (content) content.classList.toggle('open');
    const chevron = btn.querySelector('.accordion-chevron');
    if (chevron) chevron.textContent = content.classList.contains('open') ? '▲' : '▼';
  },

  goToForm(section, tab) {
    this.navigateTo(section);
    setTimeout(() => {
      const prefix = { cdd: 'cdd', governance: 'gov', training: 'tr', 'program-review': 'rev' }[section];
      if (prefix) this.switchTab(prefix + '-tab', tab);
    }, 100);
  },

  showModal(title, content, footerHTML = '') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal-footer').innerHTML = footerHTML;
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  },

  closeModal(forceClose = false) {
    if (this.legalGateActive && !forceClose) return;
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  },

  showToast(msg, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration);
  },

  exportAllData() {
    Export.exportAll();
  },

  importData(event) {
    Export.importData(event);
  },

  renderSimpleForm(prefix, fields) {
    return `
      <div class="space-y-3">
        ${fields.map(f => `
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">${f.label}</label>
            ${f.type === 'select'
              ? `<select id="${f.id}" onchange="Forms.saveField('${f.id}', this.value)" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                   ${(f.options || []).map(o => `<option value="${o}">${o}</option>`).join('')}
                 </select>`
              : `<input type="${f.type}" id="${f.id}" value="${localStorage.getItem('amliq_acct_forms_' + f.id) || ''}"
                   onchange="Forms.saveField('${f.id}', this.value)"
                   class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">`
            }
          </div>
        `).join('')}
        <button onclick="window.print()" class="mt-2 text-xs text-blue-600 hover:underline">🖨️ Print this form</button>
      </div>
    `;
  },
};
