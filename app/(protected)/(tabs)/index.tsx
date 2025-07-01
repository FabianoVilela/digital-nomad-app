import { Link } from 'expo-router';
import { Text } from '@/components/Text';
import { View } from '@/components/View';
import { useAppTheme } from '@/theme';

export default function HomeScreen() {
  const { theme } = useAppTheme();

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={theme.current.primary}
    >
      <Text>Home</Text>
      <Link href="/(protected)/city-details/1">City details</Link>
    </View>
  );
}
