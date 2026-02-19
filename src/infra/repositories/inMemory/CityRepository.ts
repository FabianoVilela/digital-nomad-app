import type { City, ICityRepository, TouristAttraction } from '@/domain/City';

export class CityRepository implements ICityRepository {
  async findAll(): Promise<City[]> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<City> {
    throw new Error('Not implemented');
  }

  async findByName(name: string): Promise<City[]> {
    throw new Error('Not implemented');
  }

  async findRelatedCitiesByCityId(cityId: string): Promise<City[]> {
    throw new Error('Not implemented');
  }

  async findTouristAttractionsByCityId(
    cityId: string,
  ): Promise<TouristAttraction[]> {
    throw new Error('Not implemented');
  }

  async findCitiesByCategoriesIds(categoriesIds: string[]): Promise<City[]> {
    throw new Error('Not implemented');
  }
}
