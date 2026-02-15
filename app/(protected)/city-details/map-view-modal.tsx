import { useLocalSearchParams } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import MapView from 'react-native-maps';

export default function MapViewModal() {
  const { latitude, longitude } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
  }>();

  const lat = Number(latitude) || 0;
  const lng = Number(longitude) || 0;

  const { width, height } = useWindowDimensions();

  return (
    <MapView
      style={{ width, height }}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}
