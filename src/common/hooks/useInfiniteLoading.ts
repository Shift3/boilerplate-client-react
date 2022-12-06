import { PaginatedResult } from 'common/models';
import { useEffect, useMemo, useState } from 'react';
import { UseQuery, UseQueryOptions } from 'rtk-query-config';

export const useInfiniteLoading = <T, ResultType extends PaginatedResult<T>>(
  initialUrl: string,
  useQuery: UseQuery<ResultType>,
  options?: UseQueryOptions,
) => {
  const [url, setUrl] = useState<string | null>(initialUrl);
  const [loadedData, setLoadedData] = useState<T[]>([]);

  const { data, error, isLoading, isFetching } = useQuery(url, options);

  useEffect(() => {
    if (data && !isLoading) {
      setLoadedData(n => [...n, ...data.results]);
    }
  }, [data, isLoading]);

  const hasMore = useMemo(() => {
    if (isLoading || isFetching) return false;
    return !!data?.links.next;
  }, [data, isLoading, isFetching]);

  const fetchMore = () => {
    if (hasMore && data) {
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
