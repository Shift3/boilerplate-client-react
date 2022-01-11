import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError, QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseQuery, UseQueryStateOptions, UseQuerySubscription } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useCallback, useState } from 'react';
import { UseQueryStateDefaultResult, UseQuerySubscriptionOptions } from 'rtk-query-config';
import { customBaseQuery } from './customBaseQuery';

export interface PageableQueryParams {
  page: number;
  pageSize: number;
}

export interface PagedResult<ResultType> {
  // A list of objects representing the current page of data in the result set.
  results: ResultType[];

  meta: {
    // The current page in the full result set that the data array represents.
    page: number;
    // The number of items in a page.
    pageSize: number;
    // The total number of items in the full result set.
    count: number;
    // The total number of pages in the full result set.
    pageCount: number;
  };

  links: {
    // Link to get the first page of data.
    fist: string;
    // Link to get the last page of data.
    last: string;
    // Link to get the next page of data. Can be null if the result set does not contain a next page.
    next: string | null;
    // Link to get the previous page of data. Can be null if the result set does not contain a previous page.
    prev: string | null;
  };
}

interface PageableQueryConfig {
  // Use either 0-based or 1-based indexing
  basePage?: 0 | 1;
  initialPage?: number;
  initialPageSize?: number;
  minPageSize?: number;
  maxPageSize?: number;
}

interface PageableQueryManager<ResultType> {
  data: ResultType[];
  // Indicates that the query is currently loading for the first time and has no data yet.
  // This will be true for the first request, but false for subsequent requests.
  isLoading: boolean;
  // Indicates that the query is currently fetching, but might have data from an earlier request.
  // This will be true for both the first and subsequent requests.
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  page: number;
  pageSize: number;
  count: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  getPage: (page: number) => void;
  getNextPage: () => void;
  getPreviousPage: () => void;
  setPageSize: (size: number) => void;
}

type PageableQueryDefinition<ResultType, TagType extends string> = QueryDefinition<
  PageableQueryParams,
  typeof customBaseQuery,
  TagType,
  PagedResult<ResultType>,
  string
>;

type PageableUseQueryHook<ResultType, TagType extends string> = UseQuery<PageableQueryDefinition<ResultType, TagType>>;

// These defaults are set to sane values but can be configured by the developer if needed.
const defaultConfig: Required<PageableQueryConfig> = {
  basePage: 1,
  initialPage: 1,
  initialPageSize: 10,
  minPageSize: 10,
  maxPageSize: 100,
};

export const usePageableQuery = <ResultType, TagType extends string>(
  useQueryHook: PageableUseQueryHook<ResultType, TagType>,
  config?: PageableQueryConfig,
  options?: UseQuerySubscriptionOptions &
    UseQueryStateOptions<
      PageableQueryDefinition<ResultType, TagType>,
      UseQueryStateDefaultResult<PageableQueryDefinition<ResultType, TagType>>
    >,
): PageableQueryManager<ResultType> => {
  // Override config with user provided values if present, otherwise use sane defaults.
  const { basePage, initialPage, initialPageSize, minPageSize, maxPageSize } = {
    ...defaultConfig,
    ...config,
  };

  // Query state
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const { data, isLoading, isFetching, error } = useQueryHook({ page, pageSize }, options);

  // Derived state
  const count = data?.meta.count ?? 0;
  const pageCount = data?.meta.pageCount ?? 0;
  const hasNextPage = !!data && page < basePage + pageCount - 1;
  const hasPreviousPage = !!data && page > basePage;

  // Mutators
  const _getPage = useCallback((_page: number) => {
    if (_page < basePage) {
      return;
    }
    setPage(_page);
  }, []);

  const _getNextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(page => page + 1);
    }
  }, []);

  const _getPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(page => page - 1);
    }
  }, []);

  const _setPageSize = useCallback((size: number) => {
    if (size < minPageSize || size > maxPageSize) {
      return;
    }
    setPageSize(size);
  }, []);

  return {
    data: data?.results ?? [],
    isLoading,
    isFetching,
    error,
    page,
    pageSize,
    count,
    pageCount,
    hasNextPage,
    hasPreviousPage,
    getPage: _getPage,
    getNextPage: _getNextPage,
    getPreviousPage: _getPreviousPage,
    setPageSize: _setPageSize,
  };
};
