import { ScrollView } from 'react-native';
import { Box } from '@/components/Base/Box';
import { SearchInput } from '@/components/Base/SearchInput';
import { CategoryPill } from '@/components/CategoryPill';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Category } from '@/types';

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
