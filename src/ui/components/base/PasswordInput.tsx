// TODO: https://lucide.dev/guide/packages/lucide-react-native#icon-component-example
import Eye from 'lucide-react-native/dist/esm/icons/eye';
import EyeOff from 'lucide-react-native/dist/esm/icons/eye-off';

import { useState } from 'react';
import { Pressable, type TextInputProps } from 'react-native';
import { useAppTheme } from '@/ui/theme';
import { TextInput } from './TextInput';

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label: string;
  errorMessage?: string;
};

export function PasswordInput(props: PasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);
  const { colors } = useAppTheme();

  const toggleSecure = () => setIsSecure((prev) => !prev);

  const EyeIcon = isSecure ? EyeOff : Eye;

  return (
    <TextInput
      {...props}
      secureTextEntry={isSecure}
      rightComponent={
        <Pressable
          onPress={toggleSecure}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          accessibilityRole="button"
          accessibilityLabel={isSecure ? 'Exibir senha' : 'Ocultar senha'}
        >
          <EyeIcon size={20} color={colors.gray2} />
        </Pressable>
      }
    />
  );
}
