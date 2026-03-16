import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetCitiesByCategoriesIds() {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['cities'],
    fetchData: () => {
      throw new Error('Not implemented');
    },
  });
}
