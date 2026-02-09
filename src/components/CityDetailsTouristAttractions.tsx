import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import type { City } from '@/types';

type CityDetailsTouristAttractionsProps = Pick<City, 'touristAttractions'>;

export function CityDetailsTouristAttractions({
  touristAttractions,
}: CityDetailsTouristAttractionsProps) {
  return (
    <Box>
      <Text variant="title16">Tourist Attractions</Text>
    </Box>
  );
}
