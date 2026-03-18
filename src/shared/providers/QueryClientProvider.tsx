import type { ReactNode } from 'react';

import {
  type QueryClient,
  TanstackQueryClientProvider,
} from '@/infra/adapters/query/react-query';

interface QueryClientProviderProps {
  children: ReactNode;
  client: QueryClient;
}

export function QueryClientProvider({
  children,
  client,
}: QueryClientProviderProps) {
  return (
    <TanstackQueryClientProvider client={client}>
      {children}
    </TanstackQueryClientProvider>
  );
}
