import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { Divider } from '@/components/Base/Divider';
import { Screen } from '@/components/Base/Screen';
import { CityDetailsHeader } from '@/components/CityDetailsHeader';
import { CityDetailsInfo } from '@/components/CityDetailsInfo';
import { CityDetailsMap } from '@/components/CityDetailsMap';
import { CityDetailsRelatedCities } from '@/components/CityDetailsRelatedCities';
import { CityDetailsTouristAttractions } from '@/components/CityDetailsTouristAttractions';
import { cities } from '@/data/cities';

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams();

  // TODO: Replace with data fetching - W.I.P
  const city = cities.find((city) => city.id === id);

  if (!city) {
    return (
      <Screen>
        <Text>Cidade não encontrada</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <CityDetailsHeader
        coverImage={city.coverImage}
        categories={city.categories}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CityDetailsInfo
          name={city.name}
          country={city.country}
          description={city.description}
        />
        <Divider />
        <CityDetailsTouristAttractions
          touristAttractions={city.touristAttractions}
        />
        <Divider />
        <CityDetailsMap location={city.location} />
        <Divider />
        <CityDetailsRelatedCities relatedCitiesIds={city.relatedCitiesIds} />
      </ScrollView>
    </Screen>
  );
}
