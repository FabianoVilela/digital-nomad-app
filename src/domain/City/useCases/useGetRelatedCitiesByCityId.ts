import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetRelatedCitiesByCityId(cityId: string) {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['related-cities', cityId],
    fetchData: async () => {
      const data = _cityRepository.findRelatedCitiesByCityId(cityId);

      return data;
    },
  });
}
