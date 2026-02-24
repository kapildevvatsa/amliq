// T2C — PDF Document Generator
// Lazy-loads jsPDF + html2canvas on demand, assembles AML/CTF program document from localStorage data.
// Depends on: subscription.js (canGeneratePDF check)

const PDFGenerator = {

  // ─── LAZY LOADING ───────────────────────────────────────────────────────────

  loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  },

  loadLibraries() {
    if (window.jspdf) return Promise.resolve();
    return Promise.all([
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js'),
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
    ]);
  },

  // ─── DATA COLLECTION ────────────────────────────────────────────────────────

  /**
   * Collect form data from localStorage by prefix.
   * @param {string} prefix - localStorage key prefix (e.g., 'forms_', 'amliq_acct_forms_')
   */
  collectFormData(prefix) {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        try {
          data[key.replace(prefix, '')] = JSON.parse(localStorage.getItem(key));
        } catch (_) {
          data[key.replace(prefix, '')] = localStorage.getItem(key);
        }
      }
    }
    return data;
  },

  collectRiskAssessment() {
    try {
      return JSON.parse(localStorage.getItem('riskAssessment') || 'null');
    } catch (_) {
      return null;
    }
  },

  collectChecklistProgress() {
    var progress = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith('check_')) {
        progress[key.replace('check_', '')] = localStorage.getItem(key) === '1';
      }
    }
    return progress;
  },

  /**
   * Detect entity type from the current page URL.
   */
  detectEntityType() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('accountant') !== -1) return 'accountants';
    if (path.indexOf('jeweller') !== -1) return 'jewellers';
    return 'real-estate';
  },

  getFormPrefix() {
    var entity = this.detectEntityType();
    if (entity === 'accountants') return 'amliq_acct_forms_';
    if (entity === 'jewellers') return 'amliq_jewel_forms_';
    return 'forms_';
  },

  getEntityLabel() {
    var entity = this.detectEntityType();
    if (entity === 'accountants') return 'Accountants & Tax Agents';
    if (entity === 'jewellers') return 'Jewellers & Precious Goods Dealers';
    return 'Real Estate Agents';
  },

  // ─── PDF GENERATION ─────────────────────────────────────────────────────────

  async generate() {
    // Access check
    if (typeof Subscription !== 'undefined' && !Subscription.canGeneratePDF()) {
      Subscription.renderLockedOverlay('program-builder');
      return;
    }

    // Track
    if (typeof Analytics !== 'undefined') {
      Analytics.track('PDF_Generated', { entity_type: this.detectEntityType() });
    }

    // Show loading state
    var btn = document.getElementById('generate-pdf-btn');
    var originalText = '';
    if (btn) {
      originalText = btn.textContent;
      btn.textContent = 'Loading PDF libraries...';
      btn.disabled = true;
    }

    try {
      await this.loadLibraries();

      if (btn) btn.textContent = 'Generating PDF...';

      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      var formData = this.collectFormData(this.getFormPrefix());
      var riskData = this.collectRiskAssessment();
      var checklistData = this.collectChecklistProgress();

      // Page dimensions
      var pageW = 210;
      var pageH = 297;
      var margin = 20;
      var contentW = pageW - margin * 2;
      var y = margin;

      // ─── COVER PAGE ─────────────────────────────────────────────────
      doc.setFillColor(30, 58, 95); // brand color
      doc.rect(0, 0, pageW, 80, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.text('AML/CTF Program', pageW / 2, 35, { align: 'center' });
      doc.setFontSize(14);
      doc.text(this.getEntityLabel(), pageW / 2, 48, { align: 'center' });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      y = 100;

      // Business details from form data (if available)
      var govData = formData['governance-form'] || formData['governance'] || {};
      var businessName = govData.businessName || govData.business_name || 'Your Business Name';
      var abn = govData.abn || govData.ABN || '';

      doc.setFontSize(14);
      doc.text('Business: ' + businessName, margin, y);
      y += 8;
      if (abn) {
        doc.text('ABN: ' + abn, margin, y);
        y += 8;
      }
      doc.text('Generated: ' + new Date().toLocaleDateString('en-AU'), margin, y);
      y += 8;
      doc.text('Entity Type: ' + this.getEntityLabel(), margin, y);
      y += 20;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Generated by T2C (tranche2compliance.com.au)', margin, y);
      y += 5;
      doc.text('This is an educational tool — not an official AUSTRAC document.', margin, y);
      y += 5;
      doc.text('This program should be reviewed by a qualified compliance professional.', margin, y);

      // ─── TABLE OF CONTENTS ──────────────────────────────────────────
      doc.addPage();
      y = margin;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.text('Table of Contents', margin, y);
      y += 12;

      var sections = [
        'Part A: ML/TF Risk Assessment',
        'Part B: Customer Due Diligence Procedures',
        'Part C: Reporting Obligations',
        'Part D: Record Keeping',
        'Part E: Staff Training Program',
        'Part F: Program Review Schedule',
        'Appendix: Governance Structure',
      ];

      doc.setFontSize(12);
      sections.forEach(function (title, i) {
        doc.text((i + 1) + '. ' + title, margin + 5, y);
        y += 8;
      });

      // ─── PART A: RISK ASSESSMENT ────────────────────────────────────
      doc.addPage();
      y = margin;
      this._addSectionHeader(doc, 'Part A: ML/TF Risk Assessment', y);
      y += 15;

      if (riskData && typeof riskData === 'object') {
        doc.setFontSize(10);
        var categories = ['customer', 'service', 'delivery', 'geographic'];
        categories.forEach(function (cat) {
          if (riskData[cat]) {
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text(cat.charAt(0).toUpperCase() + cat.slice(1) + ' Risk:', margin, y);
            y += 6;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);

            if (Array.isArray(riskData[cat])) {
              riskData[cat].forEach(function (item) {
                if (y > pageH - 30) { doc.addPage(); y = margin; }
                var text = typeof item === 'string' ? item : (item.text || item.question || JSON.stringify(item));
                var lines = doc.splitTextToSize('- ' + text, contentW);
                doc.text(lines, margin + 5, y);
                y += lines.length * 5 + 2;
              });
            } else {
              var text = JSON.stringify(riskData[cat], null, 2);
              var lines = doc.splitTextToSize(text, contentW);
              doc.text(lines, margin + 5, y);
              y += lines.length * 5 + 2;
            }
            y += 5;
          }
        });
      } else {
        doc.setFontSize(10);
        doc.text('Risk assessment data not yet completed.', margin, y);
      }

      // ─── PARTS B-F: Form Data ───────────────────────────────────────
      var formSections = [
        { title: 'Part B: Customer Due Diligence Procedures', keys: ['cdd', 'cdd-form', 'cdd-form-1', 'cdd-form-2'] },
        { title: 'Part C: Reporting Obligations', keys: ['reporting', 'reporting-form'] },
        { title: 'Part D: Record Keeping', keys: ['record-keeping', 'record-keeping-form'] },
        { title: 'Part E: Staff Training Program', keys: ['training', 'training-form'] },
        { title: 'Part F: Program Review Schedule', keys: ['program-review', 'review-form'] },
        { title: 'Appendix: Governance Structure', keys: ['governance', 'governance-form'] },
      ];

      formSections.forEach(function (section) {
        doc.addPage();
        y = margin;
        PDFGenerator._addSectionHeader(doc, section.title, y);
        y += 15;

        var hasData = false;
        section.keys.forEach(function (key) {
          var data = formData[key];
          if (data && typeof data === 'object') {
            hasData = true;
            doc.setFontSize(10);
            Object.entries(data).forEach(function (entry) {
              if (y > pageH - 30) { doc.addPage(); y = margin; }
              var label = entry[0].replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
              label = label.charAt(0).toUpperCase() + label.slice(1);
              var value = entry[1] || '(not provided)';

              doc.setFont(undefined, 'bold');
              doc.text(label + ':', margin, y);
              doc.setFont(undefined, 'normal');
              y += 5;

              var lines = doc.splitTextToSize(String(value), contentW - 5);
              doc.text(lines, margin + 5, y);
              y += lines.length * 5 + 3;
            });
          }
        });

        if (!hasData) {
          doc.setFontSize(10);
          doc.text('This section has not yet been completed.', margin, y);
        }
      });

      // ─── FOOTER ON ALL PAGES ────────────────────────────────────────
      var totalPages = doc.internal.getNumberOfPages();
      for (var i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          'Generated by T2C (tranche2compliance.com.au) — Not an official AUSTRAC document',
          pageW / 2,
          pageH - 10,
          { align: 'center' }
        );
        doc.text('Page ' + i + ' of ' + totalPages, pageW - margin, pageH - 10, { align: 'right' });
      }

      // ─── SAVE ───────────────────────────────────────────────────────
      var filename = 'AML-CTF-Program-' + businessName.replace(/[^a-zA-Z0-9]/g, '-') + '-' + new Date().toISOString().slice(0, 10) + '.pdf';
      doc.save(filename);

    } catch (err) {
      console.error('PDF generation error:', err);
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast('Error generating PDF. Please try again.');
      }
    } finally {
      if (btn) {
        btn.textContent = originalText || 'Generate AML/CTF Program PDF';
        btn.disabled = false;
      }
    }
  },

  _addSectionHeader(doc, title, y) {
    doc.setFillColor(30, 58, 95);
    doc.rect(20, y - 5, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(title, 25, y + 2);
    doc.setTextColor(0, 0, 0);
  },

  // ─── RENDER BUTTON ──────────────────────────────────────────────────────────

  /**
   * Returns HTML for the "Generate PDF" button. Insert into Program Builder section.
   */
  getButtonHTML() {
    return '<div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">'
      + '<h3 class="font-semibold text-blue-800 mb-2">Generate Your AML/CTF Program Document</h3>'
      + '<p class="text-sm text-blue-700 mb-3">'
      + 'Create a professional PDF document based on your completed forms, risk assessment, and program data. '
      + 'This document serves as your AML/CTF program for AUSTRAC compliance.'
      + '</p>'
      + '<button id="generate-pdf-btn" onclick="PDFGenerator.generate()" '
      + 'class="px-4 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-light">'
      + 'Generate AML/CTF Program PDF'
      + '</button>'
      + '<p class="text-xs text-blue-600 mt-2">'
      + 'Libraries (~550KB) load on first click only. Your data stays in your browser.'
      + '</p>'
      + '</div>';
  },
};
