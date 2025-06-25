import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Text, View } from 'react-native';

export default function CityDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={router.back}>City details {id}</Text>
    </View>
  );
}
