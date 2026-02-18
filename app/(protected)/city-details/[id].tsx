import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { cities } from '@/infra/data/cities';
import {
  CityDetailsHeader,
  CityDetailsInfo,
  CityDetailsMap,
  CityDetailsRelatedCities,
  CityDetailsTouristAttractions,
} from '@/ui/components';
import { Box, Divider, Screen } from '@/ui/components/base';
import { useAppTheme } from '@/ui/theme';

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { spacing } = useAppTheme();

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: -spacing.padding,
        }}
      >
        <Box paddingHorizontal="padding">
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
        </Box>
        <CityDetailsRelatedCities relatedCitiesIds={city.relatedCitiesIds} />
      </ScrollView>
    </Screen>
  );
}
