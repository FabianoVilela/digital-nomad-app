import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';

const isSignedIn = false;

export default function ProtectedLayout() {
  if (isSignedIn) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
