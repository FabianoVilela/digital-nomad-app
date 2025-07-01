import { createTamagui } from '@tamagui/core';
import { colors, radius, sizes, spaces } from '@/theme';

export const config = createTamagui({
  tokens: {
    size: sizes,
    space: spaces,
    radius: radius,
    color: colors,
  },

  themes: {
    light: {
      bg: colors.background,
      color: colors.color,
    },
    dark: {
      bg: colors.color,
      color: colors.white,
    },
  },
  // media query definitions can be used as style props or with the useMedia hook
  // but also are added to "group styles", which work like Container Queries from CSS
  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },

  shorthands: {
    // <View px={20} />
    px: 'paddingHorizontal',
  },

  // there are more settings, explained below:
  settings: {
    disableSSR: true,
    allowedStyleValues: 'somewhat-strict-web',
  },
});

// now, make your types flow nicely back to your `tamagui` import:
type Config = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Config {}
}
