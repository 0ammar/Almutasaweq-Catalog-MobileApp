// SearchResults.tsx
import { View } from 'react-native';
import { ItemsGrid } from '@/Components/UI';
import { PaginationControls } from '@/Components/UI';
import { styles } from './SearchResults.styles';

type Props = {
  items: any[];
  page: number;
  hasMore: boolean;
  setPage: (fn: (p: number) => number) => void;
  origin: string; 
};

export default function SearchResults({ items, page, hasMore, setPage, origin }: Props) {
  return (
    <View style={styles.container}>
      <ItemsGrid items={items} origin={origin} />
      <PaginationControls
        page={page}
        hasMore={hasMore}
        onNext={() => setPage((p) => p + 1)}
        onBack={() => setPage((p) => Math.max(1, p - 1))}
      />
    </View>
  );
}
