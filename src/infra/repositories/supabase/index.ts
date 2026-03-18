import type { Repositories } from '@/shared/providers';
import { CategoryRepository } from './CategoryRepository';
import { CityRepository } from './CityRepository';

export const SupabaseRepositories: Repositories = {
  city: new CityRepository(),
  category: new CategoryRepository(),
};
