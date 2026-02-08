import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import type { City } from '@/types';

type CityDetailsMapProps = Pick<City, 'location'>;

export function CityDetailsMap({ location }: CityDetailsMapProps) {
  return (
    <Box>
      <Text variant="title16">Map</Text>
    </Box>
  );
}
