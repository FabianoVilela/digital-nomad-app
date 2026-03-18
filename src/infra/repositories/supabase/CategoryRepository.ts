import type {
  Category,
  CategoryCode,
  ICategoryRepository,
} from '@/domain/Category';
import { supabaseClient } from '@/infra/adapters/db/supabase';

export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<Category[]> {
    const { data, error } = await supabaseClient.from('categories').select('*');

    if (error) {
      throw new Error('Error trying to list categories');
    }

    return data.map((category) => ({
      id: category.id,
      description: category.description,
      name: category.name,
      code: category.code as CategoryCode,
    }));
  }
}
