import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list';
import { CityCard } from '@/components/CityCard';
import { Screen } from '@/components/ui/Screen';
import { cityPreviewList } from '@/data/cities';

export default function HomeScreen() {
  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  return (
    <Screen>
      <FlashList
        style={{ flex: 1 }}
        data={cityPreviewList}
        keyExtractor={(item: CityPreview) => item.id}
        renderItem={renderItem}
      />
    </Screen>
  );
}
