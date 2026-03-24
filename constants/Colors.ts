export const LightTheme = {
  background: '#F8FAFC',
  primary: '#0A1F44',
  accent: '#4A90D9',
  text: '#0A1F44',
  textMuted: '#7A9BB5',
  cardBg: '#FFFFFF',
  border: '#D8E4F0',
  white: '#FFFFFF',

  tools: {
    basic: { screen: '#F2F2F7', num: '#FFFFFF', fn: '#D4D4D4', op: '#D4D4D4', eq: '#0D1B2A', display: '#0D1B2A', btn: '#D4D4D4' },
    scientific: { screen: '#FFFFFF', num: '#FFFFFF', fn: '#E0EAFF', op: '#0077FF', eq: '#0D1B2A', display: '#0077FF', btn: '#0077FF' },
    currency: { screen: '#F0FFF5', num: '#FFFFFF', fn: '#C8F0D0', op: '#00C853', eq: '#0D1B2A', display: '#00C853', btn: '#00C853' },
    emi: { screen: '#FFF8F0', num: '#FFFFFF', fn: '#FFE0B2', op: '#FF8F00', eq: '#0D1B2A', display: '#FF8F00', btn: '#FF8F00' },
    gst: { screen: '#FFFFFF', num: '#FFFFFF', fn: '#FFE0CC', op: '#FF6B00', eq: '#0D1B2A', display: '#FF6B00', btn: '#FF6B00' },
    interest: { screen: '#FFFBE8', num: '#FFFFFF', fn: '#FFF0B3', op: '#FFB300', eq: '#0D1B2A', display: '#C8860A', btn: '#FFB300' },
    age: { screen: '#FFF0F5', num: '#FFFFFF', fn: '#FFD6E8', op: '#FF6B9D', eq: '#0D1B2A', display: '#FF6B9D', btn: '#FF6B9D' },
    split: { screen: '#F5EEFF', num: '#FFFFFF', fn: '#E8D5FF', op: '#7C4DFF', eq: '#0D1B2A', display: '#7C4DFF', btn: '#7C4DFF' },
    unit: { screen: '#E8F6FF', num: '#FFFFFF', fn: '#C8E8F8', op: '#00BCD4', eq: '#0D1B2A', display: '#0097A7', btn: '#00BCD4' },
    discount: { screen: '#FFE8E8', num: '#FFFFFF', fn: '#FFD0D0', op: '#FF1744', eq: '#0D1B2A', display: '#FF1744', btn: '#FF1744' },
    bases: { screen: '#EDE8FF', num: '#FFFFFF', fn: '#D8CCFF', op: '#6200EA', eq: '#FFFFFF', display: '#6200EA', btn: '#6200EA' },
    shapes: { screen: '#E8FFF8', num: '#FFFFFF', fn: '#C8F0E8', op: '#00897B', eq: '#0D1B2A', display: '#00695C', btn: '#00897B' },
  }
};

export const DarkTheme = {
  background: '#0F172A', // Slate 900
  primary: '#F8FAFC',    // Off White / Light text
  accent: '#38BDF8',    // Lighter Cyan-blue
  text: '#F8FAFC', 
  textMuted: '#94A3B8', // Slate 400
  cardBg: '#1E293B',    // Slate 800
  border: '#334155',    // Slate 700
  white: '#FFFFFF',

  tools: {
    basic: { screen: '#1C1C1E', num: '#3A3A3C', fn: '#252525', op: '#252525', eq: '#FFD60A', display: '#FFFFFF', btn: '#252525' },
    scientific: { screen: '#1C1C1E', num: '#3A3A3C', fn: '#1E3A5F', op: '#0077FF', eq: '#FFD60A', display: '#4FC3F7', btn: '#0077FF' },
    currency: { screen: '#0D2010', num: '#1E3828', fn: '#162A1E', op: '#00C853', eq: '#FFD60A', display: '#00E676', btn: '#00C853' },
    emi: { screen: '#1C1400', num: '#2A1E00', fn: '#221800', op: '#FF8F00', eq: '#FFD60A', display: '#FFB300', btn: '#FF8F00' },
    gst: { screen: '#1C0D00', num: '#2A1500', fn: '#221000', op: '#FF6B00', eq: '#FFD60A', display: '#FF8C42', btn: '#FF6B00' },
    interest: { screen: '#1C1600', num: '#2A2000', fn: '#221A00', op: '#FFB300', eq: '#FFD60A', display: '#FFD54F', btn: '#FFB300' },
    age: { screen: '#1C0010', num: '#280018', fn: '#200010', op: '#FF6B9D', eq: '#FFD60A', display: '#FF8FB3', btn: '#FF6B9D' },
    split: { screen: '#0D0020', num: '#1A0038', fn: '#140030', op: '#7C4DFF', eq: '#FFD60A', display: '#B39DFF', btn: '#7C4DFF' },
    unit: { screen: '#001820', num: '#002028', fn: '#001820', op: '#00BCD4', eq: '#FFD60A', display: '#4DD0E1', btn: '#00BCD4' },
    discount: { screen: '#1C0000', num: '#280000', fn: '#200000', op: '#FF1744', eq: '#FFD60A', display: '#FF5252', btn: '#FF1744' },
    bases: { screen: '#0D0020', num: '#1A0038', fn: '#140030', op: '#6200EA', eq: '#FFFFFF', display: '#CE93D8', btn: '#6200EA' },
    shapes: { screen: '#001810', num: '#002018', fn: '#001810', op: '#00897B', eq: '#FFD60A', display: '#4DB6AC', btn: '#00897B' },
  }
};

// Legacy fallback
export const Colors = LightTheme;
