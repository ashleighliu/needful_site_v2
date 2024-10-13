import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      "#FFFFFF",
      "#D4F2E4",
      "#AAE5CA",
      "#80D8B0",
      "#56CA96",
      "#2CBC7C",
      "#00A884",
      "#009477",
      "#007F6A",
      "#006B5D",
    ],
  },
  fontFamily: 'Urbanist, sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(16),
    md: rem(20),
    lg: rem(24),
    xl: rem(28),
  },
  headings: {
    fontFamily: 'Urbanist, sans-serif',
    sizes: {
      h1: {
        fontSize: rem(50),
        fontWeight: '900',
      },
      h2: {
        fontSize: rem(36),
        fontWeight: '700',
      },
      h3: {
        fontSize: rem(24),
        fontWeight: '700',
      },
    },
  },
  primaryColor: 'brand',
});
