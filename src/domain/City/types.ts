import type { Category } from '@/domain/Category';

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TouristAttraction = {
  id: string;
  name: string;
  description: string;
  cityId: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  coverImage: string;
  description: string;
  touristAttractions: TouristAttraction[];
  location: {
    latitude: number;
    longitude: number;
  };
  categories: Category[];
};

export type CityPreview = Pick<City, 'id' | 'name' | 'country' | 'coverImage'>;

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

// Api types
export type CityApi = {
  categories: Json | null;
  country: string | null;
  cover_image: string | null;
  description: string | null;
  id: string | null;
  latitude: number | null;
  longitude: number | null;
  name: string | null;
  tourist_attractions: Json | null;
};

export type CityPreviewApi = {
  id: string | null;
  name: string | null;
  country: string | null;
  cover_image: string | null;
};

export type TouristAttractionApi = {
  city_id: string | null;
  description: string;
  id: string;
  name: string;
};
