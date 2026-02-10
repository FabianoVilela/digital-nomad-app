import { Accordion } from '@/components/Base/Accordion';
import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import type { City } from '@/types';

type CityDetailsTouristAttractionsProps = Pick<City, 'touristAttractions'>;

export function CityDetailsTouristAttractions({
  touristAttractions,
}: CityDetailsTouristAttractionsProps) {
  function renderAccordionItem() {
    return touristAttractions.map((touristAttraction) => (
      <Accordion
        key={touristAttraction.id}
        title={touristAttraction.name}
        content={touristAttraction.description}
      />
    ));
  }

  return (
    <Box gap="s8">
      <Text variant="title22">Pontos turísticos</Text>
      <Box gap="s8">{renderAccordionItem()}</Box>
    </Box>
  );
}
