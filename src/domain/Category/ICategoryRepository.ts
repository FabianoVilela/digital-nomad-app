import type { IRepository } from '@/domain/interfaces/IRepository';
import type { Category } from './types';

export interface ICategoryRepository extends IRepository<Category> {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
}
