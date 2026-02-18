import { createText } from '@shopify/restyle';
import { Platform, type StyleProp, type TextStyle } from 'react-native';
import type { Theme } from '@/ui/theme';

const RestyleText = createText<Theme>();

type RestyleTextProps = React.ComponentProps<typeof RestyleText>;

/**
 * Cross-platform Text component that handles vertical alignment issues
 * between iOS and Android when using lineHeight with custom fonts.
 *
 * The Poppins font has different ascender/descender metrics that cause
 * misalignment. This component compensates for these differences.
 *
 * Android: Uses includeFontPadding: false and textAlignVertical: 'center'
 * iOS: Adds paddingTop to compensate for font metrics offset
 */
export function Text({ style, ...props }: RestyleTextProps) {
  const platformStyle: TextStyle = Platform.select({
    ios: {
      // Poppins font has ascender metrics that push text upward on iOS.
      // Adding a small paddingTop compensates for this offset.
      paddingTop: 2,
    },
    default: {},
  }) as TextStyle;

  return (
    <RestyleText
      style={[platformStyle, style as StyleProp<TextStyle>]}
      {...props}
    />
  );
}
