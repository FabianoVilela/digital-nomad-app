import type { City } from '@/domain/City';
import { Accordion, Box, Text } from '@/ui/components/base';

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
