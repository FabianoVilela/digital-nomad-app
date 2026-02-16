import { ScrollView } from 'react-native';
import { Text } from '@/components/Base/Text';
import { cities } from '@/data/cities';
import { useAppSafeArea } from '@/hooks';
import { useAppTheme } from '@/theme/useAppTheme';
import type { City } from '@/types';
import { Box } from './Base/Box';
import { CityCard } from './CityCard';

type CityDetailsRelatedCitiesProps = Pick<City, 'relatedCitiesIds'>;

export function CityDetailsRelatedCities({
  relatedCitiesIds,
}: CityDetailsRelatedCitiesProps) {
  const { spacing } = useAppTheme();
  const { bottom } = useAppSafeArea();

  // TODO: change to use the cities from the API - W.I.P
  const relatedCities = cities.filter((city) =>
    relatedCitiesIds.includes(city.id),
  );

  function renderRelatedCities() {
    return relatedCities.map((city) => (
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
