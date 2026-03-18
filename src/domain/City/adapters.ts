import { type Category, categoryAdapter } from '../Category';
import type {
  City,
  CityApi,
  CityPreview,
  CityPreviewApi,
  TouristAttraction,
  TouristAttractionApi,
} from './types';

export const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

function toCityPreview(city: CityPreviewApi): CityPreview {
  return {
    id: city.id as string,
    country: city.country as string,
    name: city.name as string,
    coverImage: `${storageURL}/${city.cover_image}`,
  };
}

function toCity(city: CityApi): City {
  const categories = city.categories as Category[];
  const tourist_attractions =
    city.tourist_attractions as TouristAttractionApi[];

  return {
    id: city.id as string,
    name: city.name as string,
    country: city.country as string,
    description: city.description as string,
    coverImage: `${storageURL}/${city.cover_image}`,
    location: {
      latitude: city.latitude as number,
      longitude: city.longitude as number,
    },
    categories: categories.map(categoryAdapter.toCategory),
    touristAttractions: tourist_attractions.map(toTouristAttractions),
  };
}

function toTouristAttractions(
  touristAttraction: TouristAttractionApi,
): TouristAttraction {
  return {
    id: touristAttraction.id,
    description: touristAttraction.description,
    name: touristAttraction.name,
    cityId: touristAttraction.city_id as string,
  };
}

export const cityAdapter = {
  toCityPreview,
  toCity,
  toTouristAttractions,
};
