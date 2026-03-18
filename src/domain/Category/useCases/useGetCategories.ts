import { useAppQuery } from '@/shared/hooks';
import { useRepository } from '@/shared/providers';

export function useGetCategories() {
  const _categoryRepository = useRepository('category');

  return useAppQuery({
    queryKey: ['categories'],
    fetchData: () => _categoryRepository.findAll(),
  });
}
