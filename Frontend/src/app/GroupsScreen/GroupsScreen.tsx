import { useRouter } from 'expo-router';

import { ScreenContainer, SearchBar } from '@/Components/UI';
import { CategoryGridSection, SearchResults } from '@/Components/Shared';

import { useGroups, useSearchList } from '@/Hooks';
import { getItems } from '@/Services/APIs/ItemsServices';
import { Item } from '@/Types';
import { View, Text } from 'react-native';

export default function GroupsScreen() {
  const router = useRouter();

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useGroups();

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    loading: loadingItems,
    error: errorItems,
    hasMore,
    page,
    setPage,
  } = useSearchList<Item>(
    (page, searchTerm) => getItems(undefined, undefined, page, searchTerm),
    { skipSearchIfEmpty: true }
  );

  const loading = loadingCategories || loadingItems;
  const error = errorCategories || errorItems;

  const showSearchResults = !!searchTerm;
  const showCategories = !searchTerm && Array.isArray(categories) && categories.length > 0;

  const isEmptySearch = showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptyCategories = !searchTerm && (!Array.isArray(categories) || categories.length === 0);

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={isEmptySearch || isEmptyCategories}
      emptyTitle={isEmptySearch ? 'No items found' : 'No categories found'}
      emptySubtitle={
        isEmptySearch
          ? 'Try a different name or item number.'
          : 'Please add some groups first.'
      }
    >

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="Type a name or item number..."
      />
      {showSearchResults ? (
        <SearchResults
          items={items}
          page={page}
          hasMore={hasMore}
          setPage={setPage}
          origin="/GroupsScreen"
        />

      ) : showCategories ? (
        <CategoryGridSection
          data={categories}
          onPress={(groupId) =>
            router.push({
              pathname: '/SubOnesScreen/[groupId]',
              params: { groupId: String(groupId) },
            })
          }
        />

      ) : null}
    </ScreenContainer>
  );
}
