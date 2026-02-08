import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Screen } from '@/components/Base/Screen';
import { CityDetailsHeader } from '@/components/CityDetailsHeader';
import { CityDetailsInfo } from '@/components/CityDetailsInfo';
import { CityDetailsMap } from '@/components/CityDetailsMap';
import { CityDetailsRelatedCities } from '@/components/CityDetailsRelatedCities';
import { cities } from '@/data/cities';

export default function CityDetailsScreen() {
  const router = useRouter();
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
      <CityDetailsInfo
        name={city.name}
        country={city.country}
        description={city.description}
        touristAttractions={city.touristAttractions}
      />
      <CityDetailsRelatedCities relatedCitiesIds={city.relatedCitiesIds} />
      <CityDetailsMap location={city.location} />
      <Text onPress={() => router.back()}>Voltar</Text>
    </Screen>
  );
}
