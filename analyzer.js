/* analyzer.js — Spam scoring engine */

window.SpamAnalyzer = (function() {

  function analyze(text) {
    const lower = text.toLowerCase();
    const results = {
      score: 0,
      maxScore: 0,
      categories: {},
      flaggedPhrases: [],
      totalMatches: 0,
    };

    const cats = window.SPAM_DATA;
    const seen = new Set();

    for (const [catKey, cat] of Object.entries(cats)) {
      let catMatches = [];

      for (const phrase of cat.patterns) {
        if (lower.includes(phrase) && !seen.has(phrase)) {
          seen.add(phrase);
          catMatches.push(phrase);
          results.flaggedPhrases.push({ phrase, category: catKey });
        }
      }

      const catScore = catMatches.length * cat.weight;
      results.categories[catKey] = {
        label: cat.label,
        icon: cat.icon,
        matches: catMatches.length,
        score: catScore,
        weight: cat.weight,
      };
      results.score += catScore;
      results.totalMatches += catMatches.length;
    }

    // Length penalty — very short emails with any flag are suspicious
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    if (wordCount < 20 && results.totalMatches > 0) {
      results.score *= 1.3;
    }

    // ALL CAPS penalty
    const capsRatio = (text.match(/[A-Z]/g) || []).length / (text.length || 1);
    if (capsRatio > 0.3) results.score += 8;

    // Excessive punctuation
    const exclamations = (text.match(/!/g) || []).length;
    if (exclamations > 3) results.score += exclamations * 0.8;

    // Clamp to 100
    results.score = Math.min(100, Math.round(results.score));

    // Verdict
    if (results.score < 15) {
      results.verdict = 'safe';
      results.verdictLabel = 'INBOX SAFE';
      results.verdictDesc = 'Low spam risk. This email should land in the inbox.';
    } else if (results.score < 40) {
      results.verdict = 'warning';
      results.verdictLabel = 'CAUTION';
      results.verdictDesc = 'Moderate risk. Some filters might catch this. Review flagged phrases.';
    } else {
      results.verdict = 'danger';
      results.verdictLabel = 'HIGH RISK';
      results.verdictDesc = 'Very likely to be flagged as spam. Significant rewrites recommended.';
    }

    // Suggestions
    results.suggestions = buildSuggestions(results);

    return results;
  }

  function buildSuggestions(results) {
    const suggestions = [];

    if (results.categories.urgency?.matches > 0) {
      suggestions.push({
        icon: '🚨',
        text: '<strong>Replace urgency phrases</strong> — swap "Act now" → "Available through [date]", or "Don\'t miss out" → "Here\'s what\'s available".',
      });
    }
    if (results.categories.shady?.matches > 0) {
      suggestions.push({
        icon: '🔞',
        text: '<strong>Remove suspicious language</strong> — phrases like "Dear friend" or "wire transfer" instantly signal scam templates. Use specific names and clear context.',
      });
    }
    if (results.categories.overpromise?.matches > 0) {
      suggestions.push({
        icon: '🤩',
        text: '<strong>Soften exaggerated claims</strong> — instead of "guaranteed results", say "based on our results with similar clients". Specificity beats hyperbole.',
      });
    }
    if (results.categories.money?.matches > 0) {
      suggestions.push({
        icon: '💰',
        text: '<strong>Contextualise financial language</strong> — wrap dollar amounts in context ("our plan starts at $29/mo" not "earn $$$"). Avoid standalone money words.',
      });
    }
    if (results.categories.unnatural?.matches > 0) {
      suggestions.push({
        icon: '💬',
        text: '<strong>Write more naturally</strong> — remove "Click here", "Please read", and boilerplate salutations. Write as if to a specific person you know.',
      });
    }

    const text = window._lastEmail || '';
    const exclamations = (text.match(/!/g) || []).length;
    if (exclamations > 2) {
      suggestions.push({
        icon: '❗',
        text: `<strong>Reduce exclamation marks</strong> — you have ${exclamations} in this email. Use at most 1–2. They dramatically increase spam scores.`,
      });
    }

    const capsRatio = (text.match(/[A-Z]/g) || []).length / (text.length || 1);
    if (capsRatio > 0.25) {
      suggestions.push({
        icon: '🔡',
        text: '<strong>Avoid ALL CAPS</strong> — excessive capital letters are a primary spam trigger. Use sentence case throughout.',
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        icon: '✅',
        text: '<strong>Looking clean!</strong> No major issues detected. For extra safety, ensure your domain has SPF, DKIM, and DMARC configured.',
      });
    }

    return suggestions;
  }

  return { analyze };
})();