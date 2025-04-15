import { ScrollView, View, Text } from 'react-native';
import { CategoryComponent } from '@/Components/UI';
import { styles } from './CategorySection.styles';

export function CategoryTitle({ name }: { name: string }) {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>({name})</Text>
      <View style={styles.titleUnderline} />
    </View>
  );
}

export function CategoryGridSection({
  data,
  onPress,
}: {
  data: { id: number; name: string; imageUrl: string }[];
  onPress: (id: number) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {data.map((item) => (
        <CategoryComponent
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl || ''}
          onPress={() => onPress(item.id)}
        />
     ))}
    </ScrollView>
  );
}
