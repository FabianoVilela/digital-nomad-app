import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';
import type { CityFilters } from '../types';

export function useGetCities(filter: CityFilters) {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['cities', filter.name, filter.categoryId],
    fetchData: () => _cityRepository.findAll(filter),
  });
}
