import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Header, SearchBar, PaginationControls, LoadingState, ItemsGrid, } from '@/Components/UI';
import { EmptyState } from '@/Components/Shared';

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
    triggerSearch,
    loading,
    error,
    page,
    setPage,
    hasMore,
  } = useSearchList(
    (page, searchTerm, id, type) => getItems(id, type, page, searchTerm),
    {
      id: numericId,
      type: 'subTwo',
      skipSearchIfEmpty: true,
    }
  );

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
      ) : items.length === 0 ? (
        <EmptyState
          title="No items found"
          subtitle="Try a different search term."
        />
      ) : (
        <>
          <ItemsGrid items={items} origin="/Items/subTwo/[id]" />
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
