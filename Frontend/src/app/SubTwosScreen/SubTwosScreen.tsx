import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenContainer, SearchBar } from '@/Components/UI';
import { CategoryGridSection, CategoryTitle, SearchResults, } from '@/Components/Shared';

import { useSubTwos, useSearchList, useSmartBack, } from '@/Hooks';
import { getItems, getSubOnes, getSubThrees, } from '@/Services/APIs';
import { Item } from '@/Types'

export default function SubTwoScreen() {
  const router = useRouter();
  const { subOneId } = useLocalSearchParams();
  const id = Number(subOneId);

  useSmartBack(`/SubOnesScreen/${id}`);

  const {
    data: subTwos = [],
    loading: loadingSubTwos,
    error: errorSubTwos,
  } = useSubTwos(id);

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    loading: loadingItems,
    error: errorItems,
    page,
    setPage,
    hasMore,
  } = useSearchList<Item>(
    (page, searchTerm) => getItems(id, 'subTwo', page, searchTerm),
    { skipSearchIfEmpty: true }
  );

  const [subOneName, setSubOneName] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  useEffect(() => {
    if (!query) {
      getSubOnes(id)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setSubOneName(data[0].name);
          }
        })
        .catch(() => { });
    }
  }, [id]);

  const handleSubTwoPress = async (subTwoId: number) => {
    try {
      setInternalLoading(true);

      const [itemsData, subThreesData] = await Promise.all([
        getItems(subTwoId, 'subTwo', 1),
        getSubThrees(subTwoId),
      ]);

      const target =
        (Array.isArray(itemsData) && itemsData.length > 0) ||
          (Array.isArray(subThreesData) && subThreesData.length === 0)
          ? '/Items/subTwo/[id]'
          : '/SubThreesScreen/[subTwoId]';

      router.push({ pathname: target, params: { id: subTwoId, subTwoId } });
    } catch {
      setInternalError(true);
    } finally {
      setInternalLoading(false);
    }
  };

  const loading = loadingItems || loadingSubTwos || internalLoading;
  const error = errorItems || errorSubTwos || internalError;

  const showSearchResults = !!searchTerm;
  const showSubTwos = !searchTerm && Array.isArray(subTwos) && subTwos.length > 0;

  const isEmptySearch =
    showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptySubTwos = !searchTerm && Array.isArray(subTwos) && subTwos.length === 0;

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={isEmptySearch || isEmptySubTwos}
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

      {!query && subOneName && <CategoryTitle name={subOneName} />}

      {showSearchResults ? (
        <SearchResults
          items={items}
          page={page}
          hasMore={hasMore}
          setPage={setPage}
          origin={`/SubTwosScreen/${id}`}
        />
      ) : showSubTwos ? (
        <CategoryGridSection
          data={subTwos}
          onPress={handleSubTwoPress}
        />
      ) : null}
    </ScreenContainer>
  );
}
