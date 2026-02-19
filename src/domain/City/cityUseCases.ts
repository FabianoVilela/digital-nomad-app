import { useRepository } from '@/shared/providers';

export function useCity() {
  const _cityRepository = useRepository('city');

  async function getCityById(id: string) {
    throw new Error('Not implemented');
  }

  async function getCities() {
    throw new Error('Not implemented');
  }

  async function getRelatedCitiesByCityId(cityId: string) {
    throw new Error('Not implemented');
  }

  async function getTouristAttractionsByCityId(cityId: string) {
    throw new Error('Not implemented');
  }

  async function getCitiesByCategoriesIds(categoriesIds: string[]) {
    throw new Error('Not implemented');
  }

  return {
    getCityById,
    getCities,
    getRelatedCitiesByCityId,
    getTouristAttractionsByCityId,
    getCitiesByCategoriesIds,
  };
}
