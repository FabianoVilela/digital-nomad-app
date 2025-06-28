import { View } from '@tamagui/core';
import { CityCard } from '@/src/componets/CityCard';

import { cities } from '@/src/data/cities';

export default function CityDetails() {
  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={'$bg'}
    >
      {cities.map(city => {
        return <CityCard key={city.id} cityPreview={city} />;
      })}
    </View>
  );
}
