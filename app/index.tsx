import { Link } from 'expo-router';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';

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
