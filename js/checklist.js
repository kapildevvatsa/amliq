// T2C — Checklist Module
// Handles all checkbox state, rendering, and progress tracking

const Checklist = {

  STORAGE_PREFIX: 'check_',

  get(id) {
    return localStorage.getItem(this.STORAGE_PREFIX + id) === '1';
  },

  set(id, checked) {
    if (checked) {
      localStorage.setItem(this.STORAGE_PREFIX + id, '1');
    } else {
      localStorage.removeItem(this.STORAGE_PREFIX + id);
    }
    this.updateProgress();
    App.updateAllProgress();
  },

  // Render a single checklist section
  renderSection(key, title) {
    const items = AMLiqData.checklists[key];
    if (!items) return `<p class="text-red-500 text-sm">Checklist "${key}" not found.</p>`;

    const done = items.filter(item => this.get(item.id)).length;
    const pct = Math.round((done / items.length) * 100);

    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-slate-800">${title}</h3>
          <span class="tag bg-blue-100 text-blue-700">${done}/${items.length} complete</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2 mb-4">
          <div class="progress-bar bg-blue-500 h-2 rounded-full" id="progress-${key}" style="width:${pct}%"></div>
        </div>
        <div class="space-y-2">
          ${items.map(item => `
            <div class="checklist-item flex items-start gap-3 group">
              <input type="checkbox" id="chk-${item.id}" ${this.get(item.id) ? 'checked' : ''}
                onchange="Checklist.set('${item.id}', this.checked)"
                class="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer flex-shrink-0">
              <div class="flex-1">
                <label for="chk-${item.id}" class="text-sm ${this.get(item.id) ? 'line-through text-slate-400' : 'text-slate-700'} cursor-pointer font-medium">
                  ${item.text}
                </label>
                <div class="text-xs text-slate-400 mt-0.5 ${this.get(item.id) ? 'hidden' : ''}">
                  ${item.detail || ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // Render all checklist sections for the Program Builder
  renderAll() {
    const sections = [
      { key: 'riskAssessment', title: 'A. Risk Assessment', icon: '⚠️' },
      { key: 'governance', title: 'B. Governance', icon: '👤' },
      { key: 'cddProcedures', title: 'C. Customer Due Diligence Procedures', icon: '🪪' },
      { key: 'monitoring', title: 'D. Transaction Monitoring & Suspicious Activity', icon: '🔍' },
      { key: 'reporting', title: 'E. Reporting', icon: '📤' },
      { key: 'recordKeeping', title: 'F. Record Keeping', icon: '🗂️' },
      { key: 'training', title: 'G. Training', icon: '🎓' },
      { key: 'evaluation', title: 'H. Independent Evaluation', icon: '🔎' },
      { key: 'seniorApproval', title: 'I. Senior Management Approval', icon: '✅' },
    ];

    return sections.map(s => {
      const items = AMLiqData.checklists[s.key];
      const done = items.filter(item => this.get(item.id)).length;
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
                  <input type="checkbox" id="chk-${item.id}" ${this.get(item.id) ? 'checked' : ''}
                    onchange="Checklist.set('${item.id}', this.checked)"
                    class="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer flex-shrink-0">
                  <div class="flex-1">
                    <label for="chk-${item.id}" class="text-sm cursor-pointer font-medium ${this.get(item.id) ? 'line-through text-slate-400' : 'text-slate-700'}">
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

  toggleSection(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
    const key = id.replace('pb-', '');
    const chevron = document.getElementById('pb-chevron-' + key);
    if (chevron && el) chevron.textContent = el.classList.contains('hidden') ? '▼' : '▲';
  },

  updateProgress() {
    // Update program builder overall
    const allKeys = Object.keys(AMLiqData.checklists);
    let total = 0, done = 0;
    allKeys.forEach(k => {
      AMLiqData.checklists[k].forEach(item => {
        total++;
        if (this.get(item.id)) done++;
      });
    });
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const bar = document.getElementById('program-overall-bar');
    const pctEl = document.getElementById('program-overall-pct');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  },

  exportProgress() {
    const data = {};
    Object.keys(AMLiqData.checklists).forEach(k => {
      data[k] = {};
      AMLiqData.checklists[k].forEach(item => {
        data[k][item.id] = this.get(item.id);
      });
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amliq-checklist-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Checklist progress exported!');
  },
};
