import { ActivityIndicator } from 'react-native';

import type { ThemeColors, ThemeTextVariants } from '@/theme/theme';

import { Box, PressableBox, type PressableBoxProps } from './Box';
import { Icon, type IconName } from './Icon';
import { Text } from './Text';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'icon';
type ButtonTextVariant = Exclude<ThemeTextVariants, 'defaults'>;
type ButtonIntentVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

const intentColors: Record<ButtonIntentVariant, ThemeColors> = {
  primary: 'primary',
  secondary: 'gray1',
  success: 'fbSuccessSurface',
  warning: 'fbWarningSurface',
  danger: 'fbErrorSurface',
};

interface ButtonProps extends PressableBoxProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  intent?: ButtonIntentVariant;
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: IconName;
  leftIcon?: IconName;
}

// TODO: Need to improve the button component - W.I.P
export function Button({
  title,
  onPress,
  variant = 'solid',
  intent = 'primary',
  disabled = false,
  loading = false,
  rightIcon,
  leftIcon,
}: ButtonProps) {
  const intentColor = intentColors[intent];

  const getButtonStyles = (): {
    backgroundColor: ThemeColors;
    textColor: ThemeColors;
    borderWidth?: number;
    borderColor?: ThemeColors;
    textVariant: ButtonTextVariant;
  } => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: intentColor,
          textColor: 'text',
          textVariant: 'title16',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          textColor: intentColor,
          borderWidth: 1,
          borderColor: intentColor,
          textVariant: 'title16',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          textColor: intentColor,
          textVariant: 'title16',
        };
      case 'icon':
        return {
          backgroundColor: 'transparent',
          textColor: intentColor,
          textVariant: 'title16',
        };
      default:
        return {
          backgroundColor: intentColor,
          textColor: 'text',
          textVariant: 'title16',
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <PressableBox
      onPress={onPress}
      disabled={disabled || loading}
      backgroundColor={buttonStyles.backgroundColor}
      borderWidth={buttonStyles.borderWidth}
      borderColor={buttonStyles.borderColor}
      style={({ pressed }) => ({
        opacity: pressed || disabled || loading ? 0.7 : 1,
      })}
      {...buttonStyle}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Box flexDirection="row" alignItems="center" gap="s8">
          {leftIcon && <Icon name={leftIcon} color={buttonStyles.textColor} />}
          <Text
            color={buttonStyles.textColor}
            variant={buttonStyles.textVariant}
            lineHeight={0}
          >
            {title}
          </Text>
          {rightIcon && (
            <Icon name={rightIcon} color={buttonStyles.textColor} />
          )}
        </Box>
      )}
    </PressableBox>
  );
}

const buttonStyle: PressableBoxProps = {
  borderRadius: 'default',
  padding: 'padding',
  gap: 's8',
  height: 56,
  justifyContent: 'center',
  alignItems: 'center',
};
