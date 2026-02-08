import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import type { City } from '@/types';

type CityDetailsInfoProps = Pick<
  City,
  'name' | 'country' | 'description' | 'touristAttractions'
>;

export function CityDetailsInfo({
  name,
  country,
  description,
  touristAttractions,
}: CityDetailsInfoProps) {
  return (
    <Box>
      <Text variant="title16">Info</Text>
    </Box>
  );
}
