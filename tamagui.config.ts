import { createFont, createTamagui } from '@tamagui/core';
import { colors, icons, radius, sizes, spaces } from '@/theme';

const poppinsFont = createFont({
  family: 'PoppinsRegular',
  size: {
    12: 12,
    14: 14,
    16: 16,
    18: 18,
    22: 22,
    28: 28,
  },
  lineHeight: {
    14: 14,
    16: 16,
    18: 18,
    20: 20,
    24: 24,
    30: 30,
  },
  weight: {
    100: '100',
    200: '200',
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
    800: '800',
    900: '900',
  },
  letterSpacing: {
    0: 0,
  },
  face: {
    100: {
      normal: 'PoppinsThin',
      italic: 'PoppinsThinItalic',
    },
    200: {
      normal: 'PoppinsExtraLight',
      italic: 'PoppinsExtraLightItalic',
    },
    300: {
      normal: 'PoppinsLight',
      italic: 'PoppinsLightItalic',
    },
    400: {
      normal: 'PoppinsRegular',
      italic: 'PoppinsItalic',
    },
    500: {
      normal: 'PoppinsMedium',
      italic: 'PoppinsMediumItalic',
    },
    600: {
      normal: 'PoppinsSemiBold',
      italic: 'PoppinsSemiBoldItalic',
    },
    700: {
      normal: 'PoppinsBold',
      italic: 'PoppinsBoldItalic',
    },
    800: {
      normal: 'PoppinsExtraBold',
      italic: 'PoppinsExtraBoldItalic',
    },
    900: {
      normal: 'PoppinsBlack',
      italic: 'PoppinsBlackItalic',
    },
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
    PoppinsRegular: poppinsFont,
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
