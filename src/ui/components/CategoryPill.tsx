import type { Category, CategoryCode } from '@/domain/Category';
import { type IconName, Pill, type PillProps } from '@/ui/components/base';

export type CategoryPillProps = {
  category: Category;
  onPress?: (selectedCategory: Category) => void;
} & Pick<PillProps, 'active'>;

export function CategoryPill({
  category,
  onPress,
  ...props
}: CategoryPillProps) {
  return (
    <Pill
      icon={categoryIconMap[category.code]}
      label={category.name}
      onPress={() => onPress?.(category)}
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
