import type { IconComponentProps } from '../Icon';
import { IconBase } from './IconBase';

export function LogoutIcon({ color, size }: IconComponentProps) {
  return (
    <IconBase
      size={size}
      color={color}
      aria-label="Logout icon"
      d="M5.16947 21.4805C4.43114 21.4805 3.80489 21.2234 3.29072 20.7092C2.77655 20.1951 2.51947 19.5688 2.51947 18.8305V5.1695C2.51947 4.43117 2.77655 3.80492 3.29072 3.29075C3.80489 2.77658 4.43114 2.5195 5.16947 2.5195H12.113V5.1695H5.16947V18.8305H12.113V21.4805H5.16947ZM15.8162 17.6783L13.975 15.7902L16.4402 13.325H8.88697V10.675H16.4402L13.975 8.20975L15.8162 6.32175L21.4805 12L15.8162 17.6783Z"
    />
  );
}
