import Svg, { Path } from 'react-native-svg';
import type { IconComponentProps } from '../Icon';

type IconBaseProps = {
  d: string;
  'aria-label': string;
} & IconComponentProps;

export function IconBase({
  d,
  'aria-label': ariaLabel,
  size,
  color,
}: IconBaseProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      role="img"
    >
      <Path d={d} fill={color} />
    </Svg>
  );
}
