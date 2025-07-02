import { styled, Text as TamaguiText } from '@tamagui/core';

export const Text = styled(TamaguiText, {
  name: 'Text',
  color: '$text',
  fontFamily: '$PoppinsRegular',

  variants: {
    variant: {
      defaults: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
      },
      title28: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '600',
      },
      title22: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '600',
      },
      title16: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '600',
      },
      text18: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '400',
      },
      text16: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
      },
      text14: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: '400',
      },
      text12: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'defaults',
  },
});
