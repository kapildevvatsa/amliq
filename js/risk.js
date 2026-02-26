// T2C — Risk Assessment Wizard

const RiskWizard = {

  STORAGE_KEY: 'riskAssessment',

  categories: ['customer', 'service', 'delivery', 'geographic'],
  categoryNames: { customer: 'Customer Risk', service: 'Service/Product Risk', delivery: 'Delivery Channel Risk', geographic: 'Geographic/Jurisdiction Risk' },
  categoryIcons: { customer: '👤', service: '🏘️', delivery: '📱', geographic: '🌏' },

  answers: {},
  currentCat: 0,

  loadAnswers() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) this.answers = JSON.parse(saved);
    } catch (e) { this.answers = {}; }
  },

  saveAnswers() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.answers));
  },

  renderStart() {
    this.loadAnswers();
    const hasAnswers = Object.keys(this.answers).length > 0;
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-3">How the Risk Assessment Works</h3>
        <p class="text-sm text-slate-600 mb-4">Answer yes/no questions across four risk categories to understand your ML/TF/PF risk profile. Your results are saved in your browser.</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          ${this.categories.map((cat, i) => `
            <div class="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div class="text-2xl">${this.categoryIcons[cat]}</div>
              <div class="text-xs font-semibold text-slate-600 mt-1">${this.categoryNames[cat]}</div>
            </div>
          `).join('')}
        </div>
        <div class="flex gap-3">
          <button onclick="RiskWizard.startWizard()" class="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 text-sm">
            ${hasAnswers ? 'Retake Assessment' : 'Start Assessment'}
          </button>
          ${hasAnswers ? `<button onclick="RiskWizard.showResults()" class="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-200 text-sm">View Previous Results</button>` : ''}
        </div>
      </div>
    `;
  },

  startWizard() {
    this.answers = {};
    this.currentCat = 0;
    this.renderCategory(0);
  },

  renderCategory(catIndex) {
    const cat = this.categories[catIndex];
    const questions = AMLiqData.riskQuestions[cat];
    const container = document.getElementById('risk-wizard-container');

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Step Indicator -->
        <div class="step-indicator">
          ${this.categories.map((c, i) => `
            <div class="step-dot ${i < catIndex ? 'done' : i === catIndex ? 'active' : ''}">${i + 1}</div>
            ${i < this.categories.length - 1 ? `<div class="step-line ${i < catIndex ? 'done' : ''}"></div>` : ''}
          `).join('')}
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">${this.categoryIcons[cat]}</span>
            <div>
              <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Step ${catIndex + 1} of 4</div>
              <h3 class="font-bold text-slate-800">${this.categoryNames[cat]}</h3>
            </div>
          </div>

          <div class="space-y-3 mb-5">
            ${questions.map(q => `
              <div class="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <p class="text-sm font-medium text-slate-700 mb-2">${q.text}</p>
                <div class="flex gap-2">
                  <button onclick="RiskWizard.setAnswer('${q.id}', 'yes')"
                    class="risk-answer flex-1 py-1.5 rounded text-sm font-semibold border transition-all ${this.getAnswerClass(q.id, 'yes')}"
                    data-q="${q.id}" data-v="yes">YES</button>
                  <button onclick="RiskWizard.setAnswer('${q.id}', 'no')"
                    class="risk-answer flex-1 py-1.5 rounded text-sm font-semibold border transition-all ${this.getAnswerClass(q.id, 'no')}"
                    data-q="${q.id}" data-v="no">NO</button>
                </div>
                <div class="text-xs text-slate-400 mt-1">${q.risk === 'high' ? '⚠️ Higher risk if YES' : '⚡ Medium risk if YES'}: ${q.reason}</div>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-between items-center">
            <button onclick="RiskWizard.prevCategory()" ${catIndex === 0 ? 'disabled' : ''}
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 disabled:opacity-30">← Back</button>
            <button onclick="RiskWizard.nextCategory(${catIndex})"
              class="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
              ${catIndex < 3 ? 'Next →' : 'View Results'}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  getAnswerClass(qId, val) {
    const current = this.answers[qId];
    if (!current) return 'bg-white text-slate-600 border-slate-200 hover:border-blue-300';
    if (current === val) {
      return val === 'yes'
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-slate-600 text-white border-slate-600';
    }
    return 'bg-white text-slate-400 border-slate-200';
  },

  setAnswer(qId, val) {
    this.answers[qId] = val;
    this.saveAnswers();
    // Update button styles
    document.querySelectorAll(`[data-q="${qId}"]`).forEach(btn => {
      const bVal = btn.dataset.v;
      if (bVal === val) {
        btn.className = btn.className.replace(/bg-\w+-\d+ text-\w+ border-\w+-\d+/, '');
        btn.className += (val === 'yes' ? ' bg-blue-600 text-white border-blue-600' : ' bg-slate-600 text-white border-slate-600');
      } else {
        btn.className = btn.className.replace(/bg-\w+-\d+ text-\w+ border-\w+-\d+/, ' bg-white text-slate-400 border-slate-200');
      }
    });
  },

  nextCategory(catIndex) {
    if (catIndex < 3) {
      this.currentCat = catIndex + 1;
      this.renderCategory(catIndex + 1);
    } else {
      this.showResults();
    }
  },

  prevCategory() {
    if (this.currentCat > 0) {
      this.currentCat--;
      this.renderCategory(this.currentCat);
    }
  },

  calculateRisk() {
    const results = {};
    this.categories.forEach(cat => {
      const questions = AMLiqData.riskQuestions[cat];
      let highCount = 0;
      let mediumCount = 0;
      questions.forEach(q => {
        if (this.answers[q.id] === 'yes') {
          if (q.risk === 'high') highCount++;
          else mediumCount++;
        }
      });
      // AUSTRAC deterministic model:
      // High = at least 1 high risk factor present
      // Medium = at least 2 medium risk factors (no high)
      // Low = neither high nor medium criteria met
      let level = 'low';
      if (highCount >= 1) level = 'high';
      else if (mediumCount >= 2) level = 'medium';
      const total = questions.length;
      const yesCount = highCount + mediumCount;
      const pct = total > 0 ? yesCount / total : 0;
      results[cat] = { highCount, mediumCount, total, pct, level };
    });
    return results;
  },

  riskLabel: { low: 'Low', medium: 'Medium', high: 'High' },
  riskColor: {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  },
  riskBarColor: { low: 'bg-green-400', medium: 'bg-yellow-400', high: 'bg-red-500' },

  showResults() {
    const results = this.calculateRisk();
    const container = document.getElementById('risk-wizard-container');

    // Generate tailored recommendations
    const recs = this.generateRecommendations(results);

    // Overall level = highest category level (conservative, per AUSTRAC intent)
    const levelOrder = { low: 0, medium: 1, high: 2 };
    const maxLevel = Math.max(...this.categories.map(c => levelOrder[results[c].level]));
    const overallLevel = ['low', 'medium', 'high'][maxLevel];

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Overall Rating -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <div class="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Overall ML/TF/PF Risk Profile</div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl font-black ${this.riskColor[overallLevel].replace('100', '600').replace('800', '50')} px-4 py-2 rounded-xl">${this.riskLabel[overallLevel]}</span>
            <div class="text-sm text-slate-600">Your overall risk profile is <strong>${this.riskLabel[overallLevel]}</strong>. This is based on your responses across all four risk categories.</div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${this.categories.map(cat => {
              const r = results[cat];
              return `
                <div class="text-center">
                  <div class="text-xl mb-1">${this.categoryIcons[cat]}</div>
                  <div class="text-xs text-slate-500 font-medium mb-2">${this.categoryNames[cat]}</div>
                  <div class="w-full bg-slate-100 rounded-full h-2 mb-1">
                    <div class="${this.riskBarColor[r.level]} h-2 rounded-full" style="width:${Math.round(r.pct*100)}%"></div>
                  </div>
                  <span class="tag ${this.riskColor[r.level]} text-xs">${this.riskLabel[r.level]}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Recommendations -->
        ${recs.length > 0 ? `
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-bold text-slate-800 mb-3">Tailored Action Items</h3>
            <div class="space-y-2">
              ${recs.map(r => `
                <div class="flex items-start gap-3 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <span class="text-amber-600 flex-shrink-0">→</span>
                  <div><strong>${r.trigger}:</strong> ${r.action}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- AUSTRAC Callout -->
        <div class="austrac-callout">
          <strong class="text-blue-800">AUSTRAC says:</strong> <span class="text-sm text-slate-700">${this.getSectorCallout()}</span>
        </div>

        <!-- Scoring Model Explanation -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
          <strong class="text-slate-800">How risk ratings are calculated (AUSTRAC model):</strong>
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li><strong>High</strong> — at least 1 high-risk factor is present</li>
            <li><strong>Medium</strong> — at least 2 medium-risk factors are present (and no high-risk factors)</li>
            <li><strong>Low</strong> — neither high nor medium criteria are met</li>
          </ul>
          <p class="mt-2 text-xs text-slate-500">Your overall rating is the highest rating across all four categories. Source: AUSTRAC ${this.getSectorStarterKitName()} — Risk Assessment.</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 flex-wrap">
          <button onclick="RiskWizard.startWizard()" class="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300">Retake Assessment</button>
          <button onclick="RiskWizard.printResults()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save / Print Results</button>
          <button onclick="App.navigateTo('program-builder')" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Build Your Program →</button>
        </div>
      </div>
    `;
  },

  getSectorPage() {
    const path = window.location.pathname.split('/').pop() || '';
    if (path.includes('jewellers')) return 'jewellers';
    if (path.includes('accountants')) return 'accountants';
    return 'real-estate';
  },

  getSectorCallout() {
    const sector = this.getSectorPage();
    if (sector === 'jewellers') return 'The precious goods sector is rated as HIGH risk for money laundering and LOW for terrorism financing nationally. Your individual risk profile helps determine what controls are most important for your business. Even lower-risk businesses must maintain a full AML/CTF program.';
    if (sector === 'accountants') return 'The accounting/tax agent sector faces significant ML risks through professional services that can create, manage, and move funds. Your individual risk profile helps determine what controls are most important for your practice. Even lower-risk practices must maintain a full AML/CTF program.';
    return 'The real estate sector is rated as HIGH risk for money laundering nationally. Your individual risk profile helps determine what controls are most important for your business. Even lower-risk agencies must maintain a full AML/CTF program.';
  },

  getSectorStarterKitName() {
    const sector = this.getSectorPage();
    if (sector === 'jewellers') return 'Jeweller Program Starter Kit';
    if (sector === 'accountants') return 'Accounting/Tax Agent Program Starter Kit';
    return 'Real Estate Program Starter Kit';
  },

  generateRecommendations(results) {
    const recs = [];
    const yes = id => this.answers[id] === 'yes';
    const sector = this.getSectorPage();

    // Common recommendations (question IDs shared across all sectors)
    if (yes('rc2')) recs.push({ trigger: 'Foreign customers', action: 'Apply Enhanced Due Diligence (EDD) for customers with links to foreign jurisdictions. Verify source of funds and check FATF risk lists.' });
    if (yes('rc3')) recs.push({ trigger: 'Complex structures (trusts/companies)', action: 'Ensure you identify all beneficial owners — including settlors, appointors, and protectors of trusts. Use the Trust CDD form.' });
    if (yes('rc4')) recs.push({ trigger: 'PEPs', action: 'Implement a documented PEP screening procedure. Apply EDD to all PEPs and their associates.' });
    if (yes('rc1')) recs.push({ trigger: 'Non-face-to-face customers', action: 'Implement additional identity verification controls for online and remote transactions.' });
    if (yes('rd2')) recs.push({ trigger: 'Third-party referrals', action: 'Establish documented reliance arrangements with any third parties you rely on for CDD. Remember: you remain responsible.' });
    if (yes('rg1')) recs.push({ trigger: 'FATF high-risk jurisdictions', action: 'Apply EDD for any customer or funds from FATF grey/blacklisted countries. Check the FATF list regularly.' });
    if (yes('rg2')) recs.push({ trigger: 'International fund flows', action: 'Verify the source of overseas funds. Consider whether a Cross-Border Movement (CBM) report may be required if you accept or receive physical currency or bearer negotiable instruments from overseas valued at $10,000 or more.' });

    // Sector-specific recommendations
    if (sector === 'real-estate') {
      if (yes('rs5')) recs.push({ trigger: 'High-value property ($5M+)', action: 'Apply enhanced scrutiny to large transactions. Verify source of funds thoroughly and document your rationale.' });
      if (yes('rs3')) recs.push({ trigger: 'Off-the-plan sales', action: 'Consider the time gap between contract and settlement as a layering risk. Conduct CDD at contract stage and consider re-verification at settlement.' });
    } else if (sector === 'jewellers') {
      if (yes('rs5')) recs.push({ trigger: 'Large cash payments ($50K+)', action: 'This is an automatic high-risk trigger per AUSTRAC. Apply EDD, verify source of funds and wealth, and obtain senior manager approval.' });
      if (yes('rs1')) recs.push({ trigger: 'Loose precious stones (diamonds)', action: 'Easily transportable and difficult to trace. Apply enhanced scrutiny, verify customer purpose, and document source of funds.' });
      if (yes('rs4')) recs.push({ trigger: 'Scrap jewellery transactions', action: 'Source is difficult to trace. Apply EDD for scrap metal dealers. Verify the origin of scrap precious metals and stones.' });
    } else if (sector === 'accountants') {
      if (yes('rs1')) recs.push({ trigger: 'Trust creation/management', action: 'Trusts are high-risk structures. Ensure you identify all beneficial owners, settlors, appointors, and beneficiaries. Apply EDD where structures are complex.' });
      if (yes('rs2')) recs.push({ trigger: 'Company formation services', action: 'Verify the purpose of company formation. Identify all directors and beneficial owners. Be alert to shell company risks.' });
    }

    return recs;
  },

  printResults() {
    window.print();
  },
};
