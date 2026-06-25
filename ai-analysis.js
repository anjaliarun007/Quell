/* ai-analysis.js — Quell local deep analysis */

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

  function overallAssessment(results) {
    const score = results.score;
    if (score < 15) {
      return '**🎯 Overall Assessment** This email is very clean and should be inbox-safe. It avoids obvious spam triggers and reads like a natural message to a real recipient.';
    }
    if (score < 40) {
      return `**🎯 Overall Assessment** This email has a mild spam risk with a score of ${score}/100. A few flagged phrases may still trigger filters, but the structure is mostly okay.`;
    }
    return `**🎯 Overall Assessment** This email shows a strong spam profile with a score of ${score}/100. Several risky terms and patterns are present, so a rewrite is recommended before sending.`;
  }

  function keyRisks(emailText, results) {
    const parts = [];
    const topCats = getTopCategories(results).filter(cat => cat.matches > 0);
    if (topCats.length) {
      const labels = topCats.map(cat => cat.label).join(', ');
      parts.push(`**⚠️ Key Risks** The strongest issues are in ${labels}. ${topCats.map(cat => `${cat.label} has ${cat.matches} flagged phrase${cat.matches === 1 ? '' : 's'}`).join('; ')}.`);
    }

    const exclamations = (emailText.match(/!/g) || []).length;
    if (exclamations > 2) {
      parts.push(`Excessive exclamation marks (${exclamations}) make the email look urgent and promotional.`);
    }

    const capsRatio = (emailText.match(/[A-Z]/g) || []).length / (emailText.length || 1);
    if (capsRatio > 0.25) {
      parts.push(`Too much text in ALL CAPS is a strong spam signal.`);
    }

    if (!parts.length) {
      return '**⚠️ Key Risks** No major spam signals were detected in the main categories. Keep the tone clear and avoid generic promotional wording.';
    }

    return parts.join(' ');
  }

  function rewriteTips(emailText, results) {
    const tips = [];
    if (results.categories.urgency?.matches > 0) {
      tips.push('Avoid urgent sales language like “Act now” or “Limited time”. Use calm scheduling language instead.');
    }
    if (results.categories.shady?.matches > 0) {
      tips.push('Remove vague or scammy terms such as “Dear friend” or “wire transfer”. Be specific and transparent.');
    }
    if (results.categories.overpromise?.matches > 0) {
      tips.push('Tone down exaggerated claims like “guaranteed results”. Share real benefits without overpromising.');
    }
    if (results.categories.money?.matches > 0) {
      tips.push('If you mention money, put it in context and avoid dollar signs or promises of quick cash.');
    }
    if (results.categories.unnatural?.matches > 0) {
      tips.push('Make the email sound human: remove boilerplate phrases and write as if to one person.');
    }
    if (tips.length === 0) {
      tips.push('Your content is generally good. Keep the subject line relevant and avoid link-heavy or overly promotional wording.');
    }

    return `**✍️ Rewrite Tips** ${tips.slice(0, 3).join(' ')}`;
  }

  function whatsWorking(results) {
    if (results.score < 40) {
      return '**✅ What’s Working** The email structure is largely fine and does not rely on aggressive spam triggers. Keep the message concise and personal.';
    }
    return '';
  }

  function getTopCategories(results) {
    return Object.values(results.categories)
      .slice()
      .sort((a, b) => b.matches - a.matches)
      .filter(cat => cat.matches > 0)
      .slice(0, 2);
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