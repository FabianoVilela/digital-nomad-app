import { useLocalSearchParams } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Box, type BoxProps } from '@/components/Base/Box';

/* NOTE: This component is only used on Android
 * Leaning how to create a custom pages/components for each platform
 * and avoid use of Platform.OS
 *
 * TODO: Needs to be refactored to avoid code duplication
 */
export default function MapViewModal() {
  const { latitude, longitude } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
  }>();

  const lat = Number(latitude) || 0;
  const lng = Number(longitude) || 0;

  const { width, height } = useWindowDimensions();

  return (
    <>
      <MapView
        style={{ width, height }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <Box {...grabberContainerStyle}>
        <Box
          width={36}
          height={5}
          borderRadius="rounded"
          backgroundColor="gray2"
        />
      </Box>
    </>
  );
}

const grabberContainerStyle: BoxProps = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 40,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 's10',
  zIndex: 5,
};
