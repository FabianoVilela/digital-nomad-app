import { Link } from 'expo-router';
import { Box, Text } from '@/ui/components/base';

export default function Index() {
  if (__DEV__) {
    require('../ReactotronConfig');
  }

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home public</Text>
      <Link href="/(public)/sign-in">Sign In</Link>
    </Box>
  );
}
