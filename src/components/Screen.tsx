import { View, type ViewProps } from '@/components/View';

export function Screen({
  children,
  ...props
}: React.PropsWithChildren & ViewProps) {
  return (
    <View backgroundColor="$background" paddingHorizontal="$s16" {...props}>
      {children}
    </View>
  );
}
