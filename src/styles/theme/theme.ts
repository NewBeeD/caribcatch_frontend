// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

// Create your theme
export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-primary)', // Use CSS variable from next/font
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: 'var(--font-primary)',
        },
        body: {
          fontFamily: 'var(--font-primary)',
        },
      },
    },
  },
});

// For TypeScript users - extend theme typings
declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    fontWeightBold?: React.CSSProperties['fontWeight'];
  }
}