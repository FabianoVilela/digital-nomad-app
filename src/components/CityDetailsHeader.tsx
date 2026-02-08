import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import type { City } from '@/types';

type CityDetailsHeaderProps = Pick<City, 'coverImage' | 'categories'>;

export function CityDetailsHeader({
  coverImage,
  categories,
}: CityDetailsHeaderProps) {
  return (
    <Box>
      <Text variant="title16">Header</Text>
    </Box>
  );
}
