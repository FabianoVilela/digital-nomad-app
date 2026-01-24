import { Stack } from 'expo-router';
import ThemeProvider from '../src/providers/theme-provider';
import theme from '../src/theme/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(protected)" />
      </Stack>
    </ThemeProvider>
  );
}
