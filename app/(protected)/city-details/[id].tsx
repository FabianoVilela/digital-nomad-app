import { CityCard } from '@/components/CityCard';
import { View } from '@/components/View';

import { cities } from '@/data/cities';

export default function CityDetails() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      {cities.map(city => {
        return <CityCard key={city.id} cityPreview={city} />;
      })}
    </View>
  );
}
