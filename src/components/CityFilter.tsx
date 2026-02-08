import { ScrollView } from 'react-native';
import { CategoryPill } from '@/components/CategoryPill';
import { Box } from '@/components/ui/Box';
import { SearchInput } from '@/components/ui/SearchInput';
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
        style={{
          marginHorizontal: -spacing.s16,
          paddingVertical: spacing.s12,
        }}
        contentContainerStyle={{
          gap: spacing.s8,
          paddingHorizontal: spacing.s16,
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
