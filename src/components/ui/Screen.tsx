import type { PropsWithChildren } from 'react';
import { Box, type BoxProps } from './Box';

export function Screen({ children, ...props }: PropsWithChildren<BoxProps>) {
  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingHorizontal="s16"
      {...props}
    >
      {children}
    </Box>
  );
}
