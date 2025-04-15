// useItemDetails.ts
import { useEffect, useState } from 'react';
import { getItemByItemNo } from '@/Services/APIs/';

export const useItemDetails = (itemNo?: string | string[]) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemNo || typeof itemNo !== 'string') {
      setItem(null);
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getItemByItemNo(itemNo);
        setItem(data);
      } catch (err: any) {
        console.error('❌ Error loading item:', err);
        setError(err?.message || 'Failed to load item.');
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [itemNo]);

  return { item, loading, error };
};