import { createFont, createTamagui } from '@tamagui/core';
import { colors, icons, radius, sizes, spaces } from '@/theme';

const systemFont = createFont({
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: '300',
    // 2 will be 300
    3: '600',
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: 'InterLight', italic: 'InterItalic' },
    600: { normal: 'InterBold' },
  },
  color: {
    text: colors.pureWhite,
  },
});

const baseTheme = {
  background: colors.midnightBlack,
  primary: colors.fieryRed,
  text: colors.pureWhite,
  gray1: colors.charcoalGrey,
  gray2: colors.stoneGrey,
};

export const config = createTamagui({
  tokens: {
    size: sizes,
    space: spaces,
    radius,
    color: colors,
    icon: icons,
  },
  fonts: {
    system: systemFont,
  },
  themes: {
    light: baseTheme,
    dark: baseTheme,
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
