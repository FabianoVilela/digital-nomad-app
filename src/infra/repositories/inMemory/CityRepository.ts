import type {
  City,
  CityFilters,
  CityPreview,
  ICityRepository,
  TouristAttraction,
} from '@/domain/City';
import { cities } from '@/infra/data/cities';

export class CityRepository implements ICityRepository {
  async findAll(filter?: CityFilters): Promise<CityPreview[]> {
    let filteredCities = cities;

    if (filter?.name) {
      filteredCities = filteredCities?.filter((city) =>
        city.name.toLowerCase().includes(filter.name?.toLowerCase() || ''),
      );
    }

    if (filter?.categoryId) {
      filteredCities = filteredCities?.filter((city) =>
        city.categories.some((category) => category.id === filter.categoryId),
      );
    }

    return filteredCities;
  }

  async findById(id: string): Promise<City> {
    const city = cities.find((city) => city.id === id);

    if (!city) {
      throw new Error('City not found');
    }
    return city;
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
