import { type Theme, type ThemeColors, useAppTheme } from '@/ui/theme';
import { PressableBox, type PressableBoxProps } from './Box';
import { Icon, type IconName } from './Icon';

interface IconButtonProps extends PressableBoxProps {
  icon: IconName;
  size?: keyof Theme['spacing'];
  iconColor?: ThemeColors;
}

export function IconButton({
  icon,
  onPress,
  size = 's48',
  iconColor = 'pureWhite',
  ...props
}: IconButtonProps) {
  const { spacing } = useAppTheme();

  return (
    <PressableBox
      onPress={onPress}
      {...iconButtonStyle}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        width: spacing[size],
        height: spacing[size],
        // boxShadow: boxShadows.primary, // TODO: Set when on focus (needs to be implemented)
      })}
      {...props}
    >
      <Icon name={icon} color={iconColor} />
    </PressableBox>
  );
}

const iconButtonStyle: PressableBoxProps = {
  borderRadius: 'rounded',
  backgroundColor: 'primary',
  alignItems: 'center',
  justifyContent: 'center',
};
