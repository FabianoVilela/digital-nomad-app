import { Link } from 'expo-router';
import { Box } from '@/components/Base/Box';
import { Text } from '@/components/Base/Text';

export default function Index() {
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
