import { View, FlatList } from 'react-native';
import ItemCard from '../ItemCard/ItemCard';
import { Item } from '@/Types';
import { styles } from './ItemsGrid.styles';

type ItemsGridProps = {
  items: Item[];
  origin?: string;
};

export default function ItemsGrid({ items, origin }: ItemsGridProps) {
  const displayedItems = items.length === 1 ? [null, ...items] : items;

  return (
    <FlatList
      data={displayedItems}
      keyExtractor={(item, index) => item ? item.itemNo : `placeholder-${index}`}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) =>
        item
          ? <ItemCard item={item} origin={origin} />
          : <View style={styles.placeholder} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}