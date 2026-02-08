import { Box } from '@/components/ui/Box';

type BlackOpacityProps = {
  opacity?: number;
};

export function BlackOpacity({ opacity = 0.25 }: BlackOpacityProps) {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="midnightBlack"
      opacity={opacity}
    />
  );
}
