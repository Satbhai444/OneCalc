export const LightTheme = {
  background: '#F8F9FA',
  primary: '#AB3500', // OneCalc Brand Orange
  secondary: '#7726E0', // Deep Purple
  accent: '#FF6B35', // Vibrant Orange
  text: '#191C1D',
  textMuted: '#596062',
  cardBg: '#FFFFFF',
  border: '#E1E3E4',
  surface: '#FFFFFF',
  white: '#FFFFFF',

  tools: {
    basic: { screen: '#F8F9FA', num: '#FFFFFF', fn: '#EDEEEF', op: '#E1E3E4', eq: '#AB3500', display: '#191C1D', btn: '#EDEEEF' },
    scientific: { screen: '#FFFFFF', num: '#FFFFFF', fn: '#E1EFFE', op: '#005AC2', eq: '#AB3500', display: '#005AC2', btn: '#E1EFFE' },
    currency: { screen: '#F0FFF5', num: '#FFFFFF', fn: '#D1FAE5', op: '#00A86B', eq: '#AB3500', display: '#00A86B', btn: '#D1FAE5' },
    emi: { screen: '#FFF8F0', num: '#FFFFFF', fn: '#FFEDD5', op: '#FF6B35', eq: '#AB3500', display: '#FF6B35', btn: '#FFEDD5' },
    gst: { screen: '#FFFFFF', num: '#FFFFFF', fn: '#FFEDD5', op: '#AB3500', eq: '#191C1D', display: '#AB3500', btn: '#FFEDD5' },
    interest: { screen: '#FFFBF0', num: '#FFFFFF', fn: '#FEF3C7', op: '#D97706', eq: '#AB3500', display: '#B45309', btn: '#FEF3C7' },
    age: { screen: '#FFF5F7', num: '#FFFFFF', fn: '#FCE7F3', op: '#DB2777', eq: '#AB3500', display: '#BE185D', btn: '#FCE7F3' },
    split: { screen: '#F5F3FF', num: '#FFFFFF', fn: '#EDE9FE', op: '#7C3AED', eq: '#AB3500', display: '#6D28D9', btn: '#EDE9FE' },
    unit: { screen: '#F0F9FF', num: '#FFFFFF', fn: '#E0F2FE', op: '#0284C7', eq: '#AB3500', display: '#0369A1', btn: '#E0F2FE' },
    discount: { screen: '#FEF2F2', num: '#FFFFFF', fn: '#FEE2E2', op: '#EF4444', eq: '#AB3500', display: '#B91C1C', btn: '#FEE2E2' },
    bases: { screen: '#F5F3FF', num: '#FFFFFF', fn: '#EDE9FE', op: '#7C3AED', eq: '#FFFFFF', display: '#6D28D9', btn: '#7C3AED' },
    shapes: { screen: '#F0FDFA', num: '#FFFFFF', fn: '#CCFBF1', op: '#0D9488', eq: '#AB3500', display: '#0F766E', btn: '#CCFBF1' },
  }
};

export const DarkTheme = {
  background: '#191C1D', // Deep charcoal
  primary: '#FFB59D', // Light Orange for dark mode
  secondary: '#D5BAFF', // Light Purple for dark mode
  accent: '#FF6B35',
  text: '#E1E3E4',
  textMuted: '#909192',
  cardBg: '#2E3132', // Surface variant
  border: '#444748',
  surface: '#2E3132',
  white: '#FFFFFF',

  tools: {
    basic: { screen: '#191C1D', num: '#2E3132', fn: '#444748', op: '#444748', eq: '#FFB59D', display: '#E1E3E4', btn: '#444748' },
    scientific: { screen: '#191C1D', num: '#2E3132', fn: '#004494', op: '#38BDF8', eq: '#FFB59D', display: '#38BDF8', btn: '#004494' },
    currency: { screen: '#0F1F14', num: '#1A2E20', fn: '#112217', op: '#34D399', eq: '#FFB59D', display: '#34D399', btn: '#112217' },
    emi: { screen: '#1F190F', num: '#2E261A', fn: '#221D11', op: '#FB923C', eq: '#FFB59D', display: '#FB923C', btn: '#221D11' },
    gst: { screen: '#1F140F', num: '#2E1E1A', fn: '#221511', op: '#FFB59D', eq: '#E1E3E4', display: '#FFB59D', btn: '#221511' },
    interest: { screen: '#1F1C0F', num: '#2E2A1A', fn: '#221F11', op: '#FBBF24', eq: '#FFB59D', display: '#FBBF24', btn: '#221F11' },
    age: { screen: '#1F0F16', num: '#2E1A22', fn: '#221118', op: '#F472B6', eq: '#FFB59D', display: '#F472B6', btn: '#221118' },
    split: { screen: '#140F1F', num: '#1E1A2E', fn: '#151122', op: '#A78BFA', eq: '#FFB59D', display: '#A78BFA', btn: '#151122' },
    unit: { screen: '#0F1A1F', num: '#1A272E', fn: '#111D22', op: '#38BDF8', eq: '#FFB59D', display: '#38BDF8', btn: '#111D22' },
    discount: { screen: '#1F0F0F', num: '#2E1A1A', fn: '#221111', op: '#F87171', eq: '#FFB59D', display: '#F87171', btn: '#221111' },
    bases: { screen: '#140F1F', num: '#1E1A2E', fn: '#151122', op: '#A78BFA', eq: '#FFFFFF', display: '#A78BFA', btn: '#A78BFA' },
    shapes: { screen: '#0F1F1C', num: '#1A2E2A', fn: '#112220', op: '#2DD4BF', eq: '#FFB59D', display: '#2DD4BF', btn: '#112220' },
  }
};

// Legacy fallback
export const Colors = LightTheme;
