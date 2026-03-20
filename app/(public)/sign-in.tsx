import { Link, router } from 'expo-router';
import {
  Box,
  Button,
  PasswordInput,
  Screen,
  Text,
  TextInput,
  TextLink,
} from '@/ui/components/base';
import { Logo } from '@/ui/components/Logo';

export default function SignInScreen() {
  const handleSignIn = () => {
    // TODO: Call sign in mutation
    router.push('/(protected)/(tabs)');
  };

  return (
    <Screen safeArea>
      <Box flex={1} justifyContent="center" gap="s16">
        <Logo />
        <Text variant="title22" alignSelf="center" mb="s16">
          Bem-vindo
        </Text>
        <TextInput label="Email" placeholder="Digite seu email" />
        <PasswordInput label="Senha" placeholder="Digite sua senha" />
        <Link
          href="/" // TODO: Navigate to "/reset-password"
          asChild
        >
          <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
            Esqueceu sua senha
          </Text>
        </Link>
        <Button testID="sign-in-button" title="Entrar" onPress={handleSignIn} />
        <TextLink
          href="/" // TODO: Navigate to "/sign-up"
          text="Ainda não tem uma conta?"
          ctaText="Criar"
        />
      </Box>
    </Screen>
  );
}
