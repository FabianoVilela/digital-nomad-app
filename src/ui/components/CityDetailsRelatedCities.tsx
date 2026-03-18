import { ScrollView } from 'react-native';
import type { CityPreview } from '@/domain/City';
import { useAppSafeArea } from '@/shared/hooks';
import { Box, Text } from '@/ui/components/base';
import { CityCard } from '@/ui/components/CityCard';
import { useAppTheme } from '@/ui/theme';

type CityDetailsRelatedCitiesProps = {
  relatedCities?: CityPreview[];
};

export function CityDetailsRelatedCities({
  relatedCities,
}: CityDetailsRelatedCitiesProps) {
  const { spacing } = useAppTheme();
  const { bottom } = useAppSafeArea();

  function renderRelatedCities() {
    return relatedCities?.map((city) => (
      <CityCard key={city.id} cityPreview={city} type="small" />
    ));
  }

  return (
    <Box
      gap="s8"
      style={{
        paddingLeft: spacing.padding,
        paddingBottom: bottom,
      }}
    >
      <Text variant="title22">Related Cities</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingRight: spacing.s48,
        }}
        style={{
          paddingLeft: spacing.padding,
          marginHorizontal: -spacing.padding,
        }}
      >
        {renderRelatedCities()}
      </ScrollView>
    </Box>
  );
}
