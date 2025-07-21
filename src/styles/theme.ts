export const createShadow = (elevation: number, theme: any) => {
  const shadows = {
    1: `0 1px 3px ${theme.colors.shadow}`,
    2: `0 4px 6px ${theme.colors.shadow}`,
    3: `0 10px 15px ${theme.colors.shadow}`,
    4: `0 20px 25px ${theme.colors.shadow}`,
    5: `0 25px 50px ${theme.colors.shadow}`,
  };
  return shadows[elevation as keyof typeof shadows] || shadows[1];
};

export const lightTheme = {
  colors: {
    primary: '#667eea',
    primaryHover: '#5a67d8',
    secondary: '#764ba2',
    accent: '#f093fb',
    background: '#f8f9fa',
    backgroundSecondary: '#ffffff',
    backgroundTertiary: '#f1f3f4',
    surface: '#ffffff',
    text: '#2d3748',
    textSecondary: '#718096',
    textLight: '#a0aec0',
    border: '#e2e8f0',
    borderLight: '#f0f4f8',
    success: '#48bb78',
    error: '#f56565',
    warning: '#ed8936',
    info: '#4299e1',
    shadow: 'rgba(0, 0, 0, 0.1)',
shadowHover: 'rgba(0, 0, 0, 0.15)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientHover: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  typography: {
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      heading: '32px',
      display: '48px',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1440px',
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
  animation: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  createShadow,
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#7c3aed',
    primaryHover: '#8b5cf6',
    secondary: '#a855f7',
    accent: '#ec4899',
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textLight: '#94a3b8',
    border: '#334155',
    borderLight: '#475569',
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    gradientHover: 'linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)',
  },
};

export type Theme = typeof lightTheme;
export const theme = lightTheme; // Default theme

// Theme utilities
export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

export const mediaQuery = (breakpoint: keyof Theme['breakpoints']) => {
  return `@media (min-width: ${theme.breakpoints[breakpoint]})`;
};
