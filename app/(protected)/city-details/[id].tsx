import { Text, View } from '@tamagui/core';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';

export default function CityDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={'$bg'}
    >
      <Text fontSize={30} onPress={router.back}>
        City details {id}
      </Text>
    </View>
  );
}
