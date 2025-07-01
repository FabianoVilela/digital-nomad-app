import { Link } from 'expo-router';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { CityCard } from '@/components/CityCard';
import { Screen } from '@/components/Screen';
import { cityPreviewList } from '@/data/cities';
import { useAppTheme } from '@/theme';
import type { CityPreview } from '@/types';

export default function HomeScreen() {
  const { theme } = useAppTheme();

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  return (
    <Screen>
      <Link href="/(protected)/city-details/1">City details</Link>
      <FlatList
        data={cityPreviewList}
        renderItem={renderItem}
        contentContainerStyle={{ width: 328, gap: theme.spaces.$s14.val }}
      />
    </Screen>
  );
}
