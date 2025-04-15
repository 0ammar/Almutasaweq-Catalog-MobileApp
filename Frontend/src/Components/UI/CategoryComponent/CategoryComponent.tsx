import { Text, Image, TouchableOpacity, ViewStyle, View } from 'react-native';
import { styles } from './CategoryComponent.styles';
import React from 'react';

type CategoryComponentProps = {
  name: string;
  imageUrl: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function CategoryComponent({
  name,
  imageUrl,
  onPress,
  style,
}: CategoryComponentProps) {
  const finalImage = { uri: imageUrl };

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageWrapper}>
        <Image
          source={finalImage}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.log('❌ Failed to load image:', imageUrl)}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}
