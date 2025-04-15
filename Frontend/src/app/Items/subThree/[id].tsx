import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {  Header,  PaginationControls,  SearchBar,  LoadingState, ItemsGrid,} from '@/Components/UI';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';

import { useSearchList, useSmartBack } from '@/Hooks';
import { getItems } from '@/Services/APIs/ItemsServices';

export default function ItemsScreen() {
  const { id, origin } = useLocalSearchParams<{ id: string; origin?: string }>();
  const numericId = Number(id);

  useSmartBack(origin as any);

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    page,
    setPage,
    hasMore,
    loading,
    error,
  } = useSearchList(
    (page, searchTerm, id, type) => getItems(id, type, page, searchTerm),
    {
      id: numericId,
      type: 'subThree',
      skipSearchIfEmpty: true,
    }
  );

  const isEmpty = query.trim() === searchTerm && items.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="Type a name or item number..."
      />

      {loading ? (
        <LoadingState message="Loading items..." />
      ) : error ? (
        <EmptyState
          title="Something went wrong"
          subtitle="Please check your connection or try again later."
        />
      ) : isEmpty ? (
        <EmptyState
          title="No items found"
          subtitle="Try a different search term."
        />
      ) : (
        <>
          <ItemsGrid items={items} origin="/Items/subThree/[id]" />
          <PaginationControls
            page={page}
            hasMore={hasMore}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      )}
    </View>
  );
}
