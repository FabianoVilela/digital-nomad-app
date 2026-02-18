import { StyleSheet, View } from 'react-native';
import Animated, {
  type DerivedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/ui/theme';
import { PressableBox } from './Box';
import { Icon } from './Icon';
import { Text } from './Text';

interface AccordionProps {
  title: string;
  content: string;
}

export function Accordion({ title, content }: AccordionProps) {
  const expanded = useSharedValue(false);
  const animationProgress = useDerivedValue<number>(() => {
    return withTiming(expanded.value ? 1 : 0, { duration: 250 });
  });

  function toggleExpanded() {
    expanded.value = !expanded.value;
  }

  return (
    <PressableBox onPress={toggleExpanded}>
      <View>
        <AccordionHeader title={title} animationProgress={animationProgress} />
        <AccordionBody animationProgress={animationProgress}>
          <Text variant="text12">{content}</Text>
        </AccordionBody>
      </View>
    </PressableBox>
  );
}

type AccordionHeaderProps = {
  title: string;
  animationProgress: DerivedValue<number>;
};

function AccordionHeader({ title, animationProgress }: AccordionHeaderProps) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animationProgress.value,
        [0, 1],
        [theme.colors.background, theme.colors.gray1],
      ),
      borderBottomWidth: interpolate(animationProgress.value, [0, 1], [2, 0]),
      borderBottomLeftRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [theme.borderRadii.default, 0],
      ),
      borderBottomRightRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [theme.borderRadii.default, 0],
      ),
    };
  });

  const iconRotation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${animationProgress.value * 180}deg`,
        },
      ],
    };
  });

  const iconCollapsedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
    };
  });

  const iconExpandedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStyles]}>
      <Text variant="title16" flexShrink={1}>
        {title}
      </Text>

      <Animated.View style={iconRotation}>
        <Animated.View style={iconCollapsedStyle}>
          <Icon name="chevronDown" color="gray2" />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, iconExpandedStyle]}>
          <Icon name="chevronDown" color="primary" />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

type AccordionBodyProps = {
  children: React.ReactNode;
  animationProgress: DerivedValue<number>;
};

function AccordionBody({ children, animationProgress }: AccordionBodyProps) {
  const height = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(animationProgress.value, [0, 1], [0, height.value]),
      opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
      borderTopLeftRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [theme.borderRadii.default, 0],
      ),
      borderTopRightRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [theme.borderRadii.default, 0],
      ),
    };
  });

  return (
    <Animated.View style={[animatedStyles, { overflow: 'hidden' }]}>
      <View
        style={styles.body}
        onLayout={({ nativeEvent }) => {
          height.value = nativeEvent.layout.height;
        }}
      >
        {children}
      </View>
    </Animated.View>
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
    borderTopLeftRadius: theme.borderRadii.default,
    borderTopRightRadius: theme.borderRadii.default,
  },
  body: {
    position: 'absolute',
    paddingHorizontal: theme.spacing.s8,
    paddingBottom: theme.spacing.s16,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: theme.colors.gray2,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
});
