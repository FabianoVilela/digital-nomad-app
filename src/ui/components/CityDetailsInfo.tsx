import type { City } from '@/domain/City';
import { Box, Text } from '@/ui/components/base';

type CityDetailsInfoProps = Pick<City, 'name' | 'country' | 'description'>;

export function CityDetailsInfo({
  name,
  country,
  description,
}: CityDetailsInfoProps) {
  return (
    <Box>
      <Text variant="title28" mb="s2">
        {name}
      </Text>
      <Text variant="text18" mb="s24">
        {country}
      </Text>
      <Text variant="text14">{description}</Text>
    </Box>
  );
}
