import { getTokens, useTheme } from '@tamagui/core';

export function useAppTheme() {
  const { color: colors, size: sizes, space: spaces, radius } = getTokens();
  const current = useTheme();

  return { theme: { colors, sizes, spaces, radius, current } };
}
