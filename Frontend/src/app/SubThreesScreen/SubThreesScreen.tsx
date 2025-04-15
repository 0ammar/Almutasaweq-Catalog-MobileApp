import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenContainer, SearchBar, ItemsGrid, PaginationControls, } from '@/Components/UI';
import { CategoryGridSection, CategoryTitle, } from '@/Components/Shared';

import { useSubThrees, useSearchList, useSmartBack, } from '@/Hooks';
import { getItems, getSubTwos } from '@/Services/APIs';
import { Item } from '@/Types'

export default function SubThreesScreen() {
  const router = useRouter();
  const { subTwoId } = useLocalSearchParams();
  const id = Number(subTwoId);

  useSmartBack(`/SubTwosScreen/${id}`);

  const {
    data: subThrees = [],
    loading: subThreesLoading,
    error: subThreesError,
  } = useSubThrees(id);

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    loading: searchLoading,
    error: searchError,
    page,
    hasMore,
    setPage,
  } = useSearchList<Item>(
    (page, searchTerm) => getItems(id, 'subThree', page, searchTerm),
    { skipSearchIfEmpty: true }
  );

  const [subTwoName, setSubTwoName] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      getSubTwos(id)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setSubTwoName(data[0].name);
          }
        })
        .catch(() => { });
    }
  }, [id]);

  const isEmptySearch =
    !!searchTerm && query.trim() === searchTerm && items.length === 0;
  const isEmptySubThrees = !searchTerm && Array.isArray(subThrees) && subThrees.length === 0;

  const loading = searchLoading || subThreesLoading;
  const error = !!searchError || !!subThreesError;
  const showSearchResults = !!searchTerm;
  const showSubThrees = !searchTerm && Array.isArray(subThrees) && subThrees.length > 0;

  return (
    <ScreenContainer
      loading={loading}
      error={error}
      empty={isEmptySearch || isEmptySubThrees}
      emptyTitle={isEmptySearch ? 'No items found' : 'No categories found'}
      emptySubtitle={
        isEmptySearch
          ? 'Try a different name or item number.'
          : 'This section has no sub-categories.'
      }
    >
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="Type a name or item number..."
      />

      {!query && subTwoName && <CategoryTitle name={subTwoName} />}

      {showSearchResults ? (
        <>
          <ItemsGrid items={items} origin={`/SubThreesScreen/${id}`} />
          <PaginationControls
            page={page}
            hasMore={hasMore}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      ) : showSubThrees ? (
        <CategoryGridSection
          data={subThrees}
          onPress={(id) =>
            router.push({
              pathname: '/Items/subThree/[id]',
              params: { id },
            })
          }
        />
      ) : null}
    </ScreenContainer>
  );
}