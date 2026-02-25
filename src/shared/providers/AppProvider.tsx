import type { ReactNode } from 'react';
import type { Theme } from '@/ui/theme';
import { type Repositories, RepositoryProvider } from './RepositoryProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
  repositories: Repositories;
  theme: Theme;
}

export function AppProvider({
  children,
  repositories,
  theme,
}: AppProviderProps) {
  return (
    <RepositoryProvider value={repositories}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </RepositoryProvider>
  );
}
