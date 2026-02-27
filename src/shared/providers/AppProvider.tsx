import type { ReactNode } from 'react';
import type { Theme } from '@/ui/theme';
import { type QueryClient, QueryClientProvider } from './QueryClientProvider';
import { type Repositories, RepositoryProvider } from './RepositoryProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
  repositories: Repositories;
  theme: Theme;
  queryClient: QueryClient;
}

export function AppProvider({
  children,
  repositories,
  theme,
  queryClient,
}: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider value={repositories}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RepositoryProvider>
    </QueryClientProvider>
  );
}
