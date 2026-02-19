import type { IRepository } from '@/domain/interfaces/IRepository';
import type { City, TouristAttraction } from './types';

export interface ICityRepository extends IRepository<City> {
  findById(id: string): Promise<City>;
  findAll(): Promise<City[]>;
  findByName(name: string): Promise<City[]>;
  findRelatedCitiesByCityId(cityId: string): Promise<City[]>;
  findTouristAttractionsByCityId(cityId: string): Promise<TouristAttraction[]>;
  findCitiesByCategoriesIds(categoriesIds: string[]): Promise<City[]>;
}
