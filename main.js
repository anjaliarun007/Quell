/* main.js — UI controller and interaction orchestration */

(function() {
  'use strict';

  // Elements
  const input      = document.getElementById('emailInput');
  const charCount  = document.getElementById('charCount');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const clearBtn   = document.getElementById('clearBtn');
  const placeholder    = document.getElementById('placeholder');
  const resultsContent = document.getElementById('resultsContent');
  const ringFill       = document.getElementById('ringFill');
  const ringScore      = document.getElementById('ringScore');
  const scoreRing      = document.getElementById('scoreRing');
  const verdictBlock   = document.getElementById('verdictBlock');
  const verdictTag     = document.getElementById('verdictTag');
  const verdictDesc    = document.getElementById('verdictDesc');
  const categories     = document.getElementById('categories');
  const flagsList      = document.getElementById('flagsList');
  const suggestionsList= document.getElementById('suggestionsList');
  const aiBtn          = document.getElementById('aiBtn');
  const aiContent      = document.getElementById('aiContent');
  const flagsSection   = document.getElementById('flagsSection');
  const suggestionsSection = document.getElementById('suggestionsSection');

  let lastResults = null;

  // ---- Char counter ----
  input.addEventListener('input', () => {
    charCount.textContent = input.value.length.toLocaleString();
  });

  // ---- Clear ----
  clearBtn.addEventListener('click', () => {
    input.value = '';
    charCount.textContent = '0';
    placeholder.classList.remove('hidden');
    resultsContent.classList.add('hidden');
    lastResults = null;
    aiContent.innerHTML = `<button class="btn-ai" id="aiBtn">
      <span class="ai-btn-icon">✦</span>
      GET AI ANALYSIS
    </button>`;
    rebindAiBtn();
    input.focus();
  });

  // ---- Analyze ----
  analyzeBtn.addEventListener('click', runAnalysis);
  input.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') runAnalysis();
    if (e.metaKey && e.key === 'Enter') runAnalysis();
  });

  function runAnalysis() {
    const text = input.value.trim();
    if (!text) {
      shakeEl(analyzeBtn);
      return;
    }

    window._lastEmail = text;
    const results = SpamAnalyzer.analyze(text);
    lastResults = results;

    // Reset AI
    aiContent.innerHTML = `<button class="btn-ai" id="aiBtn">
      <span class="ai-btn-icon">✦</span>
      GET AI ANALYSIS
    </button>`;
    rebindAiBtn();

    renderResults(results);
  }

  function renderResults(r) {
    // Show content, hide placeholder
    placeholder.classList.add('hidden');
    resultsContent.classList.remove('hidden');

    // ---- Score ring animation ----
    const circumference = 314;
    const offset = circumference - (r.score / 100) * circumference;

    // Set color class
    scoreRing.className = 'score-ring';
    verdictBlock.className = 'verdict-block';
    const cls = 'verdict-' + r.verdict;
    scoreRing.classList.add(cls);
    verdictBlock.classList.add(cls);

    ringFill.style.stroke = ''; // reset inline
    ringScore.textContent = '0';
    verdictTag.textContent = r.verdictLabel;
    verdictDesc.textContent = r.verdictDesc;

    // Animate score counter
    animateCount(ringScore, 0, r.score, 1200);

    // Animate ring fill after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ringFill.style.strokeDashoffset = offset;
      });
    });

    // ---- Categories ----
    renderCategories(r.categories);

    // ---- Flagged phrases ----
    renderFlags(r.flaggedPhrases);

    // ---- Suggestions ----
    renderSuggestions(r.suggestions);
  }

  function renderCategories(cats) {
    // Clear existing rows (keep header)
    const header = categories.querySelector('.cat-header');
    categories.innerHTML = '';
    categories.appendChild(header);

    const catOrder = ['urgency', 'shady', 'overpromise', 'money', 'unnatural'];
    const maxMatches = Math.max(...catOrder.map(k => cats[k]?.matches || 0), 1);

    catOrder.forEach((key, i) => {
      const cat = cats[key];
      if (!cat) return;

      const barColor = cat.matches === 0 ? 'green' :
                       cat.matches <= 2  ? 'orange' : 'red';
      const fillPct  = cat.matches === 0 ? 0 :
                       Math.max(10, (cat.matches / (maxMatches * 1.5)) * 100);

      const row = document.createElement('div');
      row.className = 'cat-row';
      row.style.animationDelay = `${i * 0.07}s`;
      row.innerHTML = `
        <span class="cat-row-icon">${cat.icon}</span>
        <span class="cat-row-name">${cat.label.toUpperCase()}</span>
        <div class="cat-bar-track">
          <div class="cat-bar-fill ${barColor}" data-fill="${fillPct}" style="width:0"></div>
        </div>
        <span class="cat-count">${cat.matches}</span>
      `;
      categories.appendChild(row);

      // Animate bar
      setTimeout(() => {
        row.querySelector('.cat-bar-fill').style.width = fillPct + '%';
      }, 100 + i * 60);
    });
  }

  function renderFlags(phrases) {
    flagsList.innerHTML = '';
    if (phrases.length === 0) {
      flagsList.innerHTML = '<span style="font-family:var(--font-mono);font-size:12px;color:var(--text-3)">No spam phrases detected ✓</span>';
      return;
    }
    phrases.slice(0, 30).forEach((item, i) => {
      const chip = document.createElement('span');
      chip.className = `flag-chip ${item.category}`;
      chip.textContent = item.phrase;
      chip.title = `Category: ${item.category}`;
      chip.style.animationDelay = `${i * 0.03}s`;
      flagsList.appendChild(chip);
    });
  }

  function renderSuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    suggestions.forEach((s, i) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.style.animationDelay = `${i * 0.08}s`;
      item.innerHTML = `
        <span class="suggestion-bullet">${s.icon}</span>
        <span class="suggestion-text">${s.text}</span>
      `;
      suggestionsList.appendChild(item);
    });
  }

  // ---- AI Analysis ----
  function rebindAiBtn() {
    const btn = document.getElementById('aiBtn');
    if (btn) btn.addEventListener('click', runAIAnalysis);
  }
  rebindAiBtn();

  async function runAIAnalysis() {
    const text = input.value.trim();
    if (!text || !lastResults) {
      shakeEl(aiContent);
      return;
    }

    // Loading state
    aiContent.innerHTML = `
      <div class="ai-loading">
        <span>Quell is reviewing your email</span>
        <span class="ai-dots">
          <span></span><span></span><span></span>
        </span>
      </div>
    `;

    try {
      const html = await AIAnalysis.analyze(text, lastResults);
      aiContent.innerHTML = `<div class="ai-response">${html}</div>`;
    } catch (err) {
      aiContent.innerHTML = `
        <div class="ai-response" style="border-color:var(--red);color:var(--red)">
          Could not connect to AI. Please try again — or check your network connection.
        </div>
      `;
      console.error('AI error:', err);
    }
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Helpers ----
  function animateCount(el, from, to, duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(from + (to - from) * ease);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function shakeEl(el) {
    el.style.animation = 'none';
    el.getBoundingClientRect();
    el.style.animation = 'shake 0.4s ease';
    el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  }

  // Add shake keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  // ---- Scroll-triggered animations for how section ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cat-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ${i * 0.08}s ease, transform 0.6s ${i * 0.08}s cubic-bezier(.16,1,.3,1)`;
    observer.observe(card);
  });

})();