import type { Category, CategoryApi, CategoryCode } from './types';

function toCategory(category: CategoryApi): Category {
  return {
    id: category.id,
    description: category.description,
    name: category.name,
    code: category.code as CategoryCode,
  };
}

export const categoryAdapter = {
  toCategory,
};
