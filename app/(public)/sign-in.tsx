import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Sign In</Text>
      <Link href="/(protected)/(tabs)">Login</Link>
    </View>
  );
}
