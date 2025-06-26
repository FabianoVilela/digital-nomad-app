import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { TamaguiProvider } from '@tamagui/core';
import { config } from '../tamagui.config'; // your configuration

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="(public)/auth/sign-in" />
        <Stack.Screen name="+not-found" />
        <StatusBar style="auto" />
      </Stack>
    </TamaguiProvider>
  );
}
