import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
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
