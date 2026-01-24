import {
  type BaseTheme as RestyleBaseTheme,
  ThemeProvider as RestyleThemeProvider,
} from '@shopify/restyle';

type BaseTheme = RestyleBaseTheme;

export default function ThemeProvider<T extends BaseTheme>({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: T;
}) {
  return <RestyleThemeProvider theme={theme}>{children}</RestyleThemeProvider>;
}
