import { createTamagui } from '@tamagui/core';

export const config = createTamagui({
  tokens: {
    // width="$sm"
    size: { sm: 8, md: 12, lg: 20 },
    // margin="$sm"
    space: { sm: 4, md: 8, lg: 12 },
    // radius="$none"
    radius: { none: 0, sm: 3 },
    color: { white: '#fff', black: '#000' },
  },

  // themes are like CSS Variables that you can change anywhere in the tree
  // you use <Theme name="light" /> to change the theme
  themes: {
    light: {
      bg: '#f2f2f2',
      color: '#fff',
    },
    dark: {
      bg: '#111',
      color: '#000',
    },
    // sub-themes are a powerful feature of tamagui, explained later in the docs
    // user theme like <Theme name="dark"><Theme name="blue">
    // or just <Theme name="dark_blue">
    dark_blue: {
      bg: 'darkblue',
      color: '#fff',
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
