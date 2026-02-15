import { Link } from 'expo-router';
import MapView from 'react-native-maps';
import { Box, PressableBox } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';
import { useAppTheme } from '@/theme/useAppTheme';
import type { City } from '@/types';

type CityDetailsMapProps = Pick<City, 'location'>;

export function CityDetailsMap({ location }: CityDetailsMapProps) {
  const { borderRadii } = useAppTheme();

  return (
    <Box gap="s8">
      <Text variant="title22">Mapa</Text>
      <Box
        position="relative"
        style={{
          width: '100%',
          height: 200,
          borderRadius: borderRadii.default,
          overflow: 'hidden',
        }}
      >
        <Link
          asChild
          href={{
            pathname: '/(protected)/city-details/map-view-modal',
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }}
        >
          <PressableBox flex={1}>
            <MapView
              pointerEvents="none"
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              pitchEnabled={false}
              rotateEnabled={false}
              zoomEnabled={false}
              scrollEnabled={false}
            />
          </PressableBox>
        </Link>
      </Box>
    </Box>
  );
}
