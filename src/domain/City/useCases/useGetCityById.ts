import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetCityById(id: string) {
  const _cityRepository = useRepository('city');

  return useAppQuery({
    queryKey: ['city', id],
    fetchData: () => _cityRepository.findById(id),
  });
}
