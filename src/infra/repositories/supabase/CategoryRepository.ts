import {
  type Category,
  categoryAdapter,
  type ICategoryRepository,
} from '@/domain/Category';
import { supabaseClient } from '@/infra/adapters/db/supabase';

export class CategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category> {
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error trying to find category');
    }

    return categoryAdapter.toCategory(data);
  }

  async findAll(): Promise<Category[]> {
    const { data, error } = await supabaseClient.from('categories').select('*');

    if (error) {
      throw new Error('Error trying to list categories');
    }

    return data.map(categoryAdapter.toCategory);
  }
}
