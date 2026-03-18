import type { Category } from './types';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
}
