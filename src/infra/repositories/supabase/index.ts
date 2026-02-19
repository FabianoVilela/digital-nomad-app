import type { Repositories } from '@/shared/providers';
import { CityRepository } from './CityRepository';

export const SupabaseRepositories: Repositories = {
  city: new CityRepository(),
};
