import { useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryPill } from '@/components/CategoryPill';
import { Box } from '@/components/ui/Box';
import { SearchInput } from '@/components/ui/SearchInput';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Category } from '@/types';

type CityFilterProps = {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (category: Category) => void;
};

export function CityFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CityFilterProps) {
  const { spacing } = useAppTheme();

  const [search, setSearch] = useState('');

  return (
    <Box>
      <SearchInput
        placeholder="Qual o seu próximo destino?"
        value={search}
        onChangeText={setSearch}
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
            onPress={onSelectCategory}
            active={selectedCategoryId === category.id}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
