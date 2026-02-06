import type { SvgProps } from 'react-native-svg';
import type { BoxProps } from '@/components/ui/Box';
import type { Theme, ThemeColors } from '@/theme/theme';
import { useAppTheme } from '@/theme/useAppTheme';

import { type IconName, icons } from './icons';
export type { IconName };

export interface IconProps
  extends Omit<SvgProps, 'color' | 'width' | 'height'>,
    Omit<
      BoxProps,
      | 'children'
      | 'width'
      | 'height'
      | 'style'
      | 'color'
      | 'hitSlop'
      | 'opacity'
      | 'transform'
    > {
  name: IconName;
  size?: keyof Theme['spacing'] | number;
  color?: ThemeColors;
}

export function Icon({
  name,
  size = 's24',
  color = 'gray2',
  style,
  ...props
}: IconProps) {
  const theme = useAppTheme();
  const IconComponent = icons[name];

  const iconSize =
    theme.spacing[size as keyof Theme['spacing']] || theme.spacing.s24;

  const iconColor = theme.colors[color] || (color as string);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={iconSize}
      height={iconSize}
      fill={iconColor}
      color={iconColor}
      style={style}
      {...props}
    />
  );
}
