// AMLiq — Forms Module
// All CDD forms, governance forms, and template forms

const Forms = {

  STORAGE_KEY: 'forms_',

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

  // ─── CDD INDIVIDUAL ───────────────────────────────────────────────────────
  renderCDDIndividual() {
    const id = 'form-cdd-individual';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Individual Customer</h3>
          <span class="tag bg-blue-100 text-blue-700">Template Form</span>
        </div>
        ${this.disclaimer('This form is for guidance purposes only. It helps you record the information collected during CDD. All data is stored locally in your browser and is never transmitted. Print or export for your records.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer Identity')}
          ${this.field('Customer Full Legal Name', 'full_name')}
          ${this.field('Date of Birth', 'dob', 'date')}
          ${this.field('Residential Address (not PO Box)', 'address', 'text', { placeholder: 'Full residential address' })}
          ${this.field('Acting on their own behalf?', 'own_behalf', 'yesno')}
          ${this.field('If No — Principal name', 'principal_name')}
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose', 'text', { placeholder: 'e.g. Purchase of residential property' })}

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
          ${this.field('Source of Funds Description', 'source_funds', 'text', { placeholder: 'e.g. Sale of previous property, savings account' })}

          ${this.sectionDivider('Assessment')}
          ${this.field('Customer Risk Rating', 'risk_rating', 'risk')}
          ${this.field('EDD Required?', 'edd_required', 'yesno')}
          ${this.field('EDD Reason (if applicable)', 'edd_reason', 'text', { placeholder: 'e.g. Foreign customer, complex structure' })}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes / Additional Information', 'notes', 'textarea')}
        </form>
        <div class="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
          <strong>Acceptable primary photographic ID:</strong> Australian passport, driver's licence, proof-of-age card.<br>
          <strong>Primary non-photographic ID:</strong> Birth certificate, citizenship certificate.<br>
          <strong>Secondary ID:</strong> Medicare card, utilities bill (within 3 months), bank statement.<br>
          <em>At least ONE primary document is required. If no primary photographic ID, use one primary non-photographic + one secondary.</em>
        </div>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── CDD COMPANY ──────────────────────────────────────────────────────────
  renderCDDCompany() {
    const id = 'form-cdd-company';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Company Customer</h3>
          <span class="tag bg-blue-100 text-blue-700">Template Form</span>
        </div>
        ${this.disclaimer('Record the information collected when conducting CDD on a company customer. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Company Details')}
          ${this.field('Company Name', 'company_name')}
          ${this.field('ACN', 'acn')}
          ${this.field('ABN', 'abn')}
          ${this.field('Registered Address', 'reg_address')}
          ${this.field('ASIC Registration Verified?', 'asic_verified', 'yesnodate')}
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose')}

          ${this.sectionDivider('Beneficial Owners (25%+ ownership or control)')}
          ${this.field('Beneficial Owner 1 — Full Name', 'bo1_name')}
          ${this.field('Beneficial Owner 1 — Ownership %', 'bo1_pct', 'number')}
          ${this.field('Beneficial Owner 1 — ID Verified?', 'bo1_id_verified', 'yesno')}
          ${this.field('Beneficial Owner 2 — Full Name', 'bo2_name')}
          ${this.field('Beneficial Owner 2 — Ownership %', 'bo2_pct', 'number')}
          ${this.field('Beneficial Owner 2 — ID Verified?', 'bo2_id_verified', 'yesno')}
          ${this.field('Beneficial Owner 3 — Full Name', 'bo3_name')}
          ${this.field('Beneficial Owner 3 — Ownership %', 'bo3_pct', 'number')}
          ${this.field('Beneficial Owner 3 — ID Verified?', 'bo3_id_verified', 'yesno')}

          ${this.sectionDivider('Authorised Representative')}
          ${this.field('Authorised Representative Name', 'auth_rep_name')}
          ${this.field('Authority Documented?', 'authority_documented', 'yesno')}
          ${this.field('Authority Document Type', 'authority_type', 'select', { options: ['Board Resolution', 'Letter of Authority', 'Power of Attorney', 'Other'] })}

          ${this.sectionDivider('Screening')}
          ${this.field('PEP/TFS Screening for all BOs completed?', 'pep_tfs_screening', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds', 'source_funds', 'text', { placeholder: 'e.g. Business revenue, property sale' })}

          ${this.sectionDivider('Assessment')}
          ${this.field('Customer Risk Rating', 'risk_rating', 'risk')}
          ${this.field('EDD Required?', 'edd_required', 'yesno')}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── CDD TRUST ────────────────────────────────────────────────────────────
  renderCDDTrust() {
    const id = 'form-cdd-trust';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">Initial CDD — Trust Customer</h3>
          <span class="tag bg-red-100 text-red-700">High Risk Entity</span>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-800">
          <strong>AUSTRAC risk note:</strong> Trusts are rated as a <strong>high national money laundering risk</strong> due to poor transparency. EDD is automatically flagged for trust customers. All beneficial owners must be identified including settlors, appointors, and protectors.
        </div>
        ${this.disclaimer('Record all CDD information for trust customers. Trusts require identification of all parties with ownership or control. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Trust Details')}
          ${this.field('Trust Name', 'trust_name')}
          ${this.field('Trust Type', 'trust_type', 'select', { options: ['Discretionary (Family) Trust', 'Unit Trust', 'Testamentary Trust', 'Hybrid Trust', 'Fixed Trust', 'Other'] })}
          ${this.field('ABN (if registered)', 'abn')}
          ${this.field('Trust Deed Sighted?', 'deed_sighted', 'yesnodate')}
          ${this.field('Country of Establishment', 'country', 'select', { options: ['Australia', 'Other — specify in notes'] })}
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose')}

          ${this.sectionDivider('Trustee(s)')}
          ${this.field('Trustee 1 — Name', 'trustee1_name')}
          ${this.field('Trustee 1 — Type', 'trustee1_type', 'select', { options: ['Individual', 'Corporate (company)'] })}
          ${this.field('Trustee 1 — ID / ASIC Verified?', 'trustee1_verified', 'yesno')}
          ${this.field('Corporate Trustee — Beneficial Owners Identified?', 'corp_trustee_bos', 'yesno')}
          ${this.field('Trustee 2 — Name (if applicable)', 'trustee2_name')}
          ${this.field('Trustee 2 — ID Verified?', 'trustee2_verified', 'yesno')}

          ${this.sectionDivider('Settlor')}
          ${this.field('Settlor Name', 'settlor_name')}
          ${this.field('Settlor Identity Verified?', 'settlor_verified', 'yesno')}

          ${this.sectionDivider('Appointor / Guardian / Protector')}
          ${this.field('Appointor Name', 'appointor_name')}
          ${this.field('Appointor Identity Verified?', 'appointor_verified', 'yesno')}
          ${this.field('Guardian/Protector Name (if applicable)', 'guardian_name')}
          ${this.field('Guardian/Protector Verified?', 'guardian_verified', 'yesno')}

          ${this.sectionDivider('Beneficiaries')}
          ${this.field('Beneficiaries Identified?', 'beneficiaries_identified', 'select', { options: ['Yes — individually named', 'Yes — by class only', 'Not individually identifiable'] })}
          ${this.field('Beneficiary Names or Class Description', 'beneficiaries_desc', 'textarea', { placeholder: 'e.g. All children of [Name]; or John Smith, Jane Smith' })}

          ${this.sectionDivider('Person Acting on Behalf of Trust')}
          ${this.field('Representative Name', 'rep_name')}
          ${this.field('Authority Documented?', 'rep_authority', 'yesno')}
          ${this.field('Authority Document Type', 'rep_authority_type', 'select', { options: ['Trust Deed authority', 'Board resolution', 'Power of Attorney', 'Other'] })}

          ${this.sectionDivider('Screening & Assessment')}
          ${this.field('PEP/TFS Screening for all individuals?', 'pep_tfs', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}
          ${this.field('Source of Funds', 'source_funds', 'text', { placeholder: 'e.g. Investment income, property sale proceeds' })}
          ${this.field('Risk Rating', 'risk_rating', 'select', { options: ['Medium', 'High', 'Very High'] })}
          ${this.field('EDD Required?', 'edd_required', 'select', { options: ['Yes — EDD mandatory for trusts', 'Yes — additional risk factors present'] })}
          ${this.field('CDD Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── CDD PARTNERSHIP ──────────────────────────────────────────────────────
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
          ${this.field('Nature/Purpose of Transaction', 'transaction_purpose')}

          ${this.sectionDivider('Partners')}
          ${this.field('Partner 1 — Name', 'partner1_name')}
          ${this.field('Partner 1 — Type', 'partner1_type', 'select', { options: ['Individual', 'Entity'] })}
          ${this.field('Partner 1 — ID Verified?', 'partner1_verified', 'yesno')}
          ${this.field('Partner 2 — Name', 'partner2_name')}
          ${this.field('Partner 2 — Type', 'partner2_type', 'select', { options: ['Individual', 'Entity'] })}
          ${this.field('Partner 2 — ID Verified?', 'partner2_verified', 'yesno')}
          ${this.field('Partner 3 — Name (if applicable)', 'partner3_name')}
          ${this.field('Partner 3 — ID Verified?', 'partner3_verified', 'yesno')}

          ${this.sectionDivider('Authorised Representative')}
          ${this.field('Authorised Representative Name', 'auth_rep')}
          ${this.field('Authority Documented?', 'authority_doc', 'yesno')}

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

  // ─── CDD FOREIGN ──────────────────────────────────────────────────────────
  renderCDDForeign() {
    const id = 'form-cdd-foreign';
    const highRisk = [...AMLiqData.fatfHighRisk.blacklist, ...AMLiqData.fatfHighRisk.greylist].sort();
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800">CDD — Foreign Customer Supplement</h3>
          <span class="tag bg-amber-100 text-amber-700">Enhanced Risk</span>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          Use this form in addition to the relevant customer type CDD form (Individual, Company, Trust). Enhanced due diligence is likely required for foreign customers.
        </div>
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer / Transaction Reference')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref', 'text', { placeholder: 'e.g. CDD-IND-2026-001' })}

          ${this.sectionDivider('Foreign Jurisdiction Details')}
          ${this.field('Country of Residence / Incorporation', 'country_of_origin')}
          ${this.field('Is this a FATF High-Risk Jurisdiction?', 'fatf_risk', 'select', { options: ['No — standard risk', 'Yes — FATF Grey List', 'Yes — FATF Black List (High Risk)'] })}
          ${this.field('Source of Overseas Funds', 'overseas_funds', 'text', { placeholder: 'e.g. Sale of property in Singapore, business income in UK' })}
          ${this.field('Reason for Investing in Australian Property', 'reason_australia', 'text', { placeholder: 'e.g. Emigrating to Australia, investment portfolio' })}

          ${this.sectionDivider('Foreign Identity Documents')}
          ${this.field('Foreign ID Document Type', 'foreign_doc_type', 'text', { placeholder: 'e.g. US Passport, UK Driver\'s Licence' })}
          ${this.field('Certified Translation Required?', 'translation_required', 'yesno')}
          ${this.field('Certified Translation Obtained?', 'translation_obtained', 'yesno')}

          ${this.sectionDivider('Enhanced Due Diligence')}
          ${this.field('Enhanced Due Diligence Applied?', 'edd_applied', 'yesno')}
          ${this.field('EDD Measures Taken', 'edd_measures', 'textarea', { placeholder: 'Describe additional verification steps, documents obtained, source of wealth verification, etc.' })}
          ${this.field('Senior Management Approval?', 'senior_approval', 'yesnodate')}
          ${this.field('Approved By (Name + Title)', 'approved_by')}

          ${this.sectionDivider('Assessment')}
          ${this.field('Risk Rating', 'risk_rating', 'risk')}
          ${this.field('Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>

        <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div class="text-xs font-bold text-slate-600 mb-2">FATF HIGH-RISK JURISDICTIONS (February 2026 reference)</div>
          <div class="mb-2">
            <div class="text-xs font-semibold text-red-700 mb-1">Black List (High Risk):</div>
            <div class="text-xs text-slate-600">${AMLiqData.fatfHighRisk.blacklist.join(' · ')}</div>
          </div>
          <div>
            <div class="text-xs font-semibold text-amber-700 mb-1">Grey List (Increased Monitoring):</div>
            <div class="text-xs text-slate-600">${AMLiqData.fatfHighRisk.greylist.join(' · ')}</div>
          </div>
          <div class="text-xs text-slate-400 mt-2">Always check the current FATF list at <a href="https://www.fatf-gafi.org" target="_blank" class="underline">fatf-gafi.org</a>.</div>
        </div>

        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── EDD ─────────────────────────────────────────────────────────────────
  renderEDD() {
    const id = 'form-edd';
    const triggers = [
      'High-risk customer type (trust, complex corporate, PEP)',
      'High-risk jurisdiction (customer or funds from FATF grey/blacklisted country)',
      'Unusual transaction pattern (significantly above/below market value, rapid buy-sell)',
      'Non-face-to-face / entirely remote transaction',
      'Unclear source of funds',
      'Third-party payment (funds from unrelated party)',
      'One or more red flag indicators present',
      'Other (describe in notes)',
    ];
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Enhanced Due Diligence (EDD) Record</h3>
        <div class="austrac-callout mb-4 text-sm">
          <strong class="text-blue-800">When EDD is required:</strong> Apply EDD when ML/TF/PF risk is assessed as high, including for PEPs, high-risk jurisdictions, complex structures, unclear source of funds, or any present red flags.
        </div>
        ${this.disclaimer('Record EDD measures applied. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer Reference')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}

          ${this.sectionDivider('EDD Triggers (select all that apply)')}
          <div class="col-span-2 space-y-2">
            ${triggers.map((t, i) => `
              <div class="flex items-center gap-2">
                <input type="checkbox" id="edd-trigger-${i}" name="trigger_${i}" class="h-4 w-4 rounded border-slate-300 text-blue-600">
                <label for="edd-trigger-${i}" class="text-sm text-slate-700 cursor-pointer">${t}</label>
              </div>
            `).join('')}
          </div>

          ${this.sectionDivider('EDD Measures Taken')}
          ${this.field('Additional Source-of-Funds Information Obtained', 'sof_info', 'textarea', { placeholder: 'Describe additional information provided by customer or obtained independently' })}
          ${this.field('Additional Documents Collected', 'additional_docs', 'textarea', { placeholder: 'List documents obtained beyond standard CDD' })}
          ${this.field('Senior Management Approval Obtained?', 'senior_approval', 'yesnodate')}
          ${this.field('Approved By (Name + Title)', 'approved_by')}
          ${this.field('Ongoing Monitoring Frequency', 'monitoring_freq', 'select', { options: ['Per transaction', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually'] })}
          ${this.field('Rationale for Proceeding', 'rationale', 'textarea', { placeholder: 'Document your reasons for proceeding with this customer/transaction despite elevated risk' })}

          ${this.sectionDivider('Completion')}
          ${this.field('Completed By', 'completed_by')}
          ${this.field('Date Completed', 'date_completed', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── PEP SCREENING ────────────────────────────────────────────────────────
  renderPEPScreening() {
    const id = 'form-pep-screening';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">PEP/TFS Screening Record</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div class="font-bold text-blue-800 mb-2 text-sm">What is a PEP?</div>
            <p class="text-xs text-blue-700">A Politically Exposed Person holds or has held a prominent public position — heads of state, ministers, senior officials, senior military, judiciary, state enterprise executives — domestically or internationally. Family members and close associates are also PEPs.</p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div class="font-bold text-amber-800 mb-2 text-sm">What is TFS?</div>
            <p class="text-xs text-amber-700">Targeted Financial Sanctions are imposed under Australian law against specific persons/entities. It is illegal to provide services to a sanctioned person. Always check the <a href="https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list" target="_blank" class="underline">DFAT Consolidated List</a>.</p>
          </div>
        </div>

        ${this.disclaimer('Record PEP and TFS screening for every customer. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Customer Details')}
          ${this.field('Customer Name', 'customer_name')}
          ${this.field('CDD Form Reference', 'cdd_ref')}

          ${this.sectionDivider('PEP Assessment')}
          ${this.field('PEP Self-Declaration Obtained?', 'pep_declaration', 'yesno')}
          ${this.field('Is Customer a PEP?', 'is_pep', 'select', { options: ['No', 'Yes', 'Uncertain — requires further investigation'] })}
          ${this.field('PEP Type (if applicable)', 'pep_type', 'select', { options: ['N/A', 'Domestic PEP', 'Foreign PEP', 'International Organisation PEP', 'Family member/close associate of PEP'] })}
          ${this.field('Relationship to PEP (if associate/family)', 'pep_relationship', 'text', { placeholder: 'e.g. Spouse of [Name], Minister of Finance' })}

          ${this.sectionDivider('Sanctions Screening')}
          ${this.field('DFAT Consolidated List Checked?', 'dfat_checked', 'yesnodate')}
          ${this.field('Sanctions Match Found?', 'sanctions_match', 'yesno')}

          ${this.sectionDivider('Action Taken')}
          ${this.field('Action Taken', 'action_taken', 'select', { options: ['No action required (no PEP or sanctions match)', 'EDD applied (PEP identified)', 'Service declined (sanctions match)', 'Seeking legal advice', 'Refer to compliance officer'] })}
          ${this.field('EDD Reference (if EDD applied)', 'edd_ref')}
          ${this.field('Notes', 'notes', 'textarea')}
          ${this.field('Screened By', 'screened_by')}
          ${this.field('Date', 'date_screened', 'date')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── COMPLIANCE OFFICER FORM ──────────────────────────────────────────────
  renderComplianceOfficerForm() {
    const id = 'form-compliance-officer';
    return `
      <div class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Eligibility requirements:</strong> The compliance officer must be: (1) a fit and proper person, (2) employed/engaged at management level, (3) an Australian resident if the business has a permanent Australian establishment. External compliance officers are permitted.
        </div>
        ${this.disclaimer('Record the compliance officer appointment for your records. Data stored locally only. Print for your records and AUSTRAC notification.')}
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-4">Compliance Officer Appointment Form</h3>
          <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${this.sectionDivider('Appointee Details')}
            ${this.field('Full Name', 'full_name')}
            ${this.field('Position/Title', 'position')}
            ${this.field('Is this person at management level?', 'management_level', 'yesno')}
            ${this.field('Is this person an Australian resident?', 'aus_resident', 'yesno')}
            ${this.field('External compliance officer?', 'is_external', 'yesno')}
            ${this.field('External firm name (if applicable)', 'external_firm')}

            ${this.sectionDivider('Due Diligence Conducted')}
            ${this.field('Open-source / media search', 'dd_oss', 'yesnodate')}
            ${this.field('Credit check', 'dd_credit', 'yesnodate')}
            ${this.field('Reference check', 'dd_reference', 'yesnodate')}
            ${this.field('Police / criminal history check', 'dd_police', 'yesnodate')}
            ${this.field('Identity verification', 'dd_identity', 'yesnodate')}

            ${this.sectionDivider('Appointment')}
            ${this.field('Date of Appointment', 'date_appointed', 'date')}
            ${this.field('AUSTRAC Notified?', 'austrac_notified', 'yesnodate')}
            ${this.field('Approved By (Senior Management)', 'approved_by')}
            ${this.field('Approver Title', 'approver_title')}
            ${this.field('Notes', 'notes', 'textarea')}
          </form>
          <div class="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
            ⚠️ Remember: You must notify AUSTRAC of the compliance officer appointment within <strong>14 days</strong> via AUSTRAC Online.
          </div>
          ${this.formButtons(id)}
        </div>
      </div>
    `;
  },

  // ─── ROLES FORM ───────────────────────────────────────────────────────────
  renderRolesForm() {
    const id = 'form-roles';
    const roles = [
      { key: 'co', role: 'AML/CTF Compliance Officer', resp: 'Oversee day-to-day compliance, report to governing body annually, communicate with AUSTRAC' },
      { key: 'cdd', role: 'CDD Lead', resp: 'Conduct or supervise customer identification and verification' },
      { key: 'escalation', role: 'Suspicious Activity Escalation Point', resp: 'Receive and assess internal escalations, decide on SMR filing' },
      { key: 'training', role: 'Training Coordinator', resp: 'Plan and deliver AML/CTF training, maintain training records' },
      { key: 'records', role: 'Record Keeper', resp: 'Maintain AML/CTF records, ensure 7-year retention' },
      { key: 'senior', role: 'Senior Management Approver', resp: 'Approve AML/CTF program, receive annual compliance reports' },
    ];
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-3">AML/CTF Roles Assignment</h3>
        <p class="text-sm text-slate-500 mb-4">In small agencies, one person may fill multiple roles. The same name can appear in multiple fields.</p>
        ${this.disclaimer('Document who is responsible for each AML/CTF function. Data stored locally only.')}
        <form id="${id}" class="space-y-3 mt-3">
          ${roles.map(r => `
            <div class="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div class="font-semibold text-slate-800 text-sm mb-1">${r.role}</div>
              <div class="text-xs text-slate-500 mb-2">${r.resp}</div>
              <div class="form-field">
                <label>Assigned To</label>
                <input type="text" name="${r.key}_assigned" placeholder="Full name of person assigned">
              </div>
            </div>
          `).join('')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── PERSONNEL DUE DILIGENCE ──────────────────────────────────────────────
  renderPersonnelDDForm() {
    const id = 'form-personnel-dd';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Personnel Due Diligence Record</h3>
        <div class="text-sm text-slate-600 mb-4">
          Due diligence is required for employees, contractors, consultants, and service provider personnel performing AML/CTF-relevant roles including CDD, compliance, operations, IT (compliance systems), and customer-facing roles.
        </div>
        ${this.disclaimer('Record due diligence conducted on staff in AML/CTF roles. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Staff Member')}
          ${this.field('Full Name', 'full_name')}
          ${this.field('Role', 'role', 'select', { options: ['Compliance Officer', 'CDD Lead', 'Sales Agent / Buyer\'s Agent', 'Escalation Point', 'Training Coordinator', 'Record Keeper', 'Senior Management', 'IT (AML systems)', 'Other AML/CTF function'] })}
          ${this.field('Employment Type', 'employment_type', 'select', { options: ['Employee (full-time)', 'Employee (part-time)', 'Contractor', 'Consultant', 'Volunteer', 'Service provider personnel'] })}
          ${this.field('Role Risk Level', 'role_risk', 'select', { options: ['Low', 'Medium', 'High (e.g., Compliance Officer, CDD Lead)'] })}

          ${this.sectionDivider('Due Diligence Measures')}
          ${this.field('Identity Verified?', 'dd_identity', 'yesnodate')}
          ${this.field('Open-source/Media Search?', 'dd_oss', 'yesnodate')}
          ${this.field('Reference Check?', 'dd_reference', 'yesnodate')}
          ${this.field('Credit Check?', 'dd_credit', 'yesnodate')}
          ${this.field('Police/Criminal History Check?', 'dd_police', 'yesnodate')}

          ${this.sectionDivider('Training')}
          ${this.field('Initial AML/CTF Training Completed?', 'training_initial', 'yesnodate')}
          ${this.field('Most Recent Refresher Training?', 'training_refresher', 'yesnodate')}
          ${this.field('Next Review Due', 'next_review', 'date')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── TRAINING PLAN ────────────────────────────────────────────────────────
  renderTrainingPlan() {
    const id = 'form-training-plan';
    return `
      <div class="space-y-4">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Training requirements:</strong> Initial training before 1 July 2026 (or before new hires perform designated services). Annual refresher training minimum. Ad-hoc training when policies change or new risks emerge.
        </div>
        ${Checklist.renderSection('training', 'Training Program Checklist')}
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-bold text-slate-800 mb-4">Training Plan Builder</h3>
          <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${this.sectionDivider('Training Session')}
            ${this.field('Training Module', 'module', 'select', { options: ['Module 1: ML/TF/PF Overview', 'Module 2: Legal Obligations', 'Module 3: Your AML/CTF Program', 'Module 4: Customer Due Diligence', 'Module 5: Beneficial Ownership', 'Module 6: PEP & Sanctions Screening', 'Module 7: Red Flags & Suspicious Activity', 'Module 8: Reporting Obligations', 'Module 9: Tipping-Off Prohibition', 'Module 10: Record Keeping', 'Module 11: Ongoing CDD & Monitoring', 'Module 12: Program Review'] })}
            ${this.field('Target Audience', 'audience', 'select', { options: ['All Staff', 'Customer-facing staff only', 'Compliance Officer', 'Management', 'Admin staff', 'New hire'] })}
            ${this.field('Delivery Method', 'delivery', 'select', { options: ['In-person workshop', 'Online (self-paced)', 'Webinar', 'External provider', 'Reading material'] })}
            ${this.field('Scheduled Date', 'scheduled_date', 'date')}
            ${this.field('Duration', 'duration', 'text', { placeholder: 'e.g. 1 hour, 30 minutes' })}
            ${this.field('Trainer / Provider', 'trainer')}
            ${this.field('Status', 'status', 'select', { options: ['Not started', 'Scheduled', 'Completed'] })}
            ${this.field('Notes', 'notes', 'textarea')}
          </form>
          ${this.formButtons(id)}
        </div>
      </div>
    `;
  },

  // ─── ATTENDANCE RECORD ────────────────────────────────────────────────────
  renderAttendanceRecord() {
    const id = 'form-attendance';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Training Attendance Record</h3>
        ${this.disclaimer('Record individual attendance at each training session. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Session Details')}
          ${this.field('Training Module', 'module', 'select', { options: ['Module 1: ML/TF/PF Overview', 'Module 2: Legal Obligations', 'Module 3: Your AML/CTF Program', 'Module 4: Customer Due Diligence', 'Module 5: Beneficial Ownership', 'Module 6: PEP & Sanctions', 'Module 7: Red Flags', 'Module 8: Reporting', 'Module 9: Tipping-Off', 'Module 10: Record Keeping', 'Module 11: Ongoing CDD', 'Module 12: Program Review'] })}
          ${this.field('Date Delivered', 'date_delivered', 'date')}
          ${this.field('Trainer / Provider', 'trainer')}

          ${this.sectionDivider('Attendee')}
          ${this.field('Attendee Full Name', 'attendee_name')}
          ${this.field('Role', 'role', 'select', { options: ['Sales Agent', "Buyer's Agent", 'Compliance Officer', 'Administration', 'Management', 'Other'] })}
          ${this.field('Completed Training?', 'completed', 'yesno')}
          ${this.field('Quiz Score (if assessed)', 'quiz_score', 'number')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },

  // ─── CHANGE LOG ───────────────────────────────────────────────────────────
  renderChangeLog() {
    const id = 'form-change-log';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Program Change Log</h3>
        <p class="text-sm text-slate-600 mb-4">Maintain a running record of all changes to the AML/CTF program. Add a new entry each time the program is reviewed and updated.</p>
        ${this.disclaimer('Record all changes to your AML/CTF program. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Change Entry')}
          ${this.field('Date of Change', 'date_of_change', 'date')}
          ${this.field('Review Trigger', 'trigger', 'select', { options: ['Scheduled periodic review', 'Changes to designated services', 'Changes to customer types', 'Changes to countries/jurisdictions', 'Internal incident or control failure', 'Regulatory/legislative update', 'New/emerging ML/TF/PF risks', 'AUSTRAC communication or alert', 'Adverse evaluation findings', 'Significant business change', 'Other'] })}
          ${this.field('What Was Reviewed', 'what_reviewed', 'textarea', { placeholder: 'e.g. Risk assessment, CDD procedures, training materials' })}
          ${this.field('What Was Changed', 'what_changed', 'textarea', { placeholder: 'Describe any changes made to the program' })}
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

  // ─── EVALUATION PLAN ─────────────────────────────────────────────────────
  renderEvaluationPlan() {
    const id = 'form-evaluation';
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="font-bold text-slate-800 mb-4">Independent Evaluation Planning Form</h3>
        ${this.disclaimer('Plan and record your independent evaluation. Data stored locally only.')}
        <form id="${id}" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          ${this.sectionDivider('Evaluation Planning')}
          ${this.field('First Evaluation Due By', 'due_date', 'date')}
          ${this.field('Evaluator Type', 'evaluator_type', 'select', { options: ['External compliance consultant', 'Internal audit function (independent)', 'Industry body service', 'Other'] })}
          ${this.field('Evaluator Name / Firm', 'evaluator_name')}
          ${this.field('Confirmed Independent of Program?', 'confirmed_independent', 'yesno')}
          ${this.field('Scope Agreed', 'scope', 'textarea', { placeholder: 'Describe what the evaluation will cover' })}
          ${this.field('Estimated Cost', 'cost', 'text', { placeholder: 'e.g. $5,000' })}

          ${this.sectionDivider('Evaluation Status')}
          ${this.field('Status', 'status', 'select', { options: ['Not started', 'Planning in progress', 'Evaluator engaged', 'In progress', 'Completed'] })}
          ${this.field('Evaluation Date', 'evaluation_date', 'date')}
          ${this.field('Findings Summary', 'findings', 'textarea', { placeholder: 'Summarise key findings from the evaluation' })}
          ${this.field('Adverse Findings?', 'adverse_findings', 'yesno')}
          ${this.field('Remediation Actions', 'remediation', 'textarea', { placeholder: 'Describe steps taken to address adverse findings' })}
          ${this.field('Remediation Completed?', 'remediation_completed', 'yesnodate')}
          ${this.field('Notes', 'notes', 'textarea')}
        </form>
        ${this.formButtons(id)}
      </div>
    `;
  },
};
