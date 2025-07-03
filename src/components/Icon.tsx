import { colors, icons as iconSizes } from '@/theme';
import { icons } from './icons';

type IconName = keyof typeof icons;
type ThemeColor = keyof typeof colors;
type IconSize = keyof typeof iconSizes;

const ICON_DEFAULT_COLOR: ThemeColor = 'stoneGrey';
const ICON_DEFAULT_SIZE: IconSize = 'md';

export type IconProps = {
  name: IconName;
  color?: ThemeColor;
  size?: IconSize;
};

export type IconComponentProps = {
  color: string;
  size: number;
};

export const Icon = ({
  name,
  color = ICON_DEFAULT_COLOR,
  size = ICON_DEFAULT_SIZE,
}: IconProps) => {
  const IconComponent = icons[name];
  const iconColor = colors[color];
  const iconSize = iconSizes[size];

  return <IconComponent color={iconColor} size={iconSize} />;
};
