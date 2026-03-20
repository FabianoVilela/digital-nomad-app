import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetCitiesGroupedByCategory() {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['city', 'category-grouped'],
    fetchData: () => _cityRepository.findCitiesGroupedByCategory(),
  });
}
