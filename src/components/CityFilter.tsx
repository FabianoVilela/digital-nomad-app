import { useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryPill } from '@/components/CategoryPill';
import { Box } from '@/components/ui/Box';
import { SearchInput } from '@/components/ui/SearchInput';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Category } from '@/types';

type CityFilterProps = {
  categories: Category[];
};

export function CityFilter({ categories }: CityFilterProps) {
  const [search, setSearch] = useState('');
  const [activeCategory] = useState<Category | null>(null);
  const { spacing } = useAppTheme();

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
            active={activeCategory?.id === category.id}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
