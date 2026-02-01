import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function CityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>City Details</Text>
      <Text>City ID: {id}</Text>
      <Text onPress={() => router.back()}>Back</Text>
    </View>
  );
}
