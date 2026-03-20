import type { IRepository } from '@/domain/interfaces/IRepository';
import type {
  CitiesGroupedByCategory,
  City,
  CityFilters,
  CityPreview,
} from './types';

export interface ICityRepository
  extends IRepository<City, CityPreview, CityFilters> {
  findById(id: string): Promise<City>;
  findAll(filter?: CityFilters): Promise<CityPreview[]>;
  findRelatedCitiesByCityId(cityId: string): Promise<CityPreview[]>;
  findCitiesGroupedByCategory(): Promise<CitiesGroupedByCategory[]>;
}
