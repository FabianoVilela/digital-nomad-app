import { useScrollToTop } from '@react-navigation/native';
import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo,
} from '@shopify/flash-list';
import { useRef, useState } from 'react';
import type { Category } from '@/domain/Category';
import { useGetCategories } from '@/domain/Category/useCases';
import type { CityPreview } from '@/domain/City';
import { useGetCities } from '@/domain/City/useCases';
import { useAppSafeArea, useDebounce } from '@/shared/hooks';
import { CityCard, CityFilter } from '@/ui/components';
import { Box, Screen } from '@/ui/components/base';
import { useAppTheme } from '@/ui/theme';

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
      console.info('category', category);
      setSelectedCategoryId(category.id);
      return;
    }

    setSelectedCategoryId(null);
  }

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  // NOTE: W.I.P
  const {
    data: cities,
    // isLoading,
    // error,
  } = useGetCities({
    name: debouncedSearch,
    categoryId: selectedCategoryId,
  });

  // NOTE: W.I.P
  const {
    data: categories,
    // isLoading: isLoadingCategories,
    // error: errorCategories,
  } = useGetCategories();

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlashList
        ref={flatListRef}
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CityFilter
            search={search}
            onSearchChange={setSearch}
            categories={categories || []}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleCategoryPress}
          />
        }
        ItemSeparatorComponent={() => <Box height={spacing.padding} />}
        contentContainerStyle={{
          paddingTop: top + spacing.s16,
          paddingBottom: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}
      />
    </Screen>
  );
}
