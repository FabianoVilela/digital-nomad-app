import {
  type City,
  type CityPreview,
  type CityPreviewApi,
  cityAdapter,
  type ICityRepository,
  type TouristAttraction,
} from '@/domain/City';
import { supabaseClient } from '@/infra/adapters/db';

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

const CITY_PREVIEW_FIELD = 'id,name,country,cover_image';

export class CityRepository implements ICityRepository {
  async findAll(filters: CityFilters): Promise<CityPreview[]> {
    let cities: CityPreviewApi[] | null;

    if (filters.categoryId) {
      const { data } = await supabaseClient
        .from('cities_with_categories')
        .select(CITY_PREVIEW_FIELD)
        .eq('category_id', filters.categoryId)
        .ilike('name', `%${filters.name}%`);

      cities = data;
    } else {
      const { data } = await supabaseClient
        .from('cities')
        .select(CITY_PREVIEW_FIELD)
        .ilike('name', `%${filters.name}%`);

      cities = data;
    }

    if (!cities) {
      throw new Error('Data is not available');
    }

    return cities.map((city) => cityAdapter.toCityPreview(city));
  }

  async findById(id: string): Promise<City> {
    const { data, error } = await supabaseClient
      .from('cities_with_full_info')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Data is not available');
    }

    return cityAdapter.toCity(data);
  }

  findByName(name: string): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  async findRelatedCitiesByCityId(cityId: string): Promise<CityPreview[]> {
    const { data, error } = await supabaseClient
      .from('related_cities')
      .select(CITY_PREVIEW_FIELD)
      .eq('source_city_id', cityId);
    // .throwOnError();

    if (error) {
      throw new Error('Data is not available');
    }

    return data.map((row) => cityAdapter.toCityPreview(row));
  }

  async findTouristAttractionsByCityId(
    cityId: string,
  ): Promise<TouristAttraction[]> {
    throw new Error('Method not implemented.');
  }

  async findCitiesByCategoriesIds(categoriesIds: string[]): Promise<City[]> {
    throw new Error('Method not implemented.');
  }
}
