import { ScrollView } from 'react-native';
import type { Category } from '@/domain/Category';
import { Box, SearchInput } from '@/ui/components/base';
import { useAppTheme } from '@/ui/theme';
import { CategoryPill } from './CategoryPill';

type CityFilterProps = {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (category: Category | null) => void;
  search: string;
  onSearchChange: (search: string) => void;
};

export function CityFilter({
  categories,
  selectedCategoryId = null,
  onSelectCategory,
  search,
  onSearchChange,
}: CityFilterProps) {
  const { spacing } = useAppTheme();

  return (
    <Box>
      <SearchInput
        placeholder="Qual o seu próximo destino?"
        value={search}
        onChangeText={onSearchChange}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.s8,
          paddingHorizontal: spacing.s16,
        }}
        style={{
          marginHorizontal: -spacing.s16,
          paddingVertical: spacing.s12,
        }}
      >
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            category={category}
            onPress={() =>
              onSelectCategory(
                category.id === selectedCategoryId ? null : category,
              )
            }
            active={selectedCategoryId === category.id}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
