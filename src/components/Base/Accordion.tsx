import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Base/Text';
import theme from '@/theme/theme';
import { PressableBox } from './Box';
import { Icon } from './Icon';

interface AccordionProps {
  title: string;
  content: string;
}

export function Accordion({ title, content }: AccordionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <PressableBox onPress={() => setExpanded(!expanded)}>
      <View>
        <AccordionHeader title={title} expanded={expanded} />
        <AccordionBody expanded={expanded}>
          <Text variant="text12">{content}</Text>
        </AccordionBody>
      </View>
    </PressableBox>
  );
}

type AccordionHeaderProps = {
  title: string;
  expanded: boolean;
};

function AccordionHeader({ title, expanded }: AccordionHeaderProps) {
  return (
    <View style={styles.header}>
      <Text variant="title16" flexShrink={1}>
        {title}
      </Text>
      <Icon
        name={expanded ? 'chevronUp' : 'chevronDown'}
        color={expanded ? 'primary' : 'gray2'}
      />
    </View>
  );
}

type AccordionBodyProps = {
  children: React.ReactNode;
  expanded: boolean;
};

function AccordionBody({ children, expanded }: AccordionBodyProps) {
  return (
    <View style={[styles.body, { display: expanded ? 'flex' : 'none' }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.s8,
    borderWidth: 2,
    borderColor: theme.colors.gray2,
    borderRadius: theme.borderRadii.default,
  },
  body: {
    paddingHorizontal: theme.spacing.s8,
    paddingBottom: theme.spacing.s16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
});
