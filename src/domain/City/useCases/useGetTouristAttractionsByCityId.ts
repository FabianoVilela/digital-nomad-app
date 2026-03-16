import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetTouristAttractionsByCityId(cityId: string) {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['city', cityId],
    fetchData: () => _cityRepository.findById(cityId),
  });
}
