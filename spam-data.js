/* spam-data.js — Curated spam trigger phrase database */

window.SPAM_DATA = {

  urgency: {
    label: 'Urgency',
    icon: '🚨',
    weight: 2,
    patterns: [
      'act now', 'act immediately', 'apply now', 'call now', 'buy now',
      'click now', 'do it today', 'don\'t delay', 'don\'t hesitate',
      'don\'t miss', 'don\'t wait', 'exclusive deal', 'expires soon',
      'final notice', 'hurry', 'immediately', 'instant', 'last chance',
      'limited time', 'limited offer', 'now or never', 'offer expires',
      'once in a lifetime', 'only today', 'order now', 'please respond',
      'respond asap', 'respond immediately', 'reply asap', 'rush',
      'time limited', 'time sensitive', 'today only', 'urgent',
      'while supplies last', 'while stocks last', 'asap', 'right away',
      'act fast', 'don\'t delete', 'important notice', 'don\'t ignore',
      'attention required', 'action required', 'deadline',
    ]
  },

  shady: {
    label: 'Shady',
    icon: '🔞',
    weight: 3,
    patterns: [
      'dear friend', 'dear valued', 'dear beneficiary', 'dear winner',
      'secret', 'hidden', 'loophole', 'confidential', 'private',
      'no questions asked', 'not monitored', 'offshore accounts',
      'foreign account', 'wire transfer', 'bank transfer', 'western union',
      'nigerian', 'lottery winner', 'unclaimed funds', 'inheritance',
      'beneficiary', 'next of kin', 'winning notification',
      'anonymous', 'undisclosed recipients', 'bcc only',
      'delete before forwarding', 'not spam', 'this is not spam',
      'not a scam', 'this isn\'t spam', 'legal', 'legal notice',
      'avoid bankruptcy', 'avoid foreclosure', 'additional income',
      'double your money', 'get paid', 'make money fast', 'easy money',
      'increase your income', 'work from home', 'work at home',
      'be your own boss', 'earn extra cash', 'earn money',
      'financial freedom', 'passive income', 'residual income',
    ]
  },

  overpromise: {
    label: 'Overpromise',
    icon: '🤩',
    weight: 2.5,
    patterns: [
      'guaranteed', 'guarantee', '100% free', '100% guaranteed',
      'absolutely free', 'amazing', 'as seen on', 'bargain',
      'believe it or not', 'best price', 'billion', 'cash bonus',
      'certified', 'chance', 'cheap', 'claims', 'congratulations',
      'dear lucky', 'discount', 'drastically reduced', 'eliminate',
      'exceptional', 'exclusive', 'extra income', 'free access',
      'free consultation', 'free gift', 'free hosting', 'free info',
      'free investment', 'free leads', 'free membership', 'free money',
      'free offer', 'free preview', 'free trial', 'free website',
      'full refund', 'get it now', 'great offer', 'great deal',
      'incredible deal', 'jackpot', 'lifetime', 'lowest price',
      'mega', 'miracle', 'money back', 'once in a lifetime',
      'pennies a day', 'potential earnings', 'prize', 'profit',
      'promise you', 'pure profit', 'risk free', 'satisfaction guaranteed',
      'save big money', 'save up to', 'special promotion', 'success',
      'the best rates', 'thousand dollars', 'you are a winner',
      'you have been chosen', 'you have been selected', 'you won',
      'zero risk',
    ]
  },

  money: {
    label: 'Money',
    icon: '💰',
    weight: 2,
    patterns: [
      '$$$', '£££', 'billing', 'bonus', 'buy direct', 'buy online',
      'cancel anytime', 'cash', 'cash out', 'casino', 'cents on the dollar',
      'check', 'claim now', 'compare rates', 'consolidate debt',
      'credit card', 'credit cards accepted', 'debt', 'dig up dirt',
      'direct email', 'direct marketing', 'earn per week', 'extra cash',
      'fast cash', 'financial', 'foreclosure', 'free money', 'income',
      'increase sales', 'insurance', 'investment', 'invoice',
      'loan', 'lower your mortgage', 'lowest rate', 'luxury car',
      'make money', 'million dollars', 'money making', 'mortgage',
      'no credit check', 'no fees', 'no hidden costs', 'no interest',
      'payment', 'penny stocks', 'pre-approved', 'price',
      'refinance', 'serious cash', 'stock alert', 'stock pick',
      'take action now', 'thousands of dollars', 'vacation',
      'win money', 'winning', 'won',
    ]
  },

  unnatural: {
    label: 'Unnatural',
    icon: '💬',
    weight: 1.5,
    patterns: [
      'as seen on tv', 'attention', 'auto email removal',
      'clearance', 'click below', 'click here', 'collect your prize',
      'come on', 'compared to', 'content you may have not expected',
      'copy accurately', 'dearest', 'dear me', 'dear madam',
      'dear sir or madam', 'do you have debt problems',
      'email extractor', 'email harvest', 'email marketing',
      'for free', 'for instant access', 'forward to a friend',
      'friend', 'get out of debt', 'gift certificate',
      'giving away', 'great', 'greetings of the day',
      'hello friend', 'if you no longer wish to receive',
      'in accordance with laws', 'increase your', 'internet marketing',
      'it\'s effective', 'mass email', 'message contains', 'million',
      'multi level marketing', 'network', 'new customer',
      'new domain extensions', 'nigerian', 'not spam',
      'obligation', 'offer', 'oh my goodness', 'only',
      'open', 'opt in', 'opt out', 'per day',
      'performance', 'please be informed', 'please open',
      'please read', 'promotion', 'remove me',
      'removes wrinkles', 'reverses aging', 'satisfaction',
      'see for yourself', 'sent in compliance', 'stop',
      'subject to credit', 'supplies are limited',
      'terms and conditions', 'this is not a joke',
      'this won\'t last', 'time to call', 'undisclosed',
      'unsubscribe', 'visit our website', 'will not believe',
      'you are not alone', 'you have been selected',
    ]
  }
};