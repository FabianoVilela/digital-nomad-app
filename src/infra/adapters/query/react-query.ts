import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

/* NOTE: Since Tanstack Query is the industry standard and unlikely to be replaced,
 it is being used directly without an abstraction to avoid unnecessary complexity.
 If a library change is required in the future, an abstraction (IQueryClient) can be created to implement the new library.
*/

// TODO: Check a better way to handle this without abstraction

const queryClient = new QueryClient();

export {
  queryClient,
  QueryClient,
  useQuery,
  useMutation,
  TanstackQueryClientProvider,
};
