import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { BlackOpacity } from '@/components/ui/BlackOpacity';
import { Box } from '@/components/ui/Box';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { useAppSafeArea } from '@/hooks';
import { useAppTheme } from '@/theme/useAppTheme';
import type { City } from '@/types';
import { CategoryPill } from './CategoryPill';

type CityDetailsHeaderProps = Pick<City, 'coverImage' | 'categories'>;

export function CityDetailsHeader({
  coverImage,
  categories,
}: CityDetailsHeaderProps) {
  const { spacing } = useAppTheme();
  const { top } = useAppSafeArea();

  return (
    <Box
      position="relative"
      style={{
        marginLeft: -spacing.s16,
        marginRight: -spacing.s16,
        marginBottom: spacing.s32,
      }}
    >
      <ImageBackground
        source={coverImage}
        style={{
          width: '100%',
          height: 250,
          paddingTop: top,
          paddingHorizontal: spacing.s16,
          justifyContent: 'space-between',
        }}
        imageStyle={{ borderBottomRightRadius: 40 }}
      >
        <BlackOpacity />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton icon="chevronLeft" onPress={() => router.back()} />
          <Icon name="favoriteFill" color="pureWhite" size="s32" />
        </Box>

        <Box
          style={{
            flexDirection: 'row',
            gap: spacing.s8,
            bottom: -spacing.s20,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: spacing.s8,
              paddingRight: spacing.s16,
            }}
            style={{
              left: -spacing.s16,
              marginRight: -spacing.s32,
              paddingLeft: spacing.s16,
            }}
          >
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                category={category}
                active={true}
              />
            ))}
          </ScrollView>
        </Box>
      </ImageBackground>
    </Box>
  );
}
