import type { Repositories } from '@/shared/providers';
import { CityRepository } from './CityRepository';

export const InMemoryRepositories: Repositories = {
  city: new CityRepository(),
};
