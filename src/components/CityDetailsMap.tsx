import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import type { City } from '@/types';

type CityDetailsMapProps = Pick<City, 'location'>;

export function CityDetailsMap({ location }: CityDetailsMapProps) {
  return (
    <Box>
      <Text variant="title16">Map</Text>
    </Box>
  );
}
