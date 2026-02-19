import type { City, ICityRepository, TouristAttraction } from '@/domain/City';

export class CityRepository implements ICityRepository {
  findAll(): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<City> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  findRelatedCitiesByCityId(cityId: string): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  findTouristAttractionsByCityId(cityId: string): Promise<TouristAttraction[]> {
    throw new Error('Method not implemented.');
  }

  findCitiesByCategoriesIds(categoriesIds: string[]): Promise<City[]> {
    throw new Error('Method not implemented.');
  }
}
