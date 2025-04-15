import { useEffect, useState, useRef } from 'react';

export type SearchFetchFn<T> = (
  page: number,
  searchTerm: string,
  id?: number,
  type?: 'subTwo' | 'subThree'
) => Promise<T[]>;

export function useSearchList<T>(
  fetchFn: SearchFetchFn<T>,
  options?: {
    id?: number;
    type?: 'subTwo' | 'subThree';
    pageSize?: number;
    skipSearchIfEmpty?: boolean;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pageSize = options?.pageSize ?? 30;

  // debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setSearchTerm(query.trim());
    }, 300);
  }, [query]);

  useEffect(() => {
    const shouldSkip =
      (!searchTerm && options?.skipSearchIfEmpty) &&
      !(options?.id && options?.type);

    if (shouldSkip) {
      setData([]);
      setHasMore(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFn(
          page,
          searchTerm,
          options?.id,
          options?.type
        );

        setData(page === 1 ? result : [...data, ...result]);
        setHasMore(result.length === pageSize);
      } catch (err: any) {
        console.error('❌ Search fetch error:', err);
        setError(err?.message || 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchTerm, page]);

  return {
    data,
    query,
    setQuery,
    searchTerm,
    triggerSearch: setSearchTerm,
    loading,
    error,
    page,
    setPage,
    hasMore,
  };
}
