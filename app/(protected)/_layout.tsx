import { Stack } from 'expo-router';
import { useAppTheme } from '@/theme/useAppTheme';

export default function ProtectedLayout() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
