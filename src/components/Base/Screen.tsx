import type { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { Box, type BoxProps } from '@/components/Base/Box';
import { useAppTheme } from '@/theme/useAppTheme';

interface ScreenProps extends PropsWithChildren<BoxProps> {
  scrollable?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  ...props
}: ScreenProps) {
  const { spacing, colors } = useAppTheme();

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingHorizontal: spacing.s16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingHorizontal="s16"
      {...props}
    >
      {children}
    </Box>
  );
}
