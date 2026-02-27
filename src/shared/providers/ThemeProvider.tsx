import { type AppBaseTheme, AppThemeProvider } from '@/ui/theme';

export function ThemeProvider<T extends AppBaseTheme>({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: T;
}) {
  return <AppThemeProvider theme={theme}>{children}</AppThemeProvider>;
}
