import { useScrollToTop } from '@react-navigation/native';
import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo,
} from '@shopify/flash-list';
import { useMemo, useRef, useState } from 'react';
import { CityCard } from '@/components/CityCard';
import { CityFilter } from '@/components/CityFilter';
import { Box } from '@/components/ui/Box';
import { Screen } from '@/components/ui/Screen';
import { categories } from '@/data/categories';
import { cityPreviewList } from '@/data/cities';
import { useAppSafeArea, useDebounce } from '@/hooks';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Category, CityPreview } from '@/types';

export default function HomeScreen() {
  const flatListRef = useRef<FlashListRef<CityPreview>>(null);
  const { spacing } = useAppTheme();
  const { top } = useAppSafeArea();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce({ value: search });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  useScrollToTop(flatListRef);

  function handleCategoryPress(category: Category | null) {
    if (category) {
      setSelectedCategoryId(category.id);
      return;
    }

    setSelectedCategoryId(null);
  }

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  // TODO: Remove - W.I.P
  const filteredCities = useMemo(() => {
    const filteredCities = cityPreviewList.filter((city) =>
      city.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    if (selectedCategoryId) {
      return filteredCities.filter((city) =>
        city.categories.some((category) => category.id === selectedCategoryId),
      );
    }

    return filteredCities;
  }, [debouncedSearch, selectedCategoryId]);

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlashList
        ref={flatListRef}
        data={filteredCities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CityFilter
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleCategoryPress}
          />
        }
        ItemSeparatorComponent={() => <Box height={spacing.padding} />}
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}
      />
    </Screen>
  );
}
