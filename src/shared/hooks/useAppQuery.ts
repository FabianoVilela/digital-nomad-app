import { useQuery } from '@/infra/adapters/query/react-query';

type UseFetchDataReturn<T> = {
  data?: T;
  isLoading: boolean;
  isPending: boolean;
  error: unknown;
};

type UseAppQueryParams<T> = {
  queryKey: (string | null | undefined | number)[];
  fetchData: () => Promise<T>;
};

export function useAppQuery<T>({
  fetchData,
  queryKey,
}: UseAppQueryParams<T>): UseFetchDataReturn<T> {
  const { data, isLoading, error, isPending } = useQuery({
    queryKey,
    queryFn: fetchData,
  });

  return {
    data,
    isLoading,
    isPending,
    error,
  };
}
