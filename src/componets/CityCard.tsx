import { Text } from '@tamagui/core';
import { Link } from 'expo-router';
import {
  ImageBackground,
  type ImageBackgroundProps,
  Pressable,
} from 'react-native';
import type { CityPreview } from '../types';

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps['style'];
};

export function CityCard({ cityPreview, style }: CityCardProps) {
  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={
            typeof cityPreview.coverImage === 'number'
              ? cityPreview.coverImage
              : { uri: cityPreview.coverImage }
          }
          style={[{ width: '100%', height: 280 }, style]}
          imageStyle={{ borderRadius: 16 }}
        >
          <Text>Click</Text>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
