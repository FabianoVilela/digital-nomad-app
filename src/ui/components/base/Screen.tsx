import type { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/ui/theme';
import { Box, type BoxProps } from './Box';

interface ScreenProps extends PropsWithChildren<BoxProps> {
  scrollable?: boolean;
  safeArea?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  safeArea = false,
  ...props
}: ScreenProps) {
  const { spacing, colors } = useAppTheme();

  function ScrollableContent() {
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

  function NonScrollableContent() {
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

  if (scrollable) {
    if (safeArea) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <ScrollableContent />
        </SafeAreaView>
      );
    }

    return <ScrollableContent />;
  }

  if (safeArea) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <NonScrollableContent />
      </SafeAreaView>
    );
  }

  return <NonScrollableContent />;
}
