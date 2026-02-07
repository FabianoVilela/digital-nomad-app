import { useScrollToTop } from '@react-navigation/native';
import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo,
} from '@shopify/flash-list';
import { useRef } from 'react';
import { CityCard } from '@/components/CityCard';
import { CityFilter } from '@/components/CityFilter';
import { Box } from '@/components/ui/Box';
import { Screen } from '@/components/ui/Screen';
import { categories } from '@/data/categories';
import { cityPreviewList } from '@/data/cities';
import { useAppSafeArea } from '@/hooks';
import { useAppTheme } from '@/theme/useAppTheme';
import type { CityPreview } from '@/types';

export default function HomeScreen() {
  const flatListRef = useRef<FlashListRef<CityPreview>>(null);
  const { spacing } = useAppTheme();
  const { top } = useAppSafeArea();

  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlashList
        ref={flatListRef}
        data={cityPreviewList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CityFilter categories={categories} />}
        ItemSeparatorComponent={() => <Box height={spacing.padding} />}
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: spacing.padding,
          paddingHorizontal: spacing.padding,
          // gap: spacing.s8,
        }}
      />
    </Screen>
  );
}
