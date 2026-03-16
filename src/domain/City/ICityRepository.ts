import type { IRepository } from '@/domain/interfaces/IRepository';
import type {
  City,
  CityFilters,
  CityPreview,
  TouristAttraction,
} from './types';

export interface ICityRepository
  extends IRepository<City, CityPreview, CityFilters> {
  findById(id: string): Promise<City>;
  findAll(filter?: CityFilters): Promise<CityPreview[]>;
  findByName(name: string): Promise<City[]>;
  findRelatedCitiesByCityId(cityId: string): Promise<City[]>;
  findTouristAttractionsByCityId(cityId: string): Promise<TouristAttraction[]>;
  findCitiesByCategoriesIds(categoriesIds: string[]): Promise<City[]>;
}
