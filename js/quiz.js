// AMLiq — Staff Knowledge Quiz

const Quiz = {

  STORAGE_KEY: 'quiz_state',
  current: 0,
  answers: {},
  finished: false,
  revealed: {},

  render() {
    this.loadState();
    if (this.finished) return this.renderSummary();
    return this.renderQuestion(this.current);
  },

  loadState() {
    try {
      const s = localStorage.getItem(this.STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        this.current = parsed.current || 0;
        this.answers = parsed.answers || {};
        this.finished = parsed.finished || false;
        this.revealed = parsed.revealed || {};
      }
    } catch (e) {
      this.reset();
    }
  },

  saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      current: this.current,
      answers: this.answers,
      finished: this.finished,
      revealed: this.revealed,
    }));
  },

  reset() {
    this.current = 0;
    this.answers = {};
    this.finished = false;
    this.revealed = {};
    this.saveState();
  },

  renderQuestion(index) {
    const q = AMLiqData.quiz[index];
    const total = AMLiqData.quiz.length;
    const pct = Math.round(((index) / total) * 100);

    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <!-- Progress -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm font-semibold text-slate-600">Question ${index + 1} of ${total}</div>
          <div class="text-sm text-slate-400">${pct}% complete</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2 mb-5">
          <div class="progress-bar bg-blue-500 h-2 rounded-full" style="width:${pct}%"></div>
        </div>

        <!-- Question -->
        <p class="text-base font-semibold text-slate-800 mb-4">${q.question}</p>

        <!-- Options -->
        <div id="quiz-options" class="space-y-2 mb-4">
          ${q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (this.revealed[index] !== undefined) {
              if (i === q.answer) cls += ' reveal-correct';
              else if (i === this.answers[index]) cls += ' incorrect';
            }
            return `
              <div class="${cls}" onclick="Quiz.selectAnswer(${index}, ${i})" id="quiz-opt-${i}">
                <div class="flex items-start gap-3">
                  <span class="font-bold text-slate-400 min-w-[20px]">${String.fromCharCode(65 + i)}.</span>
                  <span class="text-sm">${opt}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Explanation (shown after answering) -->
        ${this.revealed[index] !== undefined ? `
          <div class="p-3 rounded-lg text-sm mb-4 ${this.answers[index] === q.answer ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}">
            <strong>${this.answers[index] === q.answer ? '✓ Correct!' : '✗ Incorrect.'}</strong>
            <p class="mt-1">${q.explanation}</p>
          </div>
          <div class="flex justify-between">
            ${index > 0 ? `<button onclick="Quiz.goTo(${index - 1})" class="text-slate-500 hover:text-slate-700 text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300">← Previous</button>` : '<div></div>'}
            ${index < AMLiqData.quiz.length - 1
              ? `<button onclick="Quiz.goTo(${index + 1})" class="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">Next Question →</button>`
              : `<button onclick="Quiz.finish()" class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700">See Results →</button>`
            }
          </div>
        ` : `
          <p class="text-xs text-slate-400 text-center">Select an answer to continue</p>
          ${index > 0 ? `<div class="mt-2"><button onclick="Quiz.goTo(${index - 1})" class="text-slate-500 hover:text-slate-700 text-sm underline">← Previous question</button></div>` : ''}
        `}
      </div>
    `;
  },

  selectAnswer(questionIndex, optionIndex) {
    if (this.revealed[questionIndex] !== undefined) return; // Already answered

    this.answers[questionIndex] = optionIndex;
    this.revealed[questionIndex] = true;
    this.saveState();

    // Re-render question with feedback
    const container = document.getElementById('quiz-container');
    if (container) container.innerHTML = this.renderQuestion(questionIndex);
  },

  goTo(index) {
    this.current = index;
    this.saveState();
    const container = document.getElementById('quiz-container');
    if (container) container.innerHTML = this.renderQuestion(index);
  },

  finish() {
    this.finished = true;
    this.saveState();
    const container = document.getElementById('quiz-container');
    if (container) container.innerHTML = this.renderSummary();
  },

  renderSummary() {
    const total = AMLiqData.quiz.length;
    const answered = Object.keys(this.answers).length;
    const correct = AMLiqData.quiz.filter((q, i) => this.answers[i] === q.answer).length;
    const pct = answered > 0 ? Math.round((correct / total) * 100) : 0;

    let grade = '', gradeColor = '', msg = '';
    if (pct >= 90) { grade = 'Excellent!'; gradeColor = 'text-green-600'; msg = 'Outstanding understanding of AML/CTF obligations. Well done.'; }
    else if (pct >= 70) { grade = 'Good'; gradeColor = 'text-blue-600'; msg = 'Good understanding. Review the questions you missed and consider refreshing your knowledge.'; }
    else if (pct >= 50) { grade = 'Needs Improvement'; gradeColor = 'text-amber-600'; msg = 'Some gaps in knowledge identified. We recommend reviewing the relevant sections and retaking the quiz.'; }
    else { grade = 'Requires Further Training'; gradeColor = 'text-red-600'; msg = 'Significant gaps identified. Please review the obligations sections and complete further AML/CTF training before proceeding.'; }

    return `
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <div class="text-lg font-bold text-slate-700 mb-1">Quiz Complete</div>
          <div class="text-5xl font-black ${gradeColor} my-3">${pct}%</div>
          <div class="font-bold text-lg ${gradeColor} mb-2">${grade}</div>
          <div class="text-sm text-slate-600 mb-4">${correct} out of ${total} questions correct. ${msg}</div>
          <div class="flex justify-center gap-3">
            <button onclick="Quiz.reset(); document.getElementById('quiz-container').innerHTML = Quiz.render();"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Retake Quiz</button>
            <button onclick="window.print()" class="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300">Print Results</button>
          </div>
        </div>

        <!-- Review all questions -->
        <div class="space-y-3">
          <h3 class="font-bold text-slate-700">Review All Questions</h3>
          ${AMLiqData.quiz.map((q, i) => {
            const userAnswer = this.answers[i];
            const isCorrect = userAnswer === q.answer;
            return `
              <div class="bg-white rounded-xl border ${isCorrect ? 'border-green-200' : 'border-red-200'} p-4">
                <div class="flex items-start gap-2 mb-2">
                  <span class="${isCorrect ? 'text-green-600' : 'text-red-600'} font-bold flex-shrink-0">${isCorrect ? '✓' : '✗'}</span>
                  <p class="text-sm font-semibold text-slate-800">${i + 1}. ${q.question}</p>
                </div>
                ${userAnswer !== undefined ? `
                  <div class="text-xs text-slate-500 mb-1">Your answer: <span class="${isCorrect ? 'text-green-700' : 'text-red-700'} font-medium">${q.options[userAnswer]}</span></div>
                  ${!isCorrect ? `<div class="text-xs text-slate-500 mb-1">Correct answer: <span class="text-green-700 font-medium">${q.options[q.answer]}</span></div>` : ''}
                ` : '<div class="text-xs text-slate-400">Not answered</div>'}
                <div class="text-xs text-slate-500 mt-2 bg-slate-50 rounded p-2">${q.explanation}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },
};
