export const getToolIcon = (toolKey: string): string => {
  const iconMap: Record<string, string> = {
    // Finance
    sip: 'chart-line',
    fd: 'bank',
    emi: 'calculator',
    tax: 'file-percent',
    investment: 'trending-up',
    mortgage: 'home-city',
    'unit-price': 'tag-outline',
    percentage: 'percent',
    'percentage-change': 'chart-bell-curve',
    'split-bill': 'account-group',
    tip: 'hand-coin',
    currency: 'currency-usd',
    discount: 'sale',
    'loan-eligibility': 'account-check',
    retirement: 'palm-tree',
    'emi-foreclosure': 'close-circle-outline',
    'emi-date-reminder': 'calendar-clock',
    'loan-prepayment': 'cash-plus',
    'gst-reverse': 'receipt',
    'salary-tax-split': 'wallet-membership',
    'emi-interest-split': 'chart-pie',

    // Health
    bmi: 'human-measure',
    calorie: 'fire',
    bmr: 'speedometer',
    'water-intake': 'water',
    bac: 'glass-wine',
    'ideal-weight': 'scale-bathroom',

    // Conversion
    area: 'layers-outline',
    length: 'ruler',
    weight: 'weight',
    temperature: 'thermometer',
    bases: 'numeric',

    // Math & Science
    scientific: 'function-variant',
    quadratic: 'variable',
    prime: 'square-root',
    roman: 'format-text',
    'scientific-notation': 'exponent',
    'binary-decimal-hex': 'code-braces',
    base64: 'fountain-pen-tip',
    palindrome: 'reflect-horizontal',
    gpa: 'school',
    speed: 'run-fast',
    'lcm-hcf': 'math-compass',
    'number-to-words': 'numeric-1-box-outline',
    cagr: 'chart-areaspline',

    // Date & Time
    'date-diff': 'calendar-range',
    'date-add-sub': 'calendar-plus',
    age: 'cake-variant',
    'age-on-date': 'calendar-account',
    'leap-year': 'calendar-star',
    countdown: 'timer-outline',
    'world-clock': 'world-clock',
    'time-zone': 'map-marker-distance',
    'day-of-week': 'calendar-question',

    // Text & Utility
    qr: 'qrcode',
    barcode: 'barcode-scan',
    password: 'lock-reset',
    'password-strength': 'shield-check',
    'random-number': 'dice-6',
    'text-case': 'format-letter-case',
    'text-counter': 'counter',
    'tts-stt': 'microphone',
    invoice: 'file-document-outline',
    history: 'history',
    notification: 'bell-ring',

    // Fun
    dice: 'dice-multiple',
    'coin-toss': 'circle-double',
    'spin-wheel': 'whistle',
    'rock-paper-scissors': 'hand-back-right',
    'card-picker': 'cards',
    lottery: 'ticket-percent',
    'magic-8-ball': 'sphere',
    'truth-dare': 'comment-question',
    'memory-game': 'brain',
    'number-guess': 'head-question',
    'love-calc': 'heart-multiple',
    zodiac: 'zodiac-leo'
  };

  return iconMap[toolKey] || 'tools';
};
