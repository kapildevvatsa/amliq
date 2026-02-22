// AMLiq — Export / Import Module

const Export = {

  exportAll() {
    const data = {
      exportDate: new Date().toISOString(),
      appVersion: 'AMLiq v2.0',
      notice: 'This file contains AML/CTF program data from AMLiq. All data was stored locally in the browser. This is not an official AUSTRAC document.',
      checklists: {},
      forms: {},
      riskAssessment: null,
      quizState: null,
    };

    // Checklists
    Object.keys(AMLiqData.checklists).forEach(k => {
      data.checklists[k] = {};
      AMLiqData.checklists[k].forEach(item => {
        data.checklists[k][item.id] = localStorage.getItem('check_' + item.id) === '1';
      });
    });

    // Forms
    const formKeys = Object.keys(localStorage).filter(k => k.startsWith('forms_'));
    formKeys.forEach(k => {
      try {
        data.forms[k] = JSON.parse(localStorage.getItem(k));
      } catch (e) {
        data.forms[k] = localStorage.getItem(k);
      }
    });

    // Risk assessment
    try {
      data.riskAssessment = JSON.parse(localStorage.getItem('riskAssessment') || 'null');
    } catch (e) {}

    // Quiz state
    try {
      data.quizState = JSON.parse(localStorage.getItem('quiz_state') || 'null');
    } catch (e) {}

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amliq-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('All data exported successfully!');
  },

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        let count = 0;

        // Restore checklists
        if (data.checklists) {
          Object.values(data.checklists).forEach(items => {
            Object.entries(items).forEach(([id, checked]) => {
              if (checked) {
                localStorage.setItem('check_' + id, '1');
                count++;
              } else {
                localStorage.removeItem('check_' + id);
              }
            });
          });
        }

        // Restore forms
        if (data.forms) {
          Object.entries(data.forms).forEach(([key, val]) => {
            localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
            count++;
          });
        }

        // Restore risk assessment
        if (data.riskAssessment) {
          localStorage.setItem('riskAssessment', JSON.stringify(data.riskAssessment));
          count++;
        }

        // Restore quiz
        if (data.quizState) {
          localStorage.setItem('quiz_state', JSON.stringify(data.quizState));
          count++;
        }

        App.showToast(`Data imported successfully! ${count} items restored.`);
        App.updateAllProgress();

        // Reload checklist progress if visible
        const pb = document.getElementById('program-overall-bar');
        if (pb) Checklist.updateProgress();

      } catch (err) {
        App.showToast('Import failed. Please check the file format.');
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);

    // Reset the input
    event.target.value = '';
  },

  clearAllData() {
    if (!confirm('Are you sure you want to clear ALL saved data? This cannot be undone. Export your data first if you want to keep a backup.')) return;
    // Clear only AMLiq-related keys
    const keysToRemove = Object.keys(localStorage).filter(k =>
      k.startsWith('check_') || k.startsWith('forms_') || k === 'riskAssessment' || k === 'quiz_state'
    );
    keysToRemove.forEach(k => localStorage.removeItem(k));
    App.showToast(`Cleared ${keysToRemove.length} items from local storage.`);
    App.updateAllProgress();
    if (document.getElementById('program-overall-bar')) Checklist.updateProgress();
  },
};
