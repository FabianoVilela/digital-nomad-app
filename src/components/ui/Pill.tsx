import { Box } from '@/components/ui/Box';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';

export type PillProps = {
  label: string;
  icon: IconName;
  active?: boolean;
};

export function Pill({ label, icon, active = false }: PillProps) {
  return (
    <Box {...boxStyle} backgroundColor={active ? 'gray1' : 'transparent'}>
      <Icon name={icon} color={active ? 'primary' : 'gray2'} size="s16" />
      <Text color="pureWhite" variant="text12" lineHeight={0}>
        {label}
      </Text>
    </Box>
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
