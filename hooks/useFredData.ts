import { useState, useEffect } from 'react';
import { fetchFredData, FredObservation } from '@/lib/fred-api';

export function useFredData(
  seriesId: string,
  startDate?: string,
  endDate?: string
) {
  const [data, setData] = useState<FredObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFredData(seriesId, startDate, endDate);

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [seriesId, startDate, endDate]);

  return { data, loading, error };
}
