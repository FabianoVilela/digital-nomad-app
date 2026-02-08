import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import type { City } from '@/types';

type CityDetailsRelatedCitiesProps = Pick<City, 'relatedCitiesIds'>;

export function CityDetailsRelatedCities({
  relatedCitiesIds,
}: CityDetailsRelatedCitiesProps) {
  return (
    <Box>
      <Text variant="title16">Related Cities</Text>
    </Box>
  );
}
