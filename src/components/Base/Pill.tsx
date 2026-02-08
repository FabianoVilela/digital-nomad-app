import { PressableBox } from '@/components/Base/Box';
import { Icon, type IconName } from '@/components/Base/Icon';
import { Text } from '@/components/Base/Text';

export type PillProps = {
  label: string;
  icon: IconName;
  active?: boolean;
  onPress?: () => void;
};

export function Pill({ label, icon, active = false, onPress }: PillProps) {
  return (
    <PressableBox
      {...boxStyle}
      backgroundColor={active ? 'gray1' : 'background'}
      onPress={onPress}
    >
      <Icon name={icon} color={active ? 'primary' : 'gray2'} size="s16" />
      <Text color="pureWhite" variant="text12" lineHeight={0}>
        {label}
      </Text>
    </PressableBox>
  );
}

const boxStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderRadius: 'rounded',
  borderColor: 'gray1',
  paddingHorizontal: 's8',
  paddingVertical: 's12',
  gap: 's4',
} as const;
