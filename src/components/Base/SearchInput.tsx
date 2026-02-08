import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { Box, type BoxProps } from '@/components/Base/Box';
import { IconButton } from '@/components/Base/IconButton';
import { useAppTheme } from '@/theme/useAppTheme';

type SearchInputProps = TextInputProps & {
  showButton?: boolean;
};

export function SearchInput({
  value,
  onPress,
  onChangeText,
  showButton = true,
  ...props
}: SearchInputProps) {
  const { colors, spacing, textVariants } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value && value.length > 0;

  function onPressIconButton() {
    if (hasValue) {
      onChangeText?.('');
    }
  }

  return (
    <Box
      {...boxStyle}
      style={{ borderColor: isFocused ? colors.primary : colors.gray1 }}
    >
      <TextInput
        placeholderTextColor={colors.text}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          color: colors.text,
          paddingHorizontal: spacing.s10,
          ...textVariants.text16,
        }}
        {...props}
      />
      {showButton && (
        <IconButton
          icon={hasValue ? 'close' : 'searchOutline'}
          onPress={onPressIconButton}
          size="s48"
        />
      )}
    </Box>
  );
}

const boxStyle: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'gray1',
  alignContent: 'space-between',
  borderRadius: 'rounded',
  padding: 's8',
  borderWidth: 2,
  height: 65,
};
