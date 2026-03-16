import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetRelatedCitiesByCityId(cityId: string) {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['city', cityId],
    fetchData: () => {
      throw new Error('Not implemented');
    },
  });
}
