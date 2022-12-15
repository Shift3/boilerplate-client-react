import { PaginatedResult } from 'common/models';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseQuery, UseQueryOptions } from 'rtk-query-config';

export const useInfiniteLoading = <T, ResultType extends PaginatedResult<T>>(
  initialUrl: string,
  useQuery: UseQuery<ResultType>,
  options?: UseQueryOptions,
) => {
  const [url, setUrl] = useState<string | null>(initialUrl);
  const [loadedData, setLoadedData] = useState<T[]>([]);
  const rerenderingType = useRef<string>('clear');

  const { data, error, isLoading, isFetching } = useQuery(url, options);

  useEffect(() => {
    const clear = () => {
      rerenderingType.current = 'clear';
      setLoadedData([]);
      setUrl(initialUrl);
    };

    if (data && !isLoading) {
      setLoadedData(n => [...n, ...data.results]);
    }

    return () => {
      if (rerenderingType.current === 'clear') {
        clear();
      }
      if (rerenderingType.current === 'fetchMore') {
        rerenderingType.current = 'clear';
      }
    };
  }, [data, isLoading, initialUrl]);

  const hasMore = useMemo(() => {
    if (isLoading || isFetching) return false;
    return !!data?.links.next;
  }, [data, isLoading, isFetching]);

  const fetchMore = () => {
    if (hasMore && data) {
      rerenderingType.current = 'fetchMore';
      setUrl(data.links.next);
    }
  };

  return {
    loadedData,
    error,
    isLoading,
    isFetching,
    totalCount: data?.meta.count,
    hasMore,
    fetchMore,
  };
};
