import { ImageBackground } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, useWindowDimensions } from 'react-native';
import type { CityPreview } from '@/domain/City';
import { BlackOpacity, Box, Icon, Text } from '@/ui/components/base';
import { useAppTheme } from '@/ui/theme';

type CityCardProps = {
  cityPreview: CityPreview;
  type?: 'small' | 'large';
  disableFavorite?: boolean;
};

export function CityCard({
  cityPreview,
  type = 'large',
  disableFavorite = false,
}: CityCardProps) {
  const { borderRadii } = useAppTheme();
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === 'small' ? { width: cardWith, height: cardHeight } : undefined;
  const imageSource =
    typeof cityPreview.coverImage === 'number'
      ? cityPreview.coverImage
      : { uri: cityPreview.coverImage };

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <ImageBackground
          source={imageSource}
          style={[
            {
              width: '100%',
              height: 280,
            },
            style,
          ]}
          imageStyle={{
            borderRadius: borderRadii.default,
          }}
        >
          <BlackOpacity />
          <Box flex={1} padding="s24" justifyContent="space-between">
            {/* TODO: Implement favorite functionality */}
            <Icon
              name="favoriteFill"
              size="s24"
              color="primary"
              alignSelf="flex-end"
            />
            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
