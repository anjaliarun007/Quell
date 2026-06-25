# Quell

Quell is a sleek browser-based email spam analysis tool built to help writers remove spammy language and improve inbox deliverability. Paste your email content and get an instant breakdown of risky phrases, a spam score, and focused rewrite guidance — all with no data sent to servers.

## 🚀 Description

Quell combines fast client-side spam detection with an intelligent deep-review assistant to make your emails inbox-safe. It scans for urgency, shady wording, overpromises, money signals, and unnatural phrasing, then surfaces clear recommendations so you can refine your message before you hit send.

## ✨ Features

- Instant spam scoring for email content
- 5 risk categories analyzed: urgency, shady, overpromise, money, unnatural
- Flagged phrase list with category detail
- Context-aware suggestions for safer wording
- AI-style deep analysis summary generated locally
- Fully browser-side with no email data sent to external servers
- Clean neon dark UI with animated result panels

## 🛠️ Tech Stack

- HTML5 for structure
- CSS3 for styling and animated UI
- Vanilla JavaScript for analysis and interaction
- Local rule-based spam scanner in `analyzer.js`
- Deep analysis assistant in `ai-analysis.js`
- UI orchestration and event handling in `main.js`

## 🤖 Special AI Mention

Quell includes a local deep-review assistant that mimics an AI-style email consult. It uses the existing spam scan results and text characteristics to generate a concise, human-friendly analysis without relying on an external AI API.

## 🔧 Example AI Analysis Code

```js
// ai-analysis.js — Quell local deep analysis
window.AIAnalysis = (function() {
  function analyze(emailText, spamResults) {
    const text = [
      overallAssessment(spamResults),
      keyRisks(emailText, spamResults),
      rewriteTips(emailText, spamResults),
      whatsWorking(spamResults)
    ]
      .filter(Boolean)
      .join('\n\n');

    return Promise.resolve(formatAIResponse(text));
  }

  function formatAIResponse(text) {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  return { analyze };
})();
```

## 📁 Files

- `index.html` — Page layout and UI structure
- `style.css` — Theme, animations, and responsive design
- `main.js` — User interaction and rendering logic
- `analyzer.js` — Spam scoring engine and suggestions
- `ai-analysis.js` — Deep review summary generator
- `spam-data.js` — Phrase and category data used by the spam scanner

## 💡 Usage

Open `index.html` in your browser, paste an email into the input, click **ANALYZE EMAIL**, then use **GET AI ANALYSIS** for a deeper review.
