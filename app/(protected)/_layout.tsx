import { Stack } from 'expo-router';
import { usePlatform } from '@/hooks';
import { useAppTheme } from '@/theme/useAppTheme';

export default function ProtectedLayout() {
  const { colors } = useAppTheme();
  const { isIOS } = usePlatform();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="city-details/[id]" />
      <Stack.Screen
        name="city-details/map-view-modal"
        options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
          sheetAllowedDetents: [0.9],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: isIOS,
          sheetCornerRadius: 16,
        }}
      />
    </Stack>
  );
}
