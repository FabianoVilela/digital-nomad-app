import { Tabs } from 'expo-router';
import { Icon } from '@/components/Base/Icon';
import { useAppTheme } from '@/theme/useAppTheme';

export default function ProtectedTabsLayout() {
  const { colors, spacing, fontSizes, fonts } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingTop: spacing.s12,
          borderTopWidth: 0,
          marginBottom: spacing.s10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray2,
        tabBarLabelStyle: {
          fontFamily: fonts.poppinsRegular,
          fontSize: fontSizes.s12,
          color: colors.text,
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'homeFill' : 'homeOutline'}
              color={color as keyof typeof colors}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon name="explore" color={color as keyof typeof colors} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'personFill' : 'personOutline'}
              color={color as keyof typeof colors}
            />
          ),
        }}
      />
    </Tabs>
  );
}
