// T2C — Jewellers Forms Module
// All CDD forms, governance forms, and template forms
// localStorage prefix: amliq_jewl_forms_

const Forms = {

  STORAGE_KEY: 'amliq_jewl_forms_',

  saveForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const data = {};
    form.querySelectorAll('[name]').forEach(el => {
      if (el.type === 'checkbox') {
        data[el.name] = el.checked;
      } else {
        data[el.name] = el.value;
      }
    });
    localStorage.setItem(this.STORAGE_KEY + formId, JSON.stringify(data));
    App.showToast('Form saved to local storage.');
  },

  loadForm(formId) {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY + formId);
      if (!saved) return;
      const data = JSON.parse(saved);
      const form = document.getElementById(formId);
      if (!form) return;
      Object.entries(data).forEach(([name, val]) => {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el) return;
        if (el.type === 'checkbox') el.checked = val;
        else el.value = val;
      });
    } catch (e) {}
  },

  clearForm(formId) {
    if (!confirm('Clear all data from this form?')) return;
    localStorage.removeItem(this.STORAGE_KEY + formId);
    const form = document.getElementById(formId);
    if (form) form.reset();
    App.showToast('Form cleared.');
  },

  printForm(formId) {
    window.print();
  },

  formButtons(formId) {
    return `
      <div class="flex gap-2 flex-wrap mt-4 no-print">
        <button type="button" onclick="Forms.saveForm('${formId}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
        <button type="button" onclick="Forms.loadForm('${formId}'); App.showToast('Saved data loaded.');" class="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">Load Saved</button>
        <button type="button" onclick="Forms.printForm('${formId}')" class="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300">Print</button>
        <button type="button" onclick="Forms.clearForm('${formId}')" class="text-red-600 hover:underline text-sm px-2">Clear</button>
      </div>
    `;
  },

  field(label, name, type = 'text', opts = {}) {
    if (type === 'select') {
      return `
        <div class="form-field">
          <label>${label}</label>
          <select name="${name}">
            <option value="">-- Select --</option>
            ${(opts.options || []).map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>
      `;
    }
    if (type === 'yesno') {
      return `
        <div class="form-field">
          <label>${label}</label>
          <select name="${name}">
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      `;
    }
    if (type === 'yesnodate') {
      return `
        <div class="form-field">
          <label>${label}</label>
          <div class="grid grid-cols-2 gap-2">
            <select name="${name}"><option value="">-- Select --</option><option value="yes">Yes</option><option value="no">No</option></select>
            <input type="date" name="${name}_date" placeholder="Date">
          </div>
        </div>
      `;
    }
    if (type === 'textarea') {
      return `
        <div class="form-field col-span-2">
          <label>${label}</label>
          <textarea name="${name}" rows="3" placeholder="${opts.placeholder || ''}"></textarea>
        </div>
      `;
    }
    if (type === 'risk') {
      return `
        <div class="form-field">
          <label>${label}</label>
          <select name="${name}">
            <option value="">-- Select --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="very-high">Very High</option>
          </select>
        </div>
      `;
    }
    return `
      <div class="form-field">
        <label>${label}</label>
        <input type="${type}" name="${name}" placeholder="${opts.placeholder || ''}">
      </div>
    `;
  },

  sectionDivider(title) {
    return `<div class="col-span-2 border-t border-slate-200 pt-3 mt-1">
      <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">${title}</div>
    </div>`;
  },

  disclaimer(text) {
    return `<div class="col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">${text}</div>`;
  },

  // ─── 1. CDD INDIVIDUAL ─────────────────────────────────────────────────────
  renderCDDIndividual() {
    const id = 'form-cdd-individual';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Individual Customer</h3>
          <span class="tag bg-blue-100 text-blue-700">Template Form</span>
        </div>
        ${this.disclaimer('This form is for guidance purposes only. It helps you record the information collected during CDD. All data is stored locally in your browser and is never transmitted.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer Identity')}
          ${this.field('Customer Full Legal Name', 'full_name')}
          ${this.field('Date of Birth', 'dob', 'date')}
          ${this.field('Residential Address (not PO Box)', 'address', 'text', { placeholder: 'Full residential address' })}
          ${this.field('Acting on their own behalf?', 'own_behalf', 'yesno')}
          ${this.field('If No — Principal name', 'principal_name')}

          ${this.sectionDivider('Transaction Details')}
          ${this.field('Transaction Type', 'transaction_type', 'select', { options: ['Buying precious goods', 'Selling precious goods'] })}
          ${this.field('Payment Method', 'payment_method', 'select', { options: ['Physical currency (cash)', 'Virtual assets (cryptocurrency)', 'Combination of cash and virtual assets'] })}
          ${this.field('Transaction Value ($)', 'transaction_value', 'number')}
          ${this.field('Is this part of linked transactions?', 'linked_transactions', 'yesno')}
          ${this.field('If linked — cumulative value ($)', 'linked_value', 'number')}
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose', 'text', { placeholder: 'e.g. Engagement ring, investment, gift' })}

          ${this.sectionDivider('Identity Documents')}
          ${this.field('Document 1 — Type', 'doc1_type', 'select', { options: ['Australian Passport', 'Australian Driver\'s Licence', 'Australian Proof-of-Age Card', 'Australian Birth Certificate', 'Australian Citizenship Certificate', 'Medicare Card', 'Foreign Passport', 'Other Government ID'] })}
          ${this.field('Document 1 — Number', 'doc1_number')}
          ${this.field('Document 1 — Issuing Authority', 'doc1_issuer')}
          ${this.field('Document 1 — Expiry Date', 'doc1_expiry', 'date')}
          ${this.field('Document 2 — Type (if required)', 'doc2_type', 'select', { options: ['N/A', 'Medicare Card', 'Pensioner Concession Card', 'Utilities Bill (within 3 months)', 'Bank Statement (within 3 months)', 'Government-issued letter', 'Other'] })}
          ${this.field('Document 2 — Number / Reference', 'doc2_number')}

          ${this.sectionDivider('Screening')}
          ${this.field('PEP Screening Completed?', 'pep_screening', 'yesnodate')}
          ${this.field('Is Customer a PEP?', 'is_pep', 'yesno')}
          ${this.field('TFS/Sanctions Screening Completed?', 'tfs_screening', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds Discussed?', 'source_funds_discussed', 'yesno')}
          ${this.field('Source of Funds Description', 'source_funds', 'text', { placeholder: 'e.g. Savings, business income, dividends' })}

          ${this.sectionDivider('Assessment')}
          ${this.field('Customer Risk Rating', 'risk_rating', 'risk')}
          ${this.field('EDD Required?', 'edd_required', 'yesno')}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        <div class="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          <strong>Primary photographic ID:</strong> Australian passport, driver's licence, proof-of-age card.<br>
          <strong>Primary non-photographic ID:</strong> Birth certificate, citizenship certificate.<br>
          <strong>Secondary ID:</strong> Medicare card, utilities bill (within 3 months), bank statement.<br>
          <em>At least ONE primary document required. If no primary photographic ID, use one primary non-photographic + one secondary.</em>
        </div>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 2. CDD COMPANY ────────────────────────────────────────────────────────
  renderCDDCompany() {
    const id = 'form-cdd-company';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Company Customer</h3>
          <span class="tag bg-blue-100 text-blue-700">Template Form</span>
        </div>
        ${this.disclaimer('Record CDD information for company customers. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Company Details')}
          ${this.field('Company Name', 'company_name')}
          ${this.field('ACN', 'acn')}
          ${this.field('ABN', 'abn')}
          ${this.field('Registered Address', 'reg_address')}
          ${this.field('ASIC Registration Verified?', 'asic_verified', 'yesnodate')}
          ${this.field('Transaction Type', 'transaction_type', 'select', { options: ['Buying precious goods', 'Selling precious goods'] })}
          ${this.field('Payment Method', 'payment_method', 'select', { options: ['Physical currency (cash)', 'Virtual assets', 'Combination'] })}
          ${this.field('Transaction Value ($)', 'transaction_value', 'number')}
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose')}

          ${this.sectionDivider('Beneficial Owners (25%+ ownership or control)')}
          ${this.field('Beneficial Owner 1 — Full Name', 'bo1_name')}
          ${this.field('Beneficial Owner 1 — Ownership %', 'bo1_pct', 'number')}
          ${this.field('Beneficial Owner 1 — ID Verified?', 'bo1_id_verified', 'yesno')}
          ${this.field('Beneficial Owner 2 — Full Name', 'bo2_name')}
          ${this.field('Beneficial Owner 2 — Ownership %', 'bo2_pct', 'number')}
          ${this.field('Beneficial Owner 2 — ID Verified?', 'bo2_id_verified', 'yesno')}

          ${this.sectionDivider('Authorised Representative')}
          ${this.field('Representative Name', 'auth_rep_name')}
          ${this.field('Authority Documented?', 'authority_documented', 'yesno')}
          ${this.field('Authority Document Type', 'authority_type', 'select', { options: ['Board Resolution', 'Letter of Authority', 'Power of Attorney', 'Other'] })}

          ${this.sectionDivider('Screening & Assessment')}
          ${this.field('PEP/TFS Screening for all BOs completed?', 'pep_tfs_screening', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds', 'source_funds', 'text', { placeholder: 'e.g. Business revenue' })}
          ${this.field('Risk Rating', 'risk_rating', 'risk')}
          ${this.field('EDD Required?', 'edd_required', 'yesno')}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 3. CDD TRUST ──────────────────────────────────────────────────────────
  renderCDDTrust() {
    const id = 'form-cdd-trust';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Trust Customer</h3>
          <span class="tag bg-red-100 text-red-700">High Risk Entity</span>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-800">
          <strong>AUSTRAC risk note:</strong> Trusts are rated as a <strong>high national money laundering risk</strong> due to poor transparency. EDD is automatically flagged. All beneficial owners must be identified.
        </div>
        ${this.disclaimer('Record CDD information for trust customers. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Trust Details')}
          ${this.field('Trust Name', 'trust_name')}
          ${this.field('Trust Type', 'trust_type', 'select', { options: ['Discretionary (Family) Trust', 'Unit Trust', 'Testamentary Trust', 'Hybrid Trust', 'Fixed Trust', 'Other'] })}
          ${this.field('ABN (if registered)', 'abn')}
          ${this.field('Trust Deed Sighted?', 'deed_sighted', 'yesnodate')}
          ${this.field('Transaction Type', 'transaction_type', 'select', { options: ['Buying precious goods', 'Selling precious goods'] })}
          ${this.field('Payment Method', 'payment_method', 'select', { options: ['Physical currency (cash)', 'Virtual assets', 'Combination'] })}
          ${this.field('Transaction Value ($)', 'transaction_value', 'number')}

          ${this.sectionDivider('Trustee(s)')}
          ${this.field('Trustee 1 — Name', 'trustee1_name')}
          ${this.field('Trustee 1 — Type', 'trustee1_type', 'select', { options: ['Individual', 'Corporate (company)'] })}
          ${this.field('Trustee 1 — ID / ASIC Verified?', 'trustee1_verified', 'yesno')}
          ${this.field('If Corporate — Beneficial Owners Identified?', 'corp_trustee_bos', 'yesno')}

          ${this.sectionDivider('Settlor / Appointor')}
          ${this.field('Settlor Name', 'settlor_name')}
          ${this.field('Appointor Name', 'appointor_name')}

          ${this.sectionDivider('Beneficiaries')}
          ${this.field('Beneficiaries Identified?', 'beneficiaries_identified', 'select', { options: ['Yes — individually named', 'Yes — by class only', 'Not individually identifiable'] })}
          ${this.field('Beneficiary Names or Class Description', 'beneficiaries_desc', 'textarea')}

          ${this.sectionDivider('Screening & Assessment')}
          ${this.field('PEP/TFS Screening for all individuals?', 'pep_tfs', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds', 'source_funds')}
          ${this.field('Risk Rating', 'risk_rating', 'select', { options: ['Medium', 'High', 'Very High'] })}
          ${this.field('EDD Required?', 'edd_required', 'select', { options: ['Yes — EDD mandatory for trusts', 'Yes — additional risk factors'] })}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 4. CDD PARTNERSHIP ────────────────────────────────────────────────────
  renderCDDPartnership() {
    const id = 'form-cdd-partnership';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Initial CDD — Partnership Customer</h3>
        ${this.disclaimer('Record CDD information for partnership customers. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Partnership Details')}
          ${this.field('Partnership Name', 'partnership_name')}
          ${this.field('ABN', 'abn')}
          ${this.field('Partnership Type', 'partnership_type', 'select', { options: ['General Partnership', 'Limited Partnership', 'Limited Liability Partnership'] })}
          ${this.field('Transaction Type', 'transaction_type', 'select', { options: ['Buying precious goods', 'Selling precious goods'] })}
          ${this.field('Payment Method', 'payment_method', 'select', { options: ['Physical currency (cash)', 'Virtual assets', 'Combination'] })}
          ${this.field('Transaction Value ($)', 'transaction_value', 'number')}

          ${this.sectionDivider('Partners')}
          ${this.field('Partner 1 — Name', 'partner1_name')}
          ${this.field('Partner 1 — Type', 'partner1_type', 'select', { options: ['Individual', 'Entity'] })}
          ${this.field('Partner 1 — ID Verified?', 'partner1_verified', 'yesno')}
          ${this.field('Partner 2 — Name', 'partner2_name')}
          ${this.field('Partner 2 — ID Verified?', 'partner2_verified', 'yesno')}

          ${this.sectionDivider('Screening & Assessment')}
          ${this.field('PEP/TFS Screening Completed?', 'pep_tfs', 'yesnodate')}
          ${this.field('Sanctions Match?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds', 'source_funds')}
          ${this.field('Risk Rating', 'risk_rating', 'risk')}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 5. CDD FOREIGN SUPPLEMENT ─────────────────────────────────────────────
  renderCDDForeign() {
    const id = 'form-cdd-foreign';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">CDD — Foreign Customer Supplement</h3>
          <span class="tag bg-amber-100 text-amber-700">Enhanced Risk</span>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          Use this form in addition to the relevant CDD form (Individual, Company, Trust). <strong>Foreign PEPs must always be treated as high-risk.</strong>
        </div>
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer / Transaction Reference')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}

          ${this.sectionDivider('Foreign Jurisdiction Details')}
          ${this.field('Country of Residence / Incorporation', 'country_of_origin')}
          ${this.field('Is this a FATF High-Risk Jurisdiction?', 'fatf_risk', 'select', { options: ['No — standard risk', 'Yes — FATF Grey List', 'Yes — FATF Black List (High Risk)'] })}
          ${this.field('Source of Overseas Funds', 'overseas_funds', 'text', { placeholder: 'e.g. Business income in UK, property sale in Singapore' })}
          ${this.field('Reason for Transaction in Australia', 'reason_australia')}

          ${this.sectionDivider('Foreign Identity Documents')}
          ${this.field('Foreign ID Document Type', 'foreign_doc_type', 'text', { placeholder: 'e.g. US Passport' })}
          ${this.field('Certified Translation Required?', 'translation_required', 'yesno')}
          ${this.field('Certified Translation Obtained?', 'translation_obtained', 'yesno')}

          ${this.sectionDivider('Enhanced Due Diligence')}
          ${this.field('EDD Applied?', 'edd_applied', 'yesno')}
          ${this.field('EDD Measures Taken', 'edd_measures', 'textarea', { placeholder: 'Describe additional verification steps' })}
          ${this.field('Senior Management Approval?', 'senior_approval', 'yesnodate')}
          ${this.field('Risk Rating', 'risk_rating', 'risk')}
          ${this.field('Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div class="text-xs font-bold text-slate-600 mb-2">FATF HIGH-RISK JURISDICTIONS (February 2026)</div>
          <div class="mb-2"><div class="text-xs font-semibold text-red-700 mb-1">Black List:</div><div class="text-xs text-slate-600">${AMLiqData.fatfHighRisk.blacklist.join(' · ')}</div></div>
          <div><div class="text-xs font-semibold text-amber-700 mb-1">Grey List:</div><div class="text-xs text-slate-600">${AMLiqData.fatfHighRisk.greylist.join(' · ')}</div></div>
          <div class="text-xs text-slate-400 mt-2">Always check the current FATF list at <a href="https://www.fatf-gafi.org" target="_blank" class="underline">fatf-gafi.org</a>.</div>
        </div>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 6. EDD RECORD ─────────────────────────────────────────────────────────
  renderEDD() {
    const id = 'form-edd';
    const triggers = [
      'Physical currency transaction of $50,000+ (automatic high-risk)',
      'Foreign PEP (must always be treated as high-risk)',
      'Stolen, conflict, or counterfeit items suspected',
      'Scrap metal dealer as customer',
      'Customer is another jeweller',
      'Trust or complex corporate structure',
      'Customer cannot explain source of funds/wealth',
      'Unusual transaction with no apparent purpose',
      'Other (describe in notes)',
    ];
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Enhanced Due Diligence (EDD) Record</h3>
        ${this.disclaimer('Record EDD measures applied. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer Reference')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}
          ${this.sectionDivider('EDD Triggers (select all that apply)')}
          <div class="col-span-2 space-y-2">
            ${triggers.map((t, i) => `<div class="flex items-center gap-2"><input type="checkbox" id="edd-trigger-${i}" name="trigger_${i}" class="h-4 w-4 rounded border-slate-300 text-blue-600"><label for="edd-trigger-${i}" class="text-sm text-slate-700 cursor-pointer">${t}</label></div>`).join('')}
          </div>
          ${this.sectionDivider('EDD Measures Taken')}
          ${this.field('Source-of-Funds Information Obtained', 'sof_info', 'textarea', { placeholder: 'Describe additional information provided or obtained' })}
          ${this.field('Source-of-Wealth Information Obtained', 'sow_info', 'textarea', { placeholder: 'How has the customer accumulated their wealth?' })}
          ${this.field('Adverse Media Check Completed?', 'adverse_media', 'yesnodate')}
          ${this.field('Adverse Media Result', 'adverse_media_result', 'select', { options: ['No adverse results', 'Adverse results found — describe in notes'] })}
          ${this.field('Senior Management Approval?', 'senior_approval', 'yesnodate')}
          ${this.field('Approved By', 'approved_by')}
          ${this.field('Monitoring Frequency', 'monitoring_freq', 'select', { options: ['Per transaction', 'Monthly', 'Quarterly', 'Annually'] })}
          ${this.field('Rationale for Proceeding', 'rationale', 'textarea', { placeholder: 'Document reasons for proceeding despite elevated risk' })}
          ${this.field('Completed By', 'completed_by')}
          ${this.field('Date', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 7. ONGOING CDD REVIEW ─────────────────────────────────────────────────
  renderOngoingCDD() {
    const id = 'form-ongoing-cdd';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Ongoing CDD Review</h3>
        ${this.disclaimer('Periodic review of existing customer relationships. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}
          ${this.field('Review Date', 'review_date', 'date')}
          ${this.field('Customer information is current?', 'info_current', 'yesno')}
          ${this.field('Transaction consistent with known profile?', 'profile_consistent', 'yesno')}
          ${this.field('New red flags or suspicious indicators?', 'new_red_flags', 'yesno')}
          ${this.field('Source of funds remains consistent?', 'sof_consistent', 'yesno')}
          ${this.field('PEP/TFS status re-checked?', 'pep_rechecked', 'yesnodate')}
          ${this.field('Risk rating reviewed?', 'risk_reviewed', 'yesno')}
          ${this.field('Updated Risk Rating', 'risk_rating', 'risk')}
          ${this.field('Action Required', 'action', 'select', { options: ['None — continue relationship', 'Update customer information', 'Apply EDD', 'Escalate to compliance officer', 'File SMR', 'Cease relationship'] })}
          ${this.field('Reviewed By', 'reviewed_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 8. PEP/TFS SCREENING ─────────────────────────────────────────────────
  renderPEPScreening() {
    const id = 'form-pep-screening';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">PEP/TFS Screening Record</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div class="font-bold text-blue-800 mb-2 text-sm">What is a PEP?</div>
            <p class="text-xs text-blue-700">A prominent public official (domestic or foreign) — heads of state, ministers, senior officials, military leaders, judiciary — and their family/associates. <strong>Foreign PEPs must always be treated as high-risk.</strong></p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div class="font-bold text-amber-800 mb-2 text-sm">What is TFS?</div>
            <p class="text-xs text-amber-700">Targeted Financial Sanctions against specific persons/entities. It is <strong>illegal</strong> to provide services to sanctioned persons. Check the <a href="https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list" target="_blank" class="underline">DFAT Consolidated List</a>.</p>
          </div>
        </div>
        ${this.disclaimer('Record PEP/TFS screening for every customer in a regulated transaction. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}
          ${this.sectionDivider('PEP Assessment')}
          ${this.field('PEP Self-Declaration Obtained?', 'pep_declaration', 'yesno')}
          ${this.field('Is Customer a PEP?', 'is_pep', 'select', { options: ['No', 'Yes', 'Uncertain — further investigation'] })}
          ${this.field('PEP Type', 'pep_type', 'select', { options: ['N/A', 'Domestic PEP', 'Foreign PEP (always high-risk)', 'International Organisation PEP', 'Family member/close associate of PEP'] })}
          ${this.field('Relationship to PEP (if associate)', 'pep_relationship')}
          ${this.sectionDivider('Sanctions Screening')}
          ${this.field('DFAT Consolidated List Checked?', 'dfat_checked', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.sectionDivider('Action Taken')}
          ${this.field('Action', 'action_taken', 'select', { options: ['No action (no PEP/sanctions match)', 'EDD applied (PEP identified)', 'Service declined (sanctions match)', 'Seeking legal advice', 'Refer to compliance officer'] })}
          ${this.field('Screened By', 'screened_by')}
          ${this.field('Date', 'date_screened', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 9. DELAYED CDD RECORD ─────────────────────────────────────────────────
  renderDelayedCDD() {
    const id = 'form-delayed-cdd';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Delayed CDD Record</h3>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          CDD may only be delayed if: (1) low additional ML/TF/PF risk, AND (2) delay is essential to avoid interrupting ordinary business. <strong>Sanctions screening must still be completed without delay.</strong>
        </div>
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('Transaction Description', 'transaction_desc')}
          ${this.field('Reason for Delay', 'delay_reason', 'textarea', { placeholder: 'Why was CDD delayed?' })}
          ${this.field('Low additional ML/TF/PF risk?', 'low_risk', 'yesno')}
          ${this.field('Delay essential for normal business?', 'essential', 'yesno')}
          ${this.field('Sanctions screening completed without delay?', 'sanctions_done', 'yesnodate')}
          ${this.field('CDD Completion Deadline', 'deadline', 'date')}
          ${this.field('CDD Actually Completed', 'actual_completed', 'date')}
          ${this.field('Approved By', 'approved_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 10. THIRD-PARTY RELIANCE ──────────────────────────────────────────────
  renderThirdPartyReliance() {
    const id = 'form-third-party';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Third-Party Reliance Record</h3>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          A third party not enrolled with AUSTRAC is a <strong>medium risk factor</strong>. You remain responsible for ensuring CDD was properly conducted.
        </div>
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('Third Party Name/Firm', 'third_party_name')}
          ${this.field('Third Party Enrolled with AUSTRAC?', 'austrac_enrolled', 'yesno')}
          ${this.field('Written Reliance Arrangement?', 'written_arrangement', 'yesno')}
          ${this.field('CDD Measures Relied Upon', 'measures_relied', 'textarea')}
          ${this.field('CDD Records Obtained?', 'records_obtained', 'yesno')}
          ${this.field('Documented By', 'documented_by')}
          ${this.field('Date', 'date_documented', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 11. CDD OUTCOME RECORD ────────────────────────────────────────────────
  renderCDDOutcome() {
    const id = 'form-cdd-outcome';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">CDD Outcome Record</h3>
        ${this.disclaimer('Document decisions when CDD cannot be completed satisfactorily. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('Reason CDD Could Not Be Completed', 'reason', 'select', { options: ['Customer refused to provide ID', 'Inconsistent/fraudulent documents', 'Beneficial owner cannot be identified', 'Customer on DFAT sanctions list', 'Source of funds cannot be verified', 'Other'] })}
          ${this.field('Detail', 'detail', 'textarea', { placeholder: 'Describe the circumstances' })}
          ${this.field('Action Taken', 'action', 'select', { options: ['Service declined', 'Service ceased', 'SMR filed', 'Referred to compliance officer', 'Seeking legal advice'] })}
          ${this.field('SMR Filed?', 'smr_filed', 'yesnodate')}
          ${this.field('Decision Made By', 'decision_by')}
          ${this.field('Date', 'date_decision', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 12. COMPLIANCE OFFICER APPOINTMENT ────────────────────────────────────
  renderComplianceOfficerForm() {
    const id = 'form-compliance-officer';
    return `
      <div class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Eligibility:</strong> Management level, Australian resident, fit and proper person. For small jewellers, the owner/principal may serve. External compliance officers are permitted.
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-4">Compliance Officer Appointment Form</h3>
          <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${this.sectionDivider('Appointee Details')}
            ${this.field('Full Name', 'full_name')}
            ${this.field('Position/Title', 'position')}
            ${this.field('Management level?', 'management_level', 'yesno')}
            ${this.field('Australian resident?', 'aus_resident', 'yesno')}
            ${this.field('External compliance officer?', 'is_external', 'yesno')}
            ${this.field('External firm name', 'external_firm')}
            ${this.sectionDivider('Due Diligence')}
            ${this.field('Open-source / media search', 'dd_oss', 'yesnodate')}
            ${this.field('Credit check', 'dd_credit', 'yesnodate')}
            ${this.field('Reference check', 'dd_reference', 'yesnodate')}
            ${this.field('Police / criminal history check', 'dd_police', 'yesnodate')}
            ${this.field('Identity verification', 'dd_identity', 'yesnodate')}
            ${this.sectionDivider('Appointment')}
            ${this.field('Date of Appointment', 'date_appointed', 'date')}
            ${this.field('AUSTRAC Notified?', 'austrac_notified', 'yesnodate')}
            ${this.field('Approved By (Senior Management)', 'approved_by')}
            ${this.field('Notes', 'notes', 'textarea')}
          </form>
          <div class="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
            You must notify AUSTRAC within <strong>14 days</strong> of appointment via AUSTRAC Online.
          </div>
          ${this.formButtons(id)}
        </div>
      </div>
    `;
  },

  // ─── 13. ROLES ASSIGNMENT ──────────────────────────────────────────────────
  renderRolesForm() {
    const id = 'form-roles';
    const roles = [
      { key: 'co', role: 'AML/CTF Compliance Officer', resp: 'Oversee day-to-day compliance, report to governing body annually, communicate with AUSTRAC' },
      { key: 'detect', role: 'Transaction Detection Lead', resp: 'Monitor for regulated transactions ($10,000+ in cash/virtual assets), detect linked transactions' },
      { key: 'cdd', role: 'CDD Lead', resp: 'Conduct or supervise customer identification and verification' },
      { key: 'escalation', role: 'Suspicious Activity Escalation Point', resp: 'Receive and assess internal escalations, decide on SMR filing' },
      { key: 'training', role: 'Training Coordinator', resp: 'Plan and deliver AML/CTF training, maintain training records' },
      { key: 'records', role: 'Record Keeper', resp: 'Maintain AML/CTF records, ensure 7-year retention' },
      { key: 'senior', role: 'Senior Management Approver', resp: 'Approve AML/CTF program, receive annual compliance reports' },
    ];
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-3">AML/CTF Roles Assignment</h3>
        <p class="text-sm text-slate-500 mb-4">In small jewellers, one person may fill multiple roles.</p>
        <form id="${id}" class="space-y-3">
          ${roles.map(r => `
            <div class="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div class="font-semibold text-slate-800 text-sm mb-1">${r.role}</div>
              <div class="text-xs text-slate-500 mb-2">${r.resp}</div>
              <div class="form-field"><label>Assigned To</label><input type="text" name="${r.key}_assigned" placeholder="Full name"></div>
            </div>
          `).join('')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 14. PERSONNEL DUE DILIGENCE ──────────────────────────────────────────
  renderPersonnelDDForm() {
    const id = 'form-personnel-dd';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Personnel Due Diligence Record</h3>
        ${this.disclaimer('Record due diligence on staff in AML/CTF roles. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Full Name', 'full_name')}
          ${this.field('Role', 'role', 'select', { options: ['Compliance Officer', 'Transaction Detection Lead', 'CDD Lead', 'Sales Staff / Counter Staff', 'Store Manager', 'Escalation Point', 'Training Coordinator', 'Record Keeper', 'Senior Management', 'Other'] })}
          ${this.field('Employment Type', 'employment_type', 'select', { options: ['Employee (full-time)', 'Employee (part-time)', 'Contractor', 'Consultant', 'Other'] })}
          ${this.field('Role Risk Level', 'role_risk', 'select', { options: ['Low', 'Medium', 'High (Compliance Officer, CDD Lead)'] })}
          ${this.sectionDivider('Due Diligence Measures')}
          ${this.field('Identity Verified?', 'dd_identity', 'yesnodate')}
          ${this.field('Open-source/Media Search?', 'dd_oss', 'yesnodate')}
          ${this.field('Reference Check?', 'dd_reference', 'yesnodate')}
          ${this.field('Credit Check?', 'dd_credit', 'yesnodate')}
          ${this.field('Police/Criminal History Check?', 'dd_police', 'yesnodate')}
          ${this.sectionDivider('Training')}
          ${this.field('Initial Training Completed?', 'training_initial', 'yesnodate')}
          ${this.field('Most Recent Refresher?', 'training_refresher', 'yesnodate')}
          ${this.field('Next Review Due', 'next_review', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 15. TRAINING PLAN ─────────────────────────────────────────────────────
  renderTrainingPlan() {
    const id = 'form-training-plan';
    return `
      <div class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Training requirements:</strong> Initial training before 1 July 2026. Annual refresher minimum. Ad-hoc training when policies change or new risks emerge.
        </div>
        ${Checklist.renderSection('training', 'Training Program Checklist')}
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-4">Training Plan Builder</h3>
          <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${this.field('Training Module', 'module', 'select', { options: ['Module 1: ML/TF/PF Overview', 'Module 2: Legal Obligations', 'Module 3: Your AML/CTF Program', 'Module 4: Transaction Detection', 'Module 5: Customer Due Diligence', 'Module 6: Streamlined CDD Process', 'Module 7: PEP & Sanctions Screening', 'Module 8: Red Flags & Suspicious Activity', 'Module 9: Reporting Obligations', 'Module 10: Tipping-Off Prohibition', 'Module 11: Record Keeping', 'Module 12: Payment Diversion Warning'] })}
            ${this.field('Target Audience', 'audience', 'select', { options: ['All Staff', 'Sales/Counter Staff', 'Store Owner/Manager', 'Compliance Officer', 'Admin Staff', 'New Hire'] })}
            ${this.field('Delivery Method', 'delivery', 'select', { options: ['In-person workshop', 'Online (self-paced)', 'Webinar', 'External provider', 'Reading material'] })}
            ${this.field('Scheduled Date', 'scheduled_date', 'date')}
            ${this.field('Duration', 'duration', 'text', { placeholder: 'e.g. 1 hour' })}
            ${this.field('Trainer / Provider', 'trainer')}
            ${this.field('Status', 'status', 'select', { options: ['Not started', 'Scheduled', 'Completed'] })}
            ${this.field('Notes', 'notes', 'textarea')}
          </form>
          ${this.formButtons(id)}
        </div>
      </div>
    `;
  },

  // ─── 16. TRAINING ATTENDANCE ───────────────────────────────────────────────
  renderAttendanceRecord() {
    const id = 'form-attendance';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Training Attendance Record</h3>
        ${this.disclaimer('Record attendance at each training session. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Training Module', 'module', 'select', { options: ['Module 1: ML/TF/PF Overview', 'Module 2: Legal Obligations', 'Module 3: AML/CTF Program', 'Module 4: Transaction Detection', 'Module 5: CDD', 'Module 6: Streamlined CDD', 'Module 7: PEP & Sanctions', 'Module 8: Red Flags', 'Module 9: Reporting', 'Module 10: Tipping-Off', 'Module 11: Record Keeping', 'Module 12: Payment Diversion'] })}
          ${this.field('Date Delivered', 'date_delivered', 'date')}
          ${this.field('Trainer', 'trainer')}
          ${this.field('Attendee Name', 'attendee_name')}
          ${this.field('Role', 'role', 'select', { options: ['Sales/Counter Staff', 'Store Manager', 'Compliance Officer', 'Administration', 'Owner/Principal', 'Other'] })}
          ${this.field('Completed?', 'completed', 'yesno')}
          ${this.field('Quiz Score', 'quiz_score', 'number')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 17. PROGRAM REVIEW RECORD ─────────────────────────────────────────────
  renderProgramReviewForm() {
    const id = 'form-program-review';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Program Review Record</h3>
        ${this.disclaimer('Document each review of your AML/CTF program. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Review Date', 'review_date', 'date')}
          ${this.field('Review Trigger', 'trigger', 'select', { options: ['Scheduled periodic review', 'Changes to designated services', 'Changes to customer types', 'New payment methods (e.g., virtual assets)', 'Changes to countries/jurisdictions', 'Internal incident or control failure', 'Regulatory/legislative update', 'New/emerging ML/TF/PF risks', 'AUSTRAC communication', 'Adverse evaluation findings', 'Significant business changes', 'Other'] })}
          ${this.field('What Was Reviewed', 'what_reviewed', 'textarea')}
          ${this.field('Risk Assessment Updated?', 'risk_updated', 'yesno')}
          ${this.field('Policies/Procedures Updated?', 'policies_updated', 'yesno')}
          ${this.field('Transaction Detection Systems Reviewed?', 'detection_reviewed', 'yesno')}
          ${this.field('Controls Still Adequate?', 'controls_adequate', 'yesno')}
          ${this.field('Risks Within Appetite?', 'within_appetite', 'yesno')}
          ${this.field('Staff Notified of Changes?', 'staff_notified', 'yesnodate')}
          ${this.field('Additional Training Required?', 'training_required', 'yesno')}
          ${this.field('Reviewed By', 'reviewed_by')}
          ${this.field('Approved By', 'approved_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 18. CHANGE LOG ────────────────────────────────────────────────────────
  renderChangeLog() {
    const id = 'form-change-log';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Program Change Log</h3>
        ${this.disclaimer('Record all changes to your AML/CTF program. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Date of Change', 'date_of_change', 'date')}
          ${this.field('Review Trigger', 'trigger', 'select', { options: ['Scheduled review', 'Service changes', 'Customer type changes', 'Payment method changes', 'Jurisdiction changes', 'Internal incident', 'Regulatory update', 'New risks', 'AUSTRAC alert', 'Evaluation findings', 'Business change', 'Other'] })}
          ${this.field('What Was Reviewed', 'what_reviewed', 'textarea')}
          ${this.field('What Was Changed', 'what_changed', 'textarea')}
          ${this.field('Approved By', 'approved_by')}
          ${this.field('Staff Notified?', 'staff_notified', 'yesnodate')}
          ${this.field('Training Required?', 'training_required', 'yesno')}
          ${this.field('Training Delivered?', 'training_delivered', 'yesnodate')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 19. INDEPENDENT EVALUATION PLAN ───────────────────────────────────────
  renderEvaluationPlan() {
    const id = 'form-evaluation';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Independent Evaluation Planning Form</h3>
        ${this.disclaimer('Plan and record your independent evaluation (required every 3 years). Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('First Evaluation Due By', 'due_date', 'date')}
          ${this.field('Evaluator Type', 'evaluator_type', 'select', { options: ['External consultant', 'Internal audit (independent)', 'Industry body service', 'Other'] })}
          ${this.field('Evaluator Name / Firm', 'evaluator_name')}
          ${this.field('Confirmed Independent?', 'confirmed_independent', 'yesno')}
          ${this.field('Scope Agreed', 'scope', 'textarea')}
          ${this.field('Status', 'status', 'select', { options: ['Not started', 'Planning', 'Evaluator engaged', 'In progress', 'Completed'] })}
          ${this.field('Evaluation Date', 'evaluation_date', 'date')}
          ${this.field('Findings Summary', 'findings', 'textarea')}
          ${this.field('Adverse Findings?', 'adverse_findings', 'yesno')}
          ${this.field('Remediation Actions', 'remediation', 'textarea')}
          ${this.field('Remediation Completed?', 'remediation_completed', 'yesnodate')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 20. SUSPICIOUS ACTIVITY LOG ───────────────────────────────────────────
  renderSuspiciousActivityLog() {
    const id = 'form-suspicious-log';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Suspicious Activity Log</h3>
        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-800">
          <strong>Tipping-off warning:</strong> Do NOT disclose any suspicion or SMR filing to the customer. This is a criminal offence.
        </div>
        ${this.disclaimer('Internal record of suspicious activity observations. Keep separately from customer files. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Date Observed', 'date_observed', 'date')}
          ${this.field('Customer Name (if known)', 'customer_name')}
          ${this.field('Transaction Description', 'transaction_desc', 'textarea')}
          ${this.field('Red Flag Indicators Observed', 'red_flags', 'textarea', { placeholder: 'List the specific indicators observed' })}
          ${this.field('Category', 'category', 'select', { options: ['Customer Behaviour', 'Customer Profile', 'Service/Transaction Risk', 'Delivery Channel Risk', 'Foreign Jurisdiction Risk', 'Multiple categories'] })}
          ${this.field('Observed By', 'observed_by')}
          ${this.field('Escalated to Compliance Officer?', 'escalated', 'yesnodate')}
          ${this.field('Compliance Officer Assessment', 'co_assessment', 'textarea')}
          ${this.field('SMR Filed?', 'smr_filed', 'yesnodate')}
          ${this.field('Action Taken', 'action', 'select', { options: ['Monitoring continues', 'SMR filed', 'Transaction declined', 'Relationship ceased', 'No further action'] })}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 21. SMR DECISION RECORD ───────────────────────────────────────────────
  renderSMRDecision() {
    const id = 'form-smr-decision';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">SMR Decision Record</h3>
        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-800">
          <strong>Reminder:</strong> SMRs for terrorism financing must be filed within <strong>24 hours</strong>. All other SMRs within <strong>3 business days</strong>. Tipping off is a criminal offence.
        </div>
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('Date Suspicion Formed', 'suspicion_date', 'date')}
          ${this.field('Basis for Suspicion', 'basis', 'textarea', { placeholder: 'Describe the grounds for suspicion' })}
          ${this.field('Decision', 'decision', 'select', { options: ['File SMR', 'Do not file — no reasonable grounds', 'Seeking further information', 'Seeking legal advice'] })}
          ${this.field('SMR Filed Via AUSTRAC Online?', 'smr_filed', 'yesnodate')}
          ${this.field('Relates to Terrorism Financing?', 'terrorism', 'yesno')}
          ${this.field('Transaction Proceeded?', 'transaction_proceeded', 'select', { options: ['Yes — service provided', 'No — transaction declined', 'No — relationship ceased'] })}
          ${this.field('If Declined — Reason Given to Customer', 'decline_reason', 'text', { placeholder: 'e.g. Cash amount exceeds accepted limits' })}
          ${this.field('Decision Made By', 'decision_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 22. ENROLMENT CHECKLIST ───────────────────────────────────────────────
  renderEnrolmentForm() {
    const id = 'form-enrolment';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Enrolment Checklist & Record</h3>
        ${this.disclaimer('Track your AUSTRAC enrolment preparation and completion. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Business Information')}
          ${this.field('Business Name', 'business_name')}
          ${this.field('ABN', 'abn')}
          ${this.field('Business Structure', 'structure', 'select', { options: ['Sole Trader', 'Partnership', 'Company', 'Trust'] })}
          ${this.field('Business Address', 'address')}
          ${this.field('Contact Person', 'contact_person')}
          ${this.field('Regulation Option Chosen', 'reg_option', 'select', { options: ['Option 1 (Exempt)', 'Option 2 (Limited)', 'Option 3 (Streamlined)', 'Option 4 (Full Program)'] })}
          ${this.sectionDivider('Enrolment Progress')}
          ${this.field('Confirmed providing designated service?', 'confirmed_service', 'yesno')}
          ${this.field('All business information gathered?', 'info_gathered', 'yesno')}
          ${this.field('Compliance officer appointed?', 'co_appointed', 'yesnodate')}
          ${this.field('Enrolled via AUSTRAC Online?', 'enrolled', 'yesnodate')}
          ${this.field('AUSTRAC notified of CO?', 'co_notified', 'yesnodate')}
          ${this.field('Enrolment confirmation saved?', 'confirmation_saved', 'yesno')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 23. RISK ASSESSMENT SUMMARY ───────────────────────────────────────────
  renderRiskAssessmentSummary() {
    const id = 'form-risk-summary';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Risk Assessment Summary</h3>
        ${this.disclaimer('Document the output of your ML/TF/PF risk assessment. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Risk Ratings by Category')}
          ${this.field('Customer Risk Rating', 'customer_risk', 'risk')}
          ${this.field('Service/Product Risk Rating', 'service_risk', 'risk')}
          ${this.field('Delivery Channel Risk Rating', 'delivery_risk', 'risk')}
          ${this.field('Geographic/Jurisdiction Risk Rating', 'geographic_risk', 'risk')}
          ${this.field('Overall Risk Rating', 'overall_risk', 'risk')}
          ${this.sectionDivider('Risk Appetite & Controls')}
          ${this.field('Risk Appetite Statement', 'risk_appetite', 'textarea', { placeholder: 'What level of risk is your business willing to accept?' })}
          ${this.field('Key High-Risk Scenarios', 'high_risk_scenarios', 'textarea', { placeholder: 'List specific high-risk scenarios for your business' })}
          ${this.field('Mitigation Controls', 'controls', 'textarea', { placeholder: 'Describe controls implemented for each risk' })}
          ${this.field('Recommended Regulation Option', 'reg_option', 'select', { options: ['Option 1 (Exempt)', 'Option 2 (Limited)', 'Option 3 (Streamlined)', 'Option 4 (Full Program)'] })}
          ${this.sectionDivider('Approval')}
          ${this.field('Assessment Date', 'assessment_date', 'date')}
          ${this.field('Assessed By', 'assessed_by')}
          ${this.field('Approved By (Senior Management)', 'approved_by')}
          ${this.field('Next Review Date', 'next_review', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 24. TRANSACTION DETECTION RECORD ──────────────────────────────────────
  renderTransactionDetection() {
    const id = 'form-transaction-detection';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Transaction Detection Record</h3>
        ${this.disclaimer('Log regulated transactions and linked transaction detection. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Transaction Details')}
          ${this.field('Date', 'transaction_date', 'date')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('Transaction Type', 'type', 'select', { options: ['Single transaction $10,000+', 'Linked transactions exceeding $10,000', 'Suspected structuring'] })}
          ${this.field('Payment Method', 'payment_method', 'select', { options: ['Physical currency (cash)', 'Virtual assets', 'Combination'] })}
          ${this.field('Total Value ($)', 'total_value', 'number')}
          ${this.field('Items Purchased/Sold', 'items', 'textarea', { placeholder: 'Describe the precious goods involved' })}
          ${this.sectionDivider('Linked Transaction Details (if applicable)')}
          ${this.field('Number of Linked Transactions', 'linked_count', 'number')}
          ${this.field('Date Range', 'linked_dates', 'text', { placeholder: 'e.g. 15 Jan - 22 Jan 2026' })}
          ${this.field('Linking Factor', 'link_factor', 'select', { options: ['N/A', 'Same customer', 'Same invoice', 'Same date', 'Lay-by / instalment', 'Suspected structuring'] })}
          ${this.sectionDivider('Action Taken')}
          ${this.field('CDD Completed?', 'cdd_completed', 'yesnodate')}
          ${this.field('TTR Required?', 'ttr_required', 'yesno')}
          ${this.field('TTR Filed?', 'ttr_filed', 'yesnodate')}
          ${this.field('Suspicious Indicators Present?', 'suspicious', 'yesno')}
          ${this.field('Escalated to CO?', 'escalated', 'yesnodate')}
          ${this.field('Detected By', 'detected_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 25. REGULATION OPTION ASSESSMENT ──────────────────────────────────────
  renderRegulationOption() {
    const id = 'form-regulation-option';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Regulation Option Assessment</h3>
        ${this.disclaimer('Record which regulation option applies to your business and why. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.field('Business Name', 'business_name')}
          ${this.field('Assessment Date', 'assessment_date', 'date')}
          ${this.sectionDivider('Business Model Assessment')}
          ${this.field('Do you sell precious metals, stones, or products?', 'sells_precious', 'yesno')}
          ${this.field('Do you accept physical currency (cash)?', 'accepts_cash', 'yesno')}
          ${this.field('Do you accept virtual assets (crypto)?', 'accepts_virtual', 'yesno')}
          ${this.field('Do single/linked transactions reach $10,000+?', 'reaches_threshold', 'yesno')}
          ${this.field('Do you deal with entities (companies, trusts)?', 'deals_entities', 'yesno')}
          ${this.field('Do you deal with high-risk or foreign customers?', 'deals_high_risk', 'yesno')}
          ${this.sectionDivider('Regulation Option Selected')}
          ${this.field('Regulation Option', 'option', 'select', { options: ['Option 1: Don\'t accept cash/virtual assets (Exempt)', 'Option 2: Accept under $10,000 (Limited)', 'Option 3: Streamlined for individuals', 'Option 4: Full program (all customer types)'] })}
          ${this.field('Rationale', 'rationale', 'textarea', { placeholder: 'Explain why this option applies to your business' })}
          ${this.field('Assessed By', 'assessed_by')}
          ${this.field('Approved By', 'approved_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
          <strong>Option 1 (Exempt):</strong> You never accept physical currency or virtual assets — no AML/CTF program needed.<br>
          <strong>Option 2 (Limited):</strong> You accept cash/virtual assets but individual transactions never reach $10,000 — limited obligations.<br>
          <strong>Option 3 (Streamlined):</strong> Transactions can reach $10,000+ but only with individual customers (not entities) — streamlined CDD.<br>
          <strong>Option 4 (Full):</strong> $10,000+ transactions with entities (companies, trusts) or high-risk customers — full AML/CTF program.
        </div>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 26. PRECIOUS GOODS VALUATION RECORD ──────────────────────────────────
  renderValuationRecord() {
    const id = 'form-valuation';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Precious Goods Valuation Record</h3>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
          <strong>Why this matters:</strong> Accurate valuation is critical for determining whether a transaction reaches the $10,000 threshold. Undervaluing goods can be used to avoid triggering AML/CTF obligations. Document your valuation methodology for audit purposes.
        </div>
        ${this.disclaimer('Record valuation details and provenance for precious goods transactions. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Item Details')}
          ${this.field('Item Description', 'item_desc', 'textarea', { placeholder: 'e.g. 18ct yellow gold necklace with 1.2ct oval sapphire' })}
          ${this.field('Item Category', 'category', 'select', { options: ['Precious metal (gold, silver, platinum)', 'Precious stone (diamond, ruby, sapphire, emerald)', 'Precious metal product (jewellery)', 'Mixed (metal + stones)', 'Bullion / investment bar or coin', 'Scrap / melt value items', 'Other precious goods'] })}
          ${this.field('Weight / Carat', 'weight', 'text', { placeholder: 'e.g. 24g total, stone 1.2ct' })}
          ${this.field('Purity / Quality', 'quality', 'text', { placeholder: 'e.g. 18ct gold, VS1 clarity, E colour' })}

          ${this.sectionDivider('Valuation')}
          ${this.field('Valuation Method', 'method', 'select', { options: ['Market price (spot rate)', 'Independent appraisal / certificate', 'Retail replacement value', 'Insurance valuation', 'Scrap / melt value', 'Agreed sale price', 'Other'] })}
          ${this.field('Valuation Amount ($)', 'value', 'number')}
          ${this.field('Valuation Date', 'valuation_date', 'date')}
          ${this.field('Valued By', 'valued_by')}
          ${this.field('Independent Certificate Number (if any)', 'cert_number')}

          ${this.sectionDivider('Provenance & Origin')}
          ${this.field('Country of Origin (if known)', 'country_origin')}
          ${this.field('Supplier / Source', 'supplier', 'text', { placeholder: 'Name of supplier, estate, or source' })}
          ${this.field('Provenance Documentation Available?', 'provenance_docs', 'yesno')}
          ${this.field('Conflict-Free Declaration Obtained?', 'conflict_free', 'select', { options: ['Yes', 'No', 'N/A — not applicable to this item'] })}
          ${this.field('Hallmark / Stamp Verified?', 'hallmark', 'yesno')}

          ${this.sectionDivider('Transaction Context')}
          ${this.field('Transaction Type', 'transaction_type', 'select', { options: ['Sale to customer', 'Purchase from customer (buy-back)', 'Scrap purchase', 'Consignment', 'Trade-in / exchange', 'Other'] })}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('$10,000 Threshold Reached?', 'threshold_reached', 'yesno')}
          ${this.field('CDD Completed?', 'cdd_completed', 'yesnodate')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── 27. IMPORT/EXPORT DOCUMENTATION TRACKER ────────────────────────────
  renderImportExportTracker() {
    const id = 'form-import-export';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Import/Export Documentation Tracker</h3>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          <strong>AML/CTF relevance:</strong> International movement of precious goods creates additional ML/TF risk. Importing from or exporting to high-risk jurisdictions, unusual trade patterns, and inadequate documentation are all red flag indicators. Maintain records of all import/export activities.
        </div>
        ${this.disclaimer('Track import/export documentation for precious goods. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Shipment Details')}
          ${this.field('Direction', 'direction', 'select', { options: ['Import (into Australia)', 'Export (from Australia)'] })}
          ${this.field('Date', 'shipment_date', 'date')}
          ${this.field('Goods Description', 'goods_desc', 'textarea', { placeholder: 'Describe the precious goods being imported/exported' })}
          ${this.field('Total Declared Value ($AUD)', 'declared_value', 'number')}
          ${this.field('Weight / Quantity', 'weight', 'text', { placeholder: 'e.g. 500g gold, 50 loose diamonds' })}

          ${this.sectionDivider('Origin / Destination')}
          ${this.field('Country of Origin', 'country_origin')}
          ${this.field('Country of Destination', 'country_dest')}
          ${this.field('Is Origin/Destination a FATF High-Risk Jurisdiction?', 'fatf_risk', 'select', { options: ['No', 'Yes — FATF Grey List', 'Yes — FATF Black List'] })}
          ${this.field('Supplier / Buyer Name', 'counterparty')}
          ${this.field('Supplier / Buyer Country', 'counterparty_country')}

          ${this.sectionDivider('Documentation')}
          ${this.field('Customs Declaration Lodged?', 'customs_lodged', 'yesnodate')}
          ${this.field('Customs Declaration Number', 'customs_ref')}
          ${this.field('Certificate of Origin Obtained?', 'cert_origin', 'yesno')}
          ${this.field('Kimberley Process Certificate (if diamonds)?', 'kimberley', 'select', { options: ['Yes', 'No', 'N/A — not diamonds'] })}
          ${this.field('Insurance Documentation?', 'insurance', 'yesno')}
          ${this.field('IFTI Required?', 'ifti_required', 'yesno')}
          ${this.field('IFTI Filed?', 'ifti_filed', 'yesnodate')}

          ${this.sectionDivider('AML/CTF Assessment')}
          ${this.field('Any Red Flags Identified?', 'red_flags', 'yesno')}
          ${this.field('If Yes — Red Flags Described', 'red_flags_desc', 'textarea')}
          ${this.field('Escalated to Compliance Officer?', 'escalated', 'yesnodate')}
          ${this.field('Recorded By', 'recorded_by')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

};
