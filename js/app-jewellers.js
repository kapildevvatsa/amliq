// T2C — Jewellers & Precious Goods Dealers — Core Application Logic
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
    this.renderRedFlags();
    this.renderReporting();
    this.renderRecordKeeping();
    this.renderTraining();
    this.renderProgramReview();
    this.renderEvaluation();
    this.renderFormsLibrary();
    this.renderStarterKitForms();
    this.renderCustomerExamples();
    this.renderGlossary();
    this.renderFAQ();
    this.renderAustracLinks();
  },

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  renderDashboard() {
    const el = document.getElementById('section-dashboard');
    const today = new Date();
    const oblStart = new Date('2026-07-01');

    let nudge = '';
    if (today < new Date('2026-03-31')) {
      nudge = { icon: '📚', text: 'Focus on understanding your obligations, choosing your regulation option, and building your AML/CTF program. Start with the Regulation Options assessment.', btn: 'Am I Regulated?', sec: 'am-i-regulated' };
    } else if (today <= new Date('2026-06-30')) {
      nudge = { icon: '📝', text: 'Enrolment is now open — enrol with AUSTRAC and finalise your program before 1 July 2026.', btn: 'Go to Enrolment Guide', sec: 'enrolment' };
    } else {
      nudge = { icon: '⚠️', text: 'Your obligations are now live. Ensure you are conducting CDD on every regulated transaction and monitoring for suspicious activity.', btn: 'CDD Checklists', sec: 'cdd' };
    }

    el.innerHTML = `
      <div class="p-6 max-w-5xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">AML/CTF Compliance Dashboard</h1>
          <p class="text-slate-500 mt-1">Your overview for meeting AUSTRAC's jewellers & precious goods dealers obligations from 1 July 2026.</p>
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
            { phase: 2, title: 'Build Program', icon: '🏗️', color: 'purple', sections: ['risk-assessment', 'program-builder', 'governance', 'enrolment'], keys: ['riskAssessment', 'governance', 'transactionDetection', 'seniorApproval'] },
            { phase: 3, title: 'Implement', icon: '⚙️', color: 'amber', sections: ['cdd', 'red-flags', 'reporting', 'record-keeping', 'training'], keys: ['cddProcedures', 'monitoring', 'reporting', 'recordKeeping', 'training'] },
            { phase: 4, title: 'Maintain', icon: '🔄', color: 'green', sections: ['program-review', 'evaluation'], keys: ['evaluation'] },
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
              { icon: '🔍', title: 'Regulation Options', sec: 'am-i-regulated', color: 'blue' },
              { icon: '⚠️', title: 'Risk Assessment', sec: 'risk-assessment', color: 'amber' },
              { icon: '🪪', title: 'CDD Forms', sec: 'cdd', color: 'blue' },
              { icon: '🚩', title: 'Red Flags', sec: 'red-flags', color: 'red' },
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
      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((diff % (1000 * 60)) / 1000);
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
      const items = AMLiqData.checklists[k];
      items.forEach(item => {
        total++;
        if (localStorage.getItem('check_' + item.id) === '1') done++;
      });
    });
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const scoreEl = document.getElementById('overall-score');
    const barEl = document.getElementById('overall-bar');
    if (scoreEl) scoreEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';

    // Phase percentages
    const phaseKeys = [
      [],
      ['riskAssessment', 'governance', 'transactionDetection', 'seniorApproval'],
      ['cddProcedures', 'monitoring', 'reporting', 'recordKeeping', 'training'],
      ['evaluation']
    ];
    for (let p = 1; p <= 4; p++) {
      const keys = phaseKeys[p];
      let pt = 0, pd = 0;
      keys.forEach(k => {
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

  // ─── AM I REGULATED — DECISION TREE ───────────────────────────────────────
  renderAmIRegulated() {
    const el = document.getElementById('section-am-i-regulated');
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Am I Regulated?', 'An interactive decision tree to help you determine if the AML/CTF reforms apply to your business, and which regulation option suits you.', '🔍')}

        <!-- Regulation Options Reference -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Regulation Options — Quick Reference</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead><tr class="bg-slate-50 text-left">
                  <th class="px-3 py-2 font-semibold text-slate-600">Option</th>
                  <th class="px-3 py-2 font-semibold text-slate-600">Description</th>
                  <th class="px-3 py-2 font-semibold text-slate-600">Obligations</th>
                </tr></thead>
                <tbody>
                  ${AMLiqData.regulationOptions.map(o => `
                    <tr class="border-t border-slate-100">
                      <td class="px-3 py-2 font-bold text-slate-700">Option ${o.option}</td>
                      <td class="px-3 py-2 text-slate-600">${o.description}</td>
                      <td class="px-3 py-2 text-slate-600">${o.obligations}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="decision-tree-container">
          ${this.renderDecisionStep(0)}
        </div>
      </div>
    `;
  },

  decisionTree: [
    {
      id: 0,
      question: 'Does your business buy or sell precious metals, precious stones, or precious products (jewellery, watches, goldsmith/silversmith wares)?',
      hint: 'Precious metals include gold, silver, platinum and others. Precious stones include diamonds, rubies, sapphires, opals, pearls, etc. Precious products include jewellery, watches, items of personal adornment, and goldsmith/silversmith wares.',
      yes: { next: 1, note: 'Your business deals in precious goods. Let\'s check your payment methods.' },
      no: 'not-dealer'
    },
    {
      id: 1,
      question: 'Do you accept physical currency (cash — banknotes and coins) or virtual assets (e.g., cryptocurrency) as payment?',
      hint: 'Physical currency means banknotes and coins only. Electronic transfers, cheques, credit/debit cards are NOT physical currency. Virtual assets include cryptocurrency.',
      yes: { next: 2, note: 'You accept cash or virtual assets. Let\'s check transaction values.' },
      no: 'option-1'
    },
    {
      id: 2,
      question: 'Do any single transactions reach $10,000 or more in physical currency or virtual assets?',
      hint: 'This is the total value paid in cash and/or virtual assets for a single purchase or sale of precious goods.',
      yes: { next: 4, note: 'You are providing a designated service. Let\'s confirm scope.' },
      no: { next: 3 }
    },
    {
      id: 3,
      question: 'Could transactions be linked? For example, lay-by payments, instalments, same customer same day, or multiple payments on one invoice?',
      hint: 'Linked transactions that cumulatively reach $10,000+ in cash/virtual assets trigger a designated service. Example: three $5,000 cash instalments on one item = $15,000 linked transaction.',
      yes: { next: 4, note: 'If linked transactions reach $10,000+, you are providing a designated service.' },
      no: 'option-2'
    },
    {
      id: 4,
      question: 'Does the service have a geographical link to Australia?',
      hint: 'The AML/CTF Act applies to businesses operating in Australia providing designated services.',
      yes: { next: 5, note: 'Geographic link confirmed.' },
      no: 'not-geographic'
    },
    {
      id: 5,
      question: 'Do you deal only with individual customers (not companies, trusts, partnerships, or other entities)?',
      hint: 'If you only sell to individual people paying in cash, you may be eligible for AUSTRAC\'s streamlined compliance process (Option 3). If you also deal with entities, you need a full program (Option 4).',
      yes: 'option-3',
      no: 'option-4'
    },
  ],

  renderDecisionStep(stepId, history = []) {
    const step = this.decisionTree.find(s => s.id === stepId);
    if (!step) return '';

    const historyHTML = history.length > 0 ? `
      <div class="mb-4 space-y-1">
        ${history.map((h, i) => `
          <div class="flex items-center gap-2 text-sm text-slate-500">
            <span class="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">${i + 1}</span>
            <span>${h.q}</span>
            <span class="ml-auto tag bg-green-100 text-green-700">${h.a}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    return `
      ${historyHTML}
      <div class="decision-node">
        <div class="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Question ${history.length + 1}</div>
        <p class="text-base font-semibold text-slate-800 mb-2">${step.question}</p>
        ${step.hint ? `<p class="text-sm text-slate-500 mb-4 italic">${step.hint}</p>` : ''}
        <div class="flex gap-3 mt-4">
          <button onclick="App.decisionAnswer(${stepId}, 'yes', ${JSON.stringify(history).replace(/"/g, '&quot;')})"
            class="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 text-sm">YES</button>
          <button onclick="App.decisionAnswer(${stepId}, 'no', ${JSON.stringify(history).replace(/"/g, '&quot;')})"
            class="flex-1 bg-slate-200 text-slate-700 py-2.5 rounded-lg font-semibold hover:bg-slate-300 text-sm">NO</button>
        </div>
      </div>
    `;
  },

  decisionAnswer(stepId, answer, history) {
    const step = this.decisionTree.find(s => s.id === stepId);
    const newHistory = [...history, { q: step.question, a: answer.toUpperCase() }];
    const outcome = step[answer];
    const container = document.getElementById('decision-tree-container');

    if (typeof outcome === 'string') {
      container.innerHTML = this.renderDecisionResult(outcome, newHistory);
    } else {
      const note = outcome.note ? `<div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">${outcome.note}</div>` : '';
      container.innerHTML = this.renderDecisionStep(outcome.next, newHistory);
      if (note) container.insertAdjacentHTML('afterbegin', note);
    }
  },

  renderDecisionResult(outcome, history) {
    const configs = {
      'option-1': {
        cls: 'result-exempt',
        icon: '✅',
        title: 'Option 1 — You are likely NOT regulated',
        body: `<p class="text-sm mb-3">If you do not accept physical currency (cash) or virtual assets as payment, you are <strong>not providing a designated service</strong> and have <strong>no AML/CTF obligations</strong> under these reforms.</p>
               <p class="text-sm mb-3">You can continue accepting debit/credit cards, bank transfers, and other non-cash payment methods without any AML/CTF program.</p>
               <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mt-3"><strong>Tip:</strong> If you ever decide to start accepting cash or virtual assets for $10,000+ transactions in the future, you will need to implement an AML/CTF program <em>before</em> providing the first designated service.</div>`,
        disclaimer: 'Confirm your exempt status directly with AUSTRAC. If your business model changes, re-assess your obligations.'
      },
      'option-2': {
        cls: 'result-exempt',
        icon: '🟡',
        title: 'Option 2 — Limited Monitoring Required',
        body: `<p class="text-sm mb-3">While individual transactions under $10,000 do not trigger the designated service, you should have <strong>monitoring systems</strong> in place to detect linked or structured transactions that could exceed the threshold.</p>
               <p class="text-sm mb-3">If a $10,000+ transaction occurs (including through linked transactions), you <strong>must have a program or face penalties</strong>.</p>
               <div class="flex flex-wrap gap-2 mt-4">
                 <button onclick="App.navigateTo('obligations-overview')" class="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700">View Obligations</button>
               </div>`,
        disclaimer: 'You should implement clear policies about linked transactions. Consider professional advice on whether to establish a program proactively.'
      },
      'option-3': {
        cls: 'result-regulated',
        icon: '📋',
        title: 'Option 3 — Streamlined Compliance (Individuals Only)',
        body: `<p class="text-sm mb-3">You are providing a designated service, but since you deal <strong>only with individual customers</strong>, you may be eligible for AUSTRAC's <strong>streamlined compliance process</strong>.</p>
               <p class="text-sm mb-3">Under this model, physical currency transactions are referred to the store owner/manager, who follows a simplified CDD process for low/medium risk customers.</p>
               <p class="text-sm mb-3">You still need to: enrol with AUSTRAC, appoint a compliance officer, conduct CDD, screen for PEPs/sanctions, file reports, keep records, and train staff — but the processes are simplified.</p>
               <div class="flex flex-wrap gap-2 mt-4">
                 <button onclick="App.navigateTo('obligations-overview')" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">View All Obligations</button>
                 <button onclick="App.navigateTo('enrolment')" class="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">Enrolment Guide</button>
               </div>`,
        disclaimer: 'This is a preliminary assessment. Confirm your eligibility for the streamlined process with AUSTRAC and seek professional advice if unsure.'
      },
      'option-4': {
        cls: 'result-regulated',
        icon: '⚠️',
        title: 'Option 4 — Full AML/CTF Program Required',
        body: `<p class="text-sm mb-3">You are providing a designated service to a range of customer types. You need a <strong>full AML/CTF program</strong> covering all CDD procedures, reporting, record keeping, training, and governance.</p>
               <p class="text-sm mb-3">This means you must: enrol with AUSTRAC, appoint a compliance officer, develop a complete AML/CTF program, conduct CDD on all customer types, screen for PEPs/sanctions, file reports, keep records, and train staff.</p>
               <div class="flex flex-wrap gap-2 mt-4">
                 <button onclick="App.navigateTo('obligations-overview')" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">View All Obligations</button>
                 <button onclick="App.navigateTo('enrolment')" class="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">Enrolment Guide</button>
               </div>`,
        disclaimer: 'This is a preliminary assessment. Confirm your obligations with AUSTRAC and seek professional advice for your specific circumstances.'
      },
      'not-dealer': {
        cls: 'result-exempt',
        icon: '✅',
        title: 'You are likely NOT a dealer in precious metals, stones, or products',
        body: `<p class="text-sm mb-3">Based on your answers, your business does not appear to buy or sell precious metals, stones, or products. The jeweller AML/CTF reforms <strong>do not apply</strong> to your business.</p>
               <p class="text-sm">However, review AUSTRAC\'s full list of designated services to check if any other category applies to your business.</p>`,
        disclaimer: 'This is a preliminary indication only. Always confirm with AUSTRAC and consider professional advice.'
      },
      'not-geographic': {
        cls: 'result-exempt',
        icon: '🌏',
        title: 'The reforms may not apply to your activity',
        body: `<p class="text-sm">If the service has no geographical link to Australia, the Australian AML/CTF Act reforms may not apply. However, you may have obligations under the laws of another jurisdiction. Seek professional advice.</p>`,
        disclaimer: 'Confirm your position with legal advice regarding the geographic scope of the AML/CTF Act.'
      },
    };

    const c = configs[outcome] || configs['not-dealer'];
    const histHTML = history.map((h, i) => `
      <div class="flex items-center gap-2 text-sm text-slate-500 mb-1">
        <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">${i + 1}</span>
        <span>${h.q}</span>
        <span class="ml-auto tag bg-slate-100 text-slate-600">${h.a}</span>
      </div>
    `).join('');

    return `
      <div class="mb-4 space-y-1">${histHTML}</div>
      <div class="decision-node ${c.cls}">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">${c.icon}</span>
          <h3 class="font-bold text-lg">${c.title}</h3>
        </div>
        ${c.body}
        <div class="mt-4 p-3 bg-white/60 rounded-lg text-xs text-slate-500 border border-slate-200">
          <strong>Note:</strong> ${c.disclaimer}
        </div>
      </div>
      <button onclick="document.getElementById('decision-tree-container').innerHTML = App.renderDecisionStep(0, [])"
        class="mt-4 text-sm text-blue-600 hover:underline">← Start again</button>
    `;
  },

  // ─── OBLIGATIONS OVERVIEW ─────────────────────────────────────────────────
  renderObligationsOverview() {
    const el = document.getElementById('section-obligations-overview');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Obligations Overview', 'What the AML/CTF reforms mean for Australian jewellers and precious goods dealers, in plain English.', '📋')}

        <!-- What Changed -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">What Changed?</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3 open">
            <p class="text-sm text-slate-600 mb-3">Australia's AML/CTF Act (Tranche 2 reforms) extends anti-money laundering obligations to jewellers and dealers in precious metals, stones and products for the first time, effective <strong>1 July 2026</strong>.</p>
            <p class="text-sm text-slate-600 mb-3">AUSTRAC's 2024 National Risk Assessment rated the <strong class="text-red-600">retail jewellery sector as HIGH</strong> for money laundering risk. Precious metals and stones are among the most at-risk goods because they can be bought anonymously with cash, are easy to conceal and transport, difficult to trace, and easy to convert back to legitimate funds.</p>
            <div class="austrac-callout text-sm">
              <strong class="text-blue-800">AUSTRAC CEO Brendan Thomas:</strong> "For most customers who are individuals posing a low to medium risk, compliance generally boils down to just three forms."
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
            <div class="overflow-x-auto mb-3">
              <table class="w-full text-sm">
                <thead><tr class="bg-slate-50 text-left">
                  <th class="px-3 py-2 font-semibold text-slate-600 rounded-l">Designated Service</th>
                  <th class="px-3 py-2 font-semibold text-slate-600 rounded-r">When It Applies</th>
                </tr></thead>
                <tbody>
                  <tr class="border-t border-slate-100"><td class="px-3 py-2 font-medium">Buying or selling precious metals, stones, or products</td><td class="px-3 py-2 text-slate-600">When valued at $10,000+, involves single or linked transactions, and is made using physical currency, virtual assets, or a combination</td></tr>
                </tbody>
              </table>
            </div>
            <h4 class="font-semibold text-slate-700 mb-2">What counts as "precious goods":</h4>
            <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside mb-4">
              <li><strong>Precious Metals:</strong> Gold, silver, platinum, iridium, osmium, palladium, rhodium, ruthenium (or alloys with 2%+ by weight)</li>
              <li><strong>Precious Stones:</strong> Gem-quality substances — diamond, ruby, sapphire, emerald, opal, pearl, topaz, etc.</li>
              <li><strong>Precious Products:</strong> Jewellery, watches, personal adornment items, goldsmith/silversmith wares</li>
            </ul>
            <h4 class="font-semibold text-slate-700 mb-2">What is EXEMPT:</h4>
            <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Sales paid entirely by bank transfer, debit card, or credit card — not a designated service</li>
              <li>Sales under $10,000 in cash/virtual assets (with no linked transactions)</li>
              <li>Costume jewellery with no precious metals or stones</li>
              <li>Bullion dealing — regulated separately</li>
              <li>Watch/jewellery repair only (no sales)</li>
            </ul>
          </div>
        </div>

        <!-- 12 Core Obligations -->
        <div class="mb-5">
          <h2 class="font-bold text-slate-800 text-lg mb-3">Your 12 Core Obligations</h2>
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
            <p class="text-sm text-slate-600 mb-3">AUSTRAC has stated it will take a <strong>proportionate, risk-based approach</strong> to enforcement for newly regulated sectors during the initial implementation period.</p>
            <p class="text-sm text-slate-600 mb-3">However, AUSTRAC has been clear that enforcement focus will be on entities that <strong>fail to enrol</strong> or <strong>make no meaningful implementation effort</strong>.</p>
            <p class="text-sm text-slate-600 mb-3"><strong>If you provide a regulated transaction without an AML/CTF program, you'll be in breach of many obligations and could face serious penalties.</strong></p>
            <div class="austrac-callout text-sm">
              <strong class="text-blue-800">AUSTRAC's regulatory expectation:</strong> "By 30 June 2026, AUSTRAC expects all Tranche 2 entities to have enrolled, adopted an AML/CTF program, trained staff, and implemented reporting systems."
            </div>
            <p class="text-sm text-slate-500 mt-3">For current enforcement information, refer directly to <a href="https://www.austrac.gov.au" target="_blank" class="underline text-blue-600">austrac.gov.au</a>.</p>
          </div>
        </div>
      </div>
    `;
  },

  // ─── KEY DATES ────────────────────────────────────────────────────────────
  renderKeyDates() {
    const el = document.getElementById('section-key-dates');
    const dates = [
      { date: '31 March 2026', label: 'AUSTRAC Enrolment Opens', detail: 'Enrolment via AUSTRAC Online (online.austrac.gov.au) opens for jewellers and precious goods dealers. Begin the enrolment process as soon as possible.', status: 'open', icon: '🟢' },
      { date: 'Before 1 July 2026', label: 'Complete your AML/CTF Program', detail: 'Your AML/CTF program (risk assessment, policies, processes, governance) should be completed and approved by senior management before obligations commence.', status: 'prep', icon: '🔵' },
      { date: 'Before 1 July 2026', label: 'Train Your Staff', detail: 'All relevant staff should receive initial AML/CTF training before obligations commence. Include transaction detection, linked transactions, and payment diversion awareness.', status: 'prep', icon: '🔵' },
      { date: '1 July 2026', label: 'Obligations Commence', detail: 'All AML/CTF obligations are live. You must conduct CDD on every regulated transaction ($10,000+ in cash/virtual assets), monitor for suspicious activity, and be ready to file reports.', status: 'critical', icon: '🔴' },
      { date: 'Within 28 days of first service', label: 'Enrolment Deadline', detail: 'You must enrol with AUSTRAC within 28 days of first providing a designated service. If you first provide a service on 1 July 2026, you must enrol by 29 July 2026.', status: 'deadline', icon: '🟡' },
      { date: '29 July 2026', label: 'Latest Possible Enrolment Date', detail: 'The absolute latest date to enrol is 29 July 2026 (if your first designated service was provided on 1 July 2026).', status: 'deadline', icon: '🟡' },
      { date: 'Within 14 days of appointment', label: 'Notify AUSTRAC of Compliance Officer', detail: 'Once you appoint your AML/CTF compliance officer, you must notify AUSTRAC within 14 days via AUSTRAC Online.', status: 'ongoing', icon: '🟠' },
      { date: 'Annually (minimum)', label: 'Refresher Training', detail: 'AML/CTF training for all relevant staff must be refreshed at least annually.', status: 'ongoing', icon: '🟠' },
      { date: 'Every 3 years (minimum)', label: 'Independent Evaluation', detail: 'An independent evaluation of your AML/CTF program must be conducted at least once every 3 years.', status: 'ongoing', icon: '🟠' },
    ];

    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Key Dates & Timeline', 'Important dates for meeting your AML/CTF obligations as a jeweller or precious goods dealer.', '📅')}
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
        ${this.pageHeader('Risk Assessment Wizard', 'Assess your ML/TF/PF risk profile across four categories, aligned to AUSTRAC\'s risk framework for precious goods dealers.', '⚠️')}
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Context:</strong> AUSTRAC's 2024 National Risk Assessment rated the <strong>retail jewellery sector as HIGH</strong> for money laundering risk. Precious metals and stones are among the most at-risk goods — they can be bought anonymously with cash, are easy to conceal and transport, difficult to trace, and easy to convert back to funds.
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
        ${this.pageHeader('AML/CTF Program Builder', 'A comprehensive checklist of everything your AML/CTF program should contain — aligned to AUSTRAC\'s starter kit.', '🏗️')}
        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">AUSTRAC Starter Kit alignment:</strong> The starter kit contains core documents: Customise Guide, Risk Assessment, Policy Document, and Process Document. Once customised and approved by senior management, these together form your official AML/CTF program.
          <div class="mt-2 text-amber-700 font-medium">⚠️ The starter kit is NOT designed to be used as-is. You must complete the customisation step to create a program that reflects your specific business.</div>
        </div>

        <!-- AUSTRAC Downloadable Templates -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-1">AUSTRAC Official Templates (Download from austrac.gov.au)</h3>
          <p class="text-xs text-slate-500 mb-3">Official Word documents from AUSTRAC's Jeweller Program Starter Kit. Download, customise, and use them as your AML/CTF program.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a href="https://www.austrac.gov.au/sites/default/files/2026-01/Jewellers%20-%20Process%20document%20-%20January%202026.docx" target="_blank" rel="noopener" class="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <span class="text-blue-500 text-lg">📄</span>
              <div><div class="text-sm font-medium text-slate-700">Jeweller Process Document</div><div class="text-xs text-slate-400">Word document · 926 KB</div></div>
            </a>
            <a href="https://www.austrac.gov.au/reforms/program-starter-kits/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-document-library" target="_blank" rel="noopener" class="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <span class="text-blue-500 text-lg">📁</span>
              <div><div class="text-sm font-medium text-slate-700">Full Document Library</div><div class="text-xs text-slate-400">All starter kit templates</div></div>
            </a>
          </div>
        </div>

        <!-- 4-Step Customisation Process -->
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-3">AUSTRAC's 4-Step Customisation Process</h3>
          <div class="space-y-3">
            ${[
              { n: 1, title: 'Customise your risk assessment', desc: 'Identify risks relevant to your business, their significance, and acceptable risk levels.' },
              { n: 2, title: 'Customise personnel sections', desc: 'Assign AML/CTF roles, conduct personnel due diligence, and plan staff training.' },
              { n: 3, title: 'Tailor customer sections', desc: 'Establish CDD procedures, transaction detection systems, monitoring, and risk response processes.' },
              { n: 4, title: 'Document and approve your program', desc: 'Finalise all documents and obtain formal senior management approval.' },
            ].map(s => `
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">${s.n}</div>
                <div><div class="text-sm font-semibold text-slate-700">${s.title}</div><div class="text-xs text-slate-500">${s.desc}</div></div>
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
          ${this.renderProgramChecklist()}
        </div>

        <!-- Precious Goods Valuation Record -->
        <div class="mt-6">
          <h3 class="font-bold text-slate-800 mb-2">Precious Goods Valuation</h3>
          <p class="text-sm text-slate-500 mb-3">Document item valuation, provenance, and origin for regulated transactions.</p>
          ${Forms.renderValuationRecord()}
        </div>
      </div>
    `;
    Checklist.updateProgress();
  },

  // Custom checklist rendering for jewellers (10 sections A–J including Transaction Detection)
  renderProgramChecklist() {
    const sections = [
      { key: 'riskAssessment', title: 'A. Risk Assessment', icon: '⚠️' },
      { key: 'governance', title: 'B. Governance', icon: '👤' },
      { key: 'transactionDetection', title: 'C. Transaction Detection Systems', icon: '💰' },
      { key: 'cddProcedures', title: 'D. Customer Due Diligence Procedures', icon: '🪪' },
      { key: 'monitoring', title: 'E. Transaction Monitoring & Suspicious Activity', icon: '🔍' },
      { key: 'reporting', title: 'F. Reporting', icon: '📤' },
      { key: 'recordKeeping', title: 'G. Record Keeping', icon: '🗂️' },
      { key: 'training', title: 'H. Training', icon: '🎓' },
      { key: 'evaluation', title: 'I. Independent Evaluation', icon: '🔎' },
      { key: 'seniorApproval', title: 'J. Senior Management Approval', icon: '✅' },
    ];

    return sections.map(s => {
      const items = AMLiqData.checklists[s.key];
      if (!items) return '';
      const done = items.filter(item => Checklist.get(item.id)).length;
      const total = items.length;
      const pct = Math.round((done / total) * 100);

      return `
        <div class="bg-white rounded-xl border border-slate-200 mb-3 overflow-hidden">
          <button onclick="Checklist.toggleSection('pb-${s.key}')"
            class="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 text-left">
            <div class="flex items-center gap-3">
              <span class="text-lg">${s.icon}</span>
              <div>
                <div class="font-semibold text-slate-800">${s.title}</div>
                <div class="text-xs text-slate-500">${done} of ${total} items complete</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 bg-slate-100 rounded-full h-2 hidden sm:block">
                <div class="progress-bar bg-blue-500 h-2 rounded-full" style="width:${pct}%"></div>
              </div>
              <span class="tag ${pct === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${pct}%</span>
              <span id="pb-chevron-${s.key}" class="text-slate-400">▼</span>
            </div>
          </button>
          <div id="pb-${s.key}" class="hidden border-t border-slate-100 px-5 py-4">
            <div class="space-y-2">
              ${items.map(item => `
                <div class="checklist-item flex items-start gap-3">
                  <input type="checkbox" id="chk-${item.id}" ${Checklist.get(item.id) ? 'checked' : ''}
                    onchange="Checklist.set('${item.id}', this.checked)"
                    class="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer flex-shrink-0">
                  <div class="flex-1">
                    <label for="chk-${item.id}" class="text-sm cursor-pointer font-medium ${Checklist.get(item.id) ? 'line-through text-slate-400' : 'text-slate-700'}">
                      ${item.text}
                    </label>
                    <div class="text-xs text-slate-400 mt-0.5">${item.detail || ''}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // ─── GOVERNANCE ───────────────────────────────────────────────────────────
  renderGovernance() {
    const el = document.getElementById('section-governance');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Governance Setup', 'Establish the governance framework for your AML/CTF program.', '👤')}
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
            { n: 1, title: 'Confirm You Need to Enrol', body: 'Use the <button onclick="App.navigateTo(\'am-i-regulated\')" class="underline text-blue-600">Am I Regulated? decision tree</button> to confirm you are providing a designated service. If you chose Option 1 (no cash/virtual assets), you do NOT need to enrol.' },
            { n: 2, title: 'Prepare Your Information', body: '<ul class="list-disc list-inside space-y-1 text-slate-600">'+
              '<li>Australian Business Number (ABN)</li>'+
              '<li>Business name and structure (sole trader, partnership, company, trust)</li>'+
              '<li>Contact person details</li>'+
              '<li>Compliance officer details (name, role)</li>'+
              '<li>Description of designated services provided</li>'+
              '<li>Business address(es)</li>'+
              '</ul>' },
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

        <!-- Enrolment Form -->
        ${Forms.renderEnrolmentForm()}
      </div>
    `;
  },

  // ─── CDD ──────────────────────────────────────────────────────────────────
  renderCDD() {
    const el = document.getElementById('section-cdd');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Customer Due Diligence (CDD)', 'Step-by-step guidance on identifying and verifying customers for each entity type.', '🪪')}

        <!-- Who Is Your Customer -->
        <div class="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4 text-sm">
          <div class="font-bold text-amber-800 mb-1">Who Is Your Customer?</div>
          <p class="text-amber-700">Your customer is the <strong>buyer or the seller</strong> in the transaction. If you are selling precious goods, the buyer is your customer. If you are buying precious goods (e.g., buying scrap jewellery), the seller is your customer.</p>
        </div>

        <!-- Payment Diversion Warning -->
        <div class="bg-red-50 border border-red-300 rounded-xl p-4 mb-4 text-sm">
          <div class="font-bold text-red-800 mb-1">⚠️ Critical AUSTRAC Warning — Payment Diversion</div>
          <p class="text-red-700">If a customer approaches you for a regulated transaction and you hold a suspicion that must be reported, you must make a suspicious matter report. This applies <strong>even if you divert the customer to an alternative payment method</strong> (e.g., bank transfer). Accepting payment through alternative means when you hold a suspicion <strong>could make you complicit in criminal conduct</strong>.</p>
        </div>

        <div class="austrac-callout mb-4 text-sm">
          <strong class="text-blue-800">Overarching principle:</strong> You must conduct initial CDD <em>before</em> providing a designated service (i.e., before completing a purchase or sale for $10,000+ in cash/virtual assets). If CDD cannot be completed satisfactorily, consider whether to decline or cease providing the service.
        </div>

        <!-- Customer Risk Rating Table -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <h3 class="font-semibold text-slate-700 mb-3">Customer Risk Rating Table <span class="text-xs font-normal text-slate-400 ml-1">(AUSTRAC Starter Kit)</span></h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead><tr class="border-b border-slate-200">
                <th class="text-left py-2 pr-3 font-semibold text-slate-600 w-24">Rating</th>
                <th class="text-left py-2 pr-3 font-semibold text-slate-600">Risk Factors Present</th>
                <th class="text-left py-2 font-semibold text-slate-600 w-32">Controls</th>
              </tr></thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-red-100 text-red-700 font-bold">HIGH</span></td>
                  <td class="py-2 pr-3 text-slate-600">$50,000+ in physical currency; high-risk metals/stones; stolen/conflict/counterfeit items; scrap metal dealers; unusual requests with no economic purpose; suspected criminal activity; foreign PEPs; complex structures creating anonymity; unexplained wealth</td>
                  <td class="py-2 text-slate-600">Enhanced CDD; source of funds &amp; wealth check; adverse media check; senior manager approval</td>
                </tr>
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-amber-100 text-amber-700 font-bold">MEDIUM</span></td>
                  <td class="py-2 pr-3 text-slate-600">Domestic or international organisation PEPs; third party not enrolled with AUSTRAC representing customer; charity/non-profit</td>
                  <td class="py-2 text-slate-600">Initial CDD (simplified CDD not appropriate)</td>
                </tr>
                <tr>
                  <td class="py-2 pr-3"><span class="tag bg-green-100 text-green-700 font-bold">LOW</span></td>
                  <td class="py-2 pr-3 text-slate-600">Does not meet high or medium-risk criteria</td>
                  <td class="py-2 text-slate-600">Simplified CDD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 mt-3">
            <strong>AUSTRAC note:</strong> "If you risk rate your customer and don't want to apply the controls above, you could instead ensure that they pay using a method other than physical currency, such as via bank transfer."
          </div>
        </div>

        <!-- Customer Lifecycle -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-5">
          <button class="accordion-btn w-full text-left flex items-center justify-between" onclick="App.toggleAccordion(this)">
            <span class="font-semibold text-slate-800">Customer Lifecycle — 8-Step Process (AUSTRAC)</span>
            <span class="accordion-chevron text-slate-400">▼</span>
          </button>
          <div class="accordion-content mt-3">
            <div class="space-y-2">
              ${AMLiqData.customerLifecycle.map(s => `
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">${s.step}</div>
                  <div><div class="text-sm font-semibold text-slate-700">${s.title}</div><div class="text-xs text-slate-500">${s.description}</div></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- CDD Tabs -->
        <div class="flex gap-2 mb-5 overflow-x-auto border-b border-slate-200">
          ${['Individual', 'Company', 'Trust', 'Partnership', 'Foreign', 'EDD', 'Ongoing CDD', 'PEP/Sanctions', 'Delayed CDD', '3rd Party Reliance', 'CDD Outcome'].map((tab, i) => `
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
        <div id="cdd-tab-6" class="hidden">${Forms.renderOngoingCDD()}</div>
        <div id="cdd-tab-7" class="hidden">${Forms.renderPEPScreening()}</div>
        <div id="cdd-tab-8" class="hidden">${this.renderDelayedCDD()}</div>
        <div id="cdd-tab-9" class="hidden">${this.renderThirdPartyReliance()}</div>
        <div id="cdd-tab-10" class="hidden">${this.renderCDDOutcome()}</div>
      </div>
    `;
  },

  renderDelayedCDD() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform" target="_blank" rel="noopener" class="underline text-blue-600">Delayed Initial CDD (Reform)</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When May You Delay CDD?</h3>
          <p class="text-sm text-slate-600 mb-3">You may delay initial CDD only if <strong>both</strong> conditions are met:</p>
          <div class="space-y-2 mb-4">
            <div class="flex items-start gap-2 text-sm text-slate-700"><span class="text-green-600 font-bold mt-0.5">1.</span><span>You determine on reasonable grounds that there is <strong>low additional ML/TF/PF risk</strong> if you delay.</span></div>
            <div class="flex items-start gap-2 text-sm text-slate-700"><span class="text-green-600 font-bold mt-0.5">2.</span><span>Delaying is <strong>essential to avoid interrupting the ordinary course of business</strong>.</span></div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mb-4">
            <strong>⚠️ Critical:</strong> Sanctions screening must be completed <strong>without delay</strong> even when other CDD is delayed.
          </div>
          <div class="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            <strong>Examples where delay may be appropriate:</strong>
            <ul class="list-disc list-inside mt-1 space-y-1">
              <li>Customer purchasing on lay-by — CDD completed before final payment</li>
              <li>Remote customer unable to provide original ID immediately</li>
              <li>Urgent same-day transaction with trusted returning customer</li>
            </ul>
          </div>
        </div>
        ${Forms.renderDelayedCDD()}
      </div>
    `;
  },

  renderThirdPartyReliance() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform" target="_blank" rel="noopener" class="underline text-blue-600">Reliance Under CDD Arrangements (Reform)</a>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-2">What Is Third-Party Reliance?</h3>
          <p class="text-sm text-slate-600 mb-3">You may rely on CDD conducted by another reporting entity rather than conducting CDD yourself from scratch.</p>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 mb-3">
            <strong>⚠️ Risk Note:</strong> A third party <em>not enrolled with AUSTRAC</em> representing the customer is a <strong>medium risk factor</strong> per AUSTRAC's starter kit.
          </div>
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <strong>Critical Rule:</strong> You <strong>remain responsible</strong> for ensuring CDD obligations are met, even when relying on a third party.
          </div>
        </div>
        ${Forms.renderThirdPartyReliance()}
      </div>
    `;
  },

  renderCDDOutcome() {
    return `
      <div class="space-y-4">
        <div class="austrac-callout text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service" target="_blank" rel="noopener" class="underline text-blue-600">CDD Before Providing a Designated Service</a>
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
                  ['Customer refuses to provide ID', 'Decline to act. Consider filing an SMR if refusal is suspicious.'],
                  ['Customer provides inconsistent or fraudulent documents', 'Do not proceed. Escalate internally. File an SMR.'],
                  ['Beneficial owner cannot be identified', 'Do not proceed until identified. Apply EDD.'],
                  ['Customer is on DFAT sanctions list', 'Do NOT proceed under any circumstances. Seek legal advice.'],
                  ['CDD reveals a PEP', 'Do not automatically decline — apply EDD and obtain senior manager approval.'],
                  ['High-risk jurisdiction connection', 'Apply EDD. May proceed if risk adequately mitigated and documented.'],
                  ['Source of funds cannot be verified', 'Consider declining. If proceeding, apply EDD and document rationale. File SMR if suspicious.'],
                ].map(([s, a]) => `<tr><td class="py-2 pr-3 text-slate-600">${s}</td><td class="py-2 text-slate-600">${a}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ${Forms.renderCDDOutcome()}
      </div>
    `;
  },

  // ─── RED FLAGS ────────────────────────────────────────────────────────────
  renderRedFlags() {
    const el = document.getElementById('section-red-flags');
    const categories = [
      { id: 'all', label: 'All Red Flags' },
      { id: 'customerBehaviour', label: 'Customer Behaviour' },
      { id: 'customerProfile', label: 'Customer Profile' },
      { id: 'serviceTransactionRisk', label: 'Service/Transaction' },
      { id: 'deliveryChannelRisk', label: 'Delivery Channel' },
      { id: 'foreignJurisdictionRisk', label: 'Jurisdiction Risk' },
    ];
    const categoryLabels = {
      customerBehaviour: 'Customer Behaviour',
      customerProfile: 'Customer Profile',
      serviceTransactionRisk: 'Service/Transaction Risk',
      deliveryChannelRisk: 'Delivery Channel Risk',
      foreignJurisdictionRisk: 'Foreign Jurisdiction Risk',
    };
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Red Flags & Suspicious Activity Indicators', 'Recognise the warning signs of money laundering in precious goods transactions — aligned to AUSTRAC\'s 5 risk categories.', '🚩')}

        <div class="tipping-off-warning mb-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-red-600 font-bold text-lg">🚫 TIPPING-OFF PROHIBITION</span>
          </div>
          <p class="text-sm text-red-800"><strong>If you identify a red flag, DO NOT tell the customer about your concerns.</strong> Disclosing that you have filed or intend to file a Suspicious Matter Report (SMR) is a criminal offence known as "tipping off." Document, escalate, and report — in silence.</p>
        </div>

        <!-- Action Guidance -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
          <div class="font-semibold text-slate-700 mb-2 text-sm">What to do when you spot a red flag:</div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${[['1. STOP', 'Do not tip off the customer'], ['2. DOCUMENT', 'Record your observations in writing'], ['3. ESCALATE', 'Report to your AML/CTF compliance officer'], ['4. ASSESS', 'Compliance officer decides on SMR'], ['5. REPORT', 'File SMR within required timeframe'], ['6. MONITOR', 'Continue monitoring the relationship']].map(([step, desc]) => `
              <div class="bg-white rounded-lg border border-slate-200 p-2 text-center">
                <div class="font-bold text-blue-600 text-xs">${step}</div>
                <div class="text-xs text-slate-500 mt-0.5">${desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${categories.map(c => `
            <button onclick="App.filterRedFlags('${c.id}')"
              class="rf-filter px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${c.id === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}"
              data-category="${c.id}">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Search -->
        <input type="text" id="rf-search" placeholder="Search red flags..." onkeyup="App.searchRedFlags()"
          class="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400">

        <!-- Cards -->
        <div id="red-flags-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${AMLiqData.redFlags.map(rf => `
            <div class="rf-card red-flag-card ${rf.severity === 'red' ? 'severity-red' : ''} bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-sm transition-shadow"
              data-category="${rf.category}" onclick="App.toggleRedFlagDetail('${rf.id}')">
              <div class="flex items-start justify-between gap-2 mb-1">
                <div class="font-semibold text-sm text-slate-800">${rf.title}</div>
                <span class="tag flex-shrink-0 ${rf.severity === 'red' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}">${rf.severity === 'red' ? 'Escalate' : 'Alert'}</span>
              </div>
              <div id="rf-detail-${rf.id}" class="text-sm text-slate-600 hidden mt-2 pt-2 border-t border-slate-100">
                ${rf.detail}
                <button onclick="event.stopPropagation(); App.navigateTo('reporting')"
                  class="mt-2 text-xs text-blue-600 hover:underline block">View Reporting Guide →</button>
              </div>
              <div class="text-xs text-slate-400 mt-1">${categoryLabels[rf.category] || rf.category}</div>
            </div>
          `).join('')}
        </div>

        <!-- Suspicious Activity Log Form -->
        <div class="mt-6">
          <h3 class="font-bold text-slate-800 mb-3">Log a Suspicious Activity</h3>
          <p class="text-sm text-slate-500 mb-3">Use this form to record suspicious observations internally before deciding whether to escalate or file an SMR.</p>
          ${Forms.renderSuspiciousActivityLog()}
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
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Reporting to AUSTRAC', 'When and how to file Suspicious Matter Reports (SMRs), Threshold Transaction Reports (TTRs), and Annual Compliance Reports.', '📤')}

        <div class="tipping-off-warning mb-5">
          <div class="flex items-center gap-2 mb-2"><span class="text-red-600 font-bold">🚫 TIPPING-OFF PROHIBITION — APPLIES TO ALL REPORTING</span></div>
          <p class="text-sm text-red-800">You MUST NOT tell the customer, or any other person who doesn't need to know, that you have filed or intend to file an SMR, or that you have any suspicion about them. <strong>This is a criminal offence.</strong></p>
        </div>

        <div class="flex gap-2 mb-5 border-b border-slate-200 flex-wrap">
          ${['SMRs', 'TTRs', 'Annual Report', 'Escalation Guide'].map((tab, i) => `
            <button onclick="App.switchTab('rep-tab', ${i})"
              class="rep-tab pb-2 px-2 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${tab}
            </button>
          `).join('')}
        </div>
        <div id="rep-tab-0">${this.renderSMRGuide()}</div>
        <div id="rep-tab-1" class="hidden">${this.renderTTRGuide()}</div>
        <div id="rep-tab-2" class="hidden">${this.renderAnnualComplianceReport()}</div>
        <div id="rep-tab-3" class="hidden">${this.renderEscalationGuide()}</div>

        ${Checklist.renderSection('reporting', 'Reporting Procedures Checklist')}
      </div>
    `;
    Checklist.updateProgress();
  },

  renderSMRGuide() {
    return `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">When Must You File an SMR?</h3>
          <p class="text-sm text-slate-600 mb-3">You must submit an SMR if you suspect, on <strong>reasonable grounds</strong>, that:</p>
          <ul class="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>A person is committing or planning money laundering or terrorism financing</li>
            <li>A customer is not who they claim to be</li>
            <li>You have information relevant to the investigation of an offence</li>
          </ul>
          <div class="austrac-callout mt-4 text-sm">
            <strong class="text-blue-800">Key rules:</strong> Submit a <strong>separate SMR each time</strong> you form a new suspicion. SMR obligations apply even if you decide not to provide the service. Even if you divert the customer to a non-cash payment method, you must still file an SMR if you hold a suspicion.
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
          <h3 class="font-bold text-slate-800 mb-3">What to Include in an SMR</h3>
          <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Customer details (as known)</li>
            <li>Description of the suspicious activity</li>
            <li>Your grounds for suspicion (what triggered it)</li>
            <li>Relevant transaction details</li>
            <li>Any supporting documents</li>
            <li>References to previous SMRs on the same person (if any)</li>
          </ul>
          <div class="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-200">
            <strong>How to file:</strong> Via <a href="https://online.austrac.gov.au" target="_blank" class="underline text-blue-600">AUSTRAC Online</a>. File a <strong>separate SMR</strong> each time you form a new suspicion about a customer.
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Jeweller Example (from AUSTRAC)</h3>
          <div class="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3 italic">
            A customer wants to buy $50,000 worth of loose diamonds in cash. Their low income doesn't support the purchase, and they can't provide evidence of dividend income. The compliance officer files an SMR. The senior manager rejects the transaction as it falls outside the business's risk appetite, telling the customer the cash amount exceeds accepted limits.
          </div>
        </div>

        <!-- SMR Decision Tool -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Should I File an SMR? — Quick Decision</h3>
          <div id="smr-decision" class="space-y-3">
            <p class="text-sm text-slate-600">Answer these questions to help assess whether an SMR may be warranted:</p>
            ${[
              'Do I have a genuine suspicion (not just a concern) about this customer or transaction?',
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
            <strong>Structuring is a criminal offence.</strong> If a customer breaks cash payments into amounts just under $10,000 to avoid the TTR threshold, this is called "structuring" and is itself a criminal offence. This should <em>also</em> trigger an SMR.
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Jeweller Example</h3>
          <div class="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3 italic">
            A customer pays $12,000 in cash for a custom gold necklace. The jeweller must file a TTR within 10 business days. If the customer later pays for a separate $5,000 watch by bank transfer, no TTR is required for that payment.
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

  renderAnnualComplianceReport() {
    return `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">Annual Compliance Report</h3>
          <p class="text-sm text-slate-600 mb-3">An annual compliance report must be submitted to AUSTRAC about how you met your obligations during the previous calendar year.</p>
          <div class="austrac-callout text-sm">
            <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/step-2-use-your-jeweller-program" target="_blank" rel="noopener" class="underline text-blue-600">Step 2: Use Your Jeweller Program</a>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-3">What to Cover</h3>
          <ul class="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>Summary of ML/TF/PF risks identified during the year</li>
            <li>Number and types of reports filed (SMRs, TTRs)</li>
            <li>Training conducted and staff assessed</li>
            <li>Program reviews conducted and changes made</li>
            <li>Any incidents, breaches, or near-misses</li>
            <li>Status of independent evaluation (if due)</li>
          </ul>
        </div>
        ${Forms.renderProgramReviewForm()}
      </div>
    `;
  },

  renderEscalationGuide() {
    return `
      <div class="space-y-4">
        <h3 class="font-bold text-slate-800">Internal Escalation Process</h3>
        <div class="space-y-3">
          ${[
            { step: 1, who: 'Sales Staff', action: 'Identifies a red flag or suspicious behaviour', detail: 'Document your observation immediately. Note the date, time, customer details, what you observed, and why it concerned you.', color: 'blue' },
            { step: 2, who: 'Sales Staff', action: 'Stop — do not tip off the customer', detail: 'Continue behaving normally with the customer. Do not indicate your concern. Do not ask probing questions that might alert them.', color: 'red' },
            { step: 3, who: 'Sales Staff', action: 'Escalate to AML/CTF Compliance Officer', detail: 'Report your observations to the designated compliance officer or store owner/manager. Submit your written documentation.', color: 'amber' },
            { step: 4, who: 'Compliance Officer', action: 'Assess the suspicion', detail: 'The compliance officer reviews the information, assesses the risk level, and decides whether grounds exist to file an SMR.', color: 'purple' },
            { step: 5, who: 'Compliance Officer', action: 'File SMR if warranted', detail: 'If reasonable grounds for suspicion exist, file an SMR via AUSTRAC Online within the required timeframe (24 hours for terrorism; 3 business days otherwise).', color: 'green' },
            { step: 6, who: 'Compliance Officer', action: 'Document the decision', detail: 'Whether or not an SMR is filed, document the decision and reasons. This is your SMR Decision Record.', color: 'slate' },
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
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Payment Diversion Warning:</strong> If you suspect criminal activity, do NOT simply redirect the customer to pay by bank transfer. This could make you complicit in money laundering. You must still file an SMR if you hold a suspicion, regardless of the payment method used.
        </div>
      </div>
    `;
  },

  // ─── RECORD KEEPING ───────────────────────────────────────────────────────
  renderRecordKeeping() {
    const el = document.getElementById('section-record-keeping');
    const recordTypes = [
      { cat: 'Customer ID records', examples: 'CDD forms, copies of ID documents, beneficial owner records, PEP/TFS screening results' },
      { cat: 'Transaction records', examples: 'Sales receipts, invoices, payment records, transaction detection records, linked transaction records' },
      { cat: 'AML/CTF program documentation', examples: 'Risk assessment, policy document, process document, governance records' },
      { cat: 'Reporting records', examples: 'Internal copies of SMRs, TTRs filed; internal escalation records' },
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

        ${Checklist.renderSection('recordKeeping', 'Record Keeping Checklist')}

        <!-- Import/Export Documentation Tracker -->
        <div class="mt-6">
          <h3 class="font-bold text-slate-800 mb-2">Import/Export Documentation</h3>
          <p class="text-sm text-slate-500 mb-3">Track customs and origin documentation for international precious goods shipments.</p>
          ${Forms.renderImportExportTracker()}
        </div>
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── TRAINING ─────────────────────────────────────────────────────────────
  renderTraining() {
    const el = document.getElementById('section-training');
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Staff Training & Awareness', 'Plan, deliver, and track AML/CTF training for your team.', '🎓')}

        <div class="flex gap-2 mb-5 border-b border-slate-200">
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

        ${Checklist.renderSection('training', 'Training Checklist')}
      </div>
    `;
    Checklist.updateProgress();
  },

  renderTrainingModules() {
    const modules = [
      { n: 1, title: 'ML/TF/PF Overview', content: 'What is money laundering, terrorism financing, and proliferation financing? Why are precious goods a target?', audience: 'All staff' },
      { n: 2, title: 'Legal Obligations', content: 'Overview of AML/CTF Act obligations for precious goods dealers under the Tranche 2 reforms.', audience: 'All staff' },
      { n: 3, title: 'Your AML/CTF Program', content: "Walk through your business's specific program — risk assessment, policies, and processes.", audience: 'All staff' },
      { n: 4, title: 'Transaction Detection', content: 'How to identify regulated transactions ($10,000+ in cash/virtual assets), linked transactions, and structuring.', audience: 'All sales staff' },
      { n: 5, title: 'Customer Due Diligence', content: 'How to perform CDD, verify ID, use onboarding forms for individuals, companies, trusts, and partnerships.', audience: 'Sales staff, managers' },
      { n: 6, title: 'Streamlined CDD Process', content: 'When and how to use the simplified process for low/medium risk individual customers (Option 3).', audience: 'Store owners/managers' },
      { n: 7, title: 'PEP & Sanctions Screening', content: 'What PEPs and TFS are. How to screen customers. Foreign PEPs always high-risk.', audience: 'Sales staff, compliance officer' },
      { n: 8, title: 'Red Flags & Suspicious Activity', content: "AUSTRAC's precious goods red flag indicators across all 5 categories. How to recognise suspicious behaviour.", audience: 'All staff' },
      { n: 9, title: 'Reporting Obligations', content: 'When and how to file SMRs and TTRs. Internal escalation process. Filing timeframes.', audience: 'All staff' },
      { n: 10, title: 'Tipping-Off Prohibition', content: 'What you must not disclose. Penalties for tipping off. What you CAN do when you have concerns.', audience: 'All staff' },
      { n: 11, title: 'Record Keeping', content: 'What to keep, how to store it, for how long. Privacy obligations.', audience: 'Admin staff, compliance officer' },
      { n: 12, title: 'Payment Diversion Warning', content: 'Why redirecting a suspicious customer to bank transfer does NOT resolve your reporting obligations.', audience: 'All staff' },
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
        <div id="rev-tab-1" class="hidden">${Forms.renderProgramReviewForm()}</div>
        <div id="rev-tab-2" class="hidden">${Forms.renderChangeLog()}</div>
      </div>
    `;
  },

  renderReviewTriggers() {
    const triggers = [
      { trigger: 'Scheduled periodic review', example: 'Reviews every 6 or 12 months' },
      { trigger: 'Changes to designated services', example: 'You start accepting virtual assets, or change cash acceptance policies' },
      { trigger: 'Changes to customer types', example: 'You begin dealing with entities, foreign customers, scrap dealers' },
      { trigger: 'Changes to countries', example: 'New high-risk jurisdiction customers' },
      { trigger: 'Internal incidents or control failures', example: 'A regulated transaction was missed; suspicious activity was not escalated' },
      { trigger: 'Regulatory or legislative updates', example: 'AUSTRAC issues new guidance or Rules change' },
      { trigger: 'New or emerging ML/TF/PF risks', example: 'New typologies identified by AUSTRAC' },
      { trigger: 'AUSTRAC communications', example: 'National risk assessment, sector alert, direct feedback' },
      { trigger: 'Adverse independent evaluation findings', example: 'Evaluator identifies gaps' },
      { trigger: 'Significant business changes', example: 'Staff changes, new locations, new product lines, online sales' },
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
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Independent Evaluation Planning', 'Plan for the required independent evaluation of your AML/CTF program.', '🔎')}

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
          <div class="font-semibold text-blue-800 mb-1">AUSTRAC Requirement</div>
          <p class="text-sm text-blue-700">An independent evaluation must be conducted at least once every <strong>3 years</strong>. The evaluator must be independent of the program (not the compliance officer or anyone who designed the program).</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          ${[
            { who: 'External compliance consultant', ok: true },
            { who: 'Internal audit function (if independent of AML/CTF program)', ok: true },
            { who: 'Industry association compliance review service', ok: true },
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

        ${Checklist.renderSection('evaluation', 'Evaluation Checklist')}

        ${Forms.renderEvaluationPlan()}
      </div>
    `;
    Checklist.updateProgress();
  },

  // ─── FORMS LIBRARY ────────────────────────────────────────────────────────
  renderFormsLibrary() {
    const el = document.getElementById('section-forms-library');
    const forms = [
      { n: 1, name: 'CDD — Individual', section: 'cdd', tab: 0 },
      { n: 2, name: 'CDD — Company', section: 'cdd', tab: 1 },
      { n: 3, name: 'CDD — Trust', section: 'cdd', tab: 2 },
      { n: 4, name: 'CDD — Partnership', section: 'cdd', tab: 3 },
      { n: 5, name: 'CDD — Foreign Customer', section: 'cdd', tab: 4 },
      { n: 6, name: 'Enhanced Due Diligence Record', section: 'cdd', tab: 5 },
      { n: 7, name: 'Ongoing CDD Review', section: 'cdd', tab: 6 },
      { n: 8, name: 'PEP/TFS Screening Record', section: 'cdd', tab: 7 },
      { n: 9, name: 'Delayed CDD Record', section: 'cdd', tab: 8 },
      { n: 10, name: 'Third-Party Reliance Record', section: 'cdd', tab: 9 },
      { n: 11, name: 'CDD Outcome Record', section: 'cdd', tab: 10 },
      { n: 12, name: 'Compliance Officer Appointment', section: 'governance', tab: 0 },
      { n: 13, name: 'AML/CTF Roles Assignment', section: 'governance', tab: 1 },
      { n: 14, name: 'Personnel Due Diligence Record', section: 'governance', tab: 2 },
      { n: 15, name: 'Training Plan', section: 'training', tab: 0 },
      { n: 16, name: 'Training Attendance Record', section: 'training', tab: 2 },
      { n: 17, name: 'Program Review Record', section: 'program-review', tab: 1 },
      { n: 18, name: 'Change Log', section: 'program-review', tab: 2 },
      { n: 19, name: 'Independent Evaluation Plan', section: 'evaluation', tab: 0 },
      { n: 20, name: 'Suspicious Activity Log', section: 'red-flags', tab: 0 },
      { n: 21, name: 'SMR Decision Record', section: 'reporting', tab: 0 },
      { n: 22, name: 'Enrolment Checklist', section: 'enrolment', tab: 0 },
      { n: 23, name: 'Risk Assessment Summary', section: 'risk-assessment', tab: 0 },
      { n: 24, name: 'Transaction Detection Record', section: 'program-builder', tab: 0 },
      { n: 25, name: 'Regulation Option Assessment', section: 'am-i-regulated', tab: 0 },
      { n: 26, name: 'Precious Goods Valuation Record', section: 'program-builder', tab: 0 },
      { n: 27, name: 'Import/Export Documentation Tracker', section: 'record-keeping', tab: 0 },
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
    const kitForms = [
      { austrac: 'Onboarding form — Individual or sole trader', purpose: 'Collect initial customer information', amliq: 'CDD — Individual (#1)' },
      { austrac: 'Onboarding form — Entity', purpose: 'Collect initial information for entity customers', amliq: 'CDD — Company/Trust/Partnership (#2–#4)' },
      { austrac: 'Initial CDD form — Individual or sole trader', purpose: 'Verify identity, assess risk, complete CDD checks', amliq: 'CDD — Individual (#1)' },
      { austrac: 'Initial CDD form — Entity', purpose: 'Verify entity identity, beneficial owners', amliq: 'CDD — Company/Trust/Partnership (#2–#4)' },
      { austrac: 'Escalation form', purpose: 'Document escalation to compliance officer', amliq: 'Suspicious Activity Log (#20)' },
      { austrac: 'Enhanced CDD form', purpose: 'Document enhanced due diligence measures', amliq: 'Enhanced Due Diligence Record (#6)' },
      { austrac: 'Sanctions check process', purpose: 'Step-by-step sanctions screening', amliq: 'PEP/TFS Screening Record (#8)' },
      { austrac: 'PEP check process', purpose: 'Step-by-step PEP screening', amliq: 'PEP/TFS Screening Record (#8)' },
      { austrac: 'Source of funds/wealth check process', purpose: 'Verify fund origins', amliq: 'Part of EDD Record (#6)' },
      { austrac: 'Adverse media check process', purpose: 'Open-source background checks', amliq: 'Part of EDD Record (#6)' },
      { austrac: 'Periodic review and update form', purpose: 'Ongoing CDD review', amliq: 'Ongoing CDD Review (#7)' },
      { austrac: 'Escalation checklist', purpose: 'Quick-reference escalation triggers', amliq: 'Part of Suspicious Activity Log (#20)' },
      { austrac: 'Streamlined CDD for low/medium risk individuals', purpose: 'Simplified CDD for Option 3 jewellers', amliq: 'CDD — Individual Streamlined (#1)' },
      { austrac: 'Determine if a transaction is regulated', purpose: 'Assess if $10K threshold is met', amliq: 'Transaction Detection Record (#24)' },
      { austrac: 'Personnel due diligence forms', purpose: 'Staff suitability assessment', amliq: 'Personnel Due Diligence Record (#14)' },
    ];

    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('AUSTRAC Starter Kit Forms Reference', 'Maps official AUSTRAC Jeweller Program Starter Kit form names to T2C interactive templates.', '📋')}

        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/reforms/program-starter-kits/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-document-library" target="_blank" rel="noopener" class="underline text-blue-600">Jeweller Program Starter Kit Document Library</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="bg-slate-50 text-left">
              <th class="px-3 py-2 font-semibold text-slate-600">AUSTRAC Official Form</th>
              <th class="px-3 py-2 font-semibold text-slate-600">Purpose</th>
              <th class="px-3 py-2 font-semibold text-slate-600">T2C Equivalent</th>
            </tr></thead>
            <tbody>
              ${kitForms.map((f, i) => `
                <tr class="${i % 2 === 1 ? 'bg-slate-50' : ''}">
                  <td class="px-3 py-2 font-medium text-slate-700">${f.austrac}</td>
                  <td class="px-3 py-2 text-slate-600">${f.purpose}</td>
                  <td class="px-3 py-2 text-blue-600">${f.amliq}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-4 text-xs text-slate-400">T2C templates combine and extend AUSTRAC's official forms into interactive, saveable formats. Always refer to the official Starter Kit for authoritative templates.</div>
      </div>
    `;
  },

  renderCustomerExamples() {
    const el = document.getElementById('section-customer-examples');
    const examples = AMLiqData.customerExamples;
    const riskColors = { LOW: 'green', MEDIUM: 'amber', HIGH: 'red' };
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('Real-World Customer Examples', 'AUSTRAC worked examples showing what compliance looks like at each risk level.', '👥')}

        <div class="austrac-callout mb-5 text-sm">
          <strong class="text-blue-800">📎 AUSTRAC Source:</strong> <a href="https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-examples-dealing-customers" target="_blank" rel="noopener" class="underline text-blue-600">Jeweller Program Starter Kit: Examples of Dealing with Customers</a>
        </div>

        <div class="flex gap-2 mb-5 border-b border-slate-200">
          ${examples.map((ex, i) => `
            <button onclick="App.switchTab('cex-tab', ${i})"
              class="cex-tab pb-2 px-2 text-sm font-medium ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}" data-tab="${i}">
              ${ex.riskLevel} Risk
            </button>
          `).join('')}
        </div>

        ${examples.map((ex, i) => {
          const color = riskColors[ex.riskLevel] || 'slate';
          return `
            <div id="cex-tab-${i}" class="${i > 0 ? 'hidden' : ''}">
              <div class="bg-${color}-50 border border-${color}-200 rounded-xl p-4 mb-5">
                <div class="flex items-center gap-2 mb-2">
                  <span class="tag bg-${color}-100 text-${color}-700">${ex.riskLevel} RISK</span>
                  <span class="font-bold text-${color}-800">${ex.title}</span>
                </div>
                <p class="text-sm text-${color}-800">${ex.scenario}</p>
              </div>

              <div class="space-y-3 mb-5">
                ${ex.steps.map(s => `
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-${color}-100 text-${color}-700 flex items-center justify-center font-bold text-sm flex-shrink-0">${s.step}</div>
                    <div class="bg-white rounded-xl border border-slate-200 p-4 flex-1">
                      <div class="font-semibold text-slate-800 mb-1">${s.action}</div>
                      <div class="text-sm text-slate-600">${s.detail}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="bg-white rounded-xl border border-slate-200 p-5 mb-4">
                <h3 class="font-bold text-slate-800 mb-3">Key Points</h3>
                <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  ${ex.keyPoints.map(k => `<li>${k}</li>`).join('')}
                </ul>
              </div>

              <div class="text-xs text-slate-400 italic">Source: ${ex.austracSource}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // ─── GLOSSARY ─────────────────────────────────────────────────────────────
  renderGlossary() {
    const el = document.getElementById('section-glossary');
    const sorted = [...AMLiqData.glossary].sort((a, b) => a.term.localeCompare(b.term));
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Jargon Buster', 'Plain-English definitions of every AML/CTF term used in this tool and AUSTRAC guidance.', '📖')}
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
    el.innerHTML = `
      <div class="p-6 max-w-3xl mx-auto">
        ${this.pageHeader('Frequently Asked Questions', 'Common questions about AML/CTF obligations for jewellers and precious goods dealers, answered in plain English.', '❓')}
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
    el.innerHTML = `
      <div class="p-6 max-w-4xl mx-auto">
        ${this.pageHeader('AUSTRAC Links & Source Documents', 'Official AUSTRAC resources that form the basis of this tool.', '🔗')}
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Important:</strong> Always refer directly to AUSTRAC's official publications for the most current and authoritative guidance. This tool is based on materials as of February 2026 and should be used alongside, not instead of, the official AUSTRAC Jeweller Program Starter Kit.
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
};
