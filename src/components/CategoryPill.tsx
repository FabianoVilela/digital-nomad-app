import type { IconName } from '@/components/ui/Icon';
import type { PillProps } from '@/components/ui/Pill';
import { Pill } from '@/components/ui/Pill';
import type { Category, CategoryCode } from '@/types';

export type CategoryPillProps = {
  category: Category;
} & Pick<PillProps, 'active'>;

export function CategoryPill({ category, ...props }: CategoryPillProps) {
  return (
    <Pill
      icon={categoryIconMap[category.code]}
      label={category.name}
      {...props}
    />
  );
}

const categoryIconMap: Record<CategoryCode, IconName> = {
  ADVENTURE: 'adventure',
  BEACH: 'beach',
  CULTURE: 'culture',
  GASTRONOMY: 'gastronomy',
  HISTORY: 'history',
  LUXURY: 'luxury',
  NATURE: 'nature',
  SHOPPING: 'shopping',
  URBAN: 'urban',
  FAVORITE: 'star',
};
