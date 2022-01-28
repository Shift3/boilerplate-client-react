import { isPaginatedResult, PaginatedResult } from 'common/models';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { UseQuery, UseQueryOptions, UseQueryResult } from 'rtk-query-config';

// --------------------------------------------------------------------------------------------------------------------
type PaginationState = {
  page: number;
  pageSize: number;
  count: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

type PaginationActions = {
  getPage: (page: number) => void;
  getNextPage: () => void;
  getPreviousPage: () => void;
  changePageSize: (size: number) => void;
};

type PaginationConfig = {
  basePage: 0 | 1;
  initialPage: number;
  initialPageSize: number;
  minPageSize: number;
  maxPageSize: number;
};

type PaginationManager = PaginationState & PaginationActions;

const defaultPaginationConfig: PaginationConfig = {
  basePage: 1,
  initialPage: 1,
  initialPageSize: 10,
  minPageSize: 1,
  maxPageSize: 100,
};

// --------------------------------------------------------------------------------------------------------------------
type SortState = {
  // TODO
};

type SortActions = {
  // TODO
};

type SortManager = SortState & SortActions;

// --------------------------------------------------------------------------------------------------------------------
type FilterState = {
  // TODO
};

type FilterActions = {
  // TODO
};

type FilterManager = FilterState & FilterActions;

// --------------------------------------------------------------------------------------------------------------------
type PSFQueryState = PaginationState & SortState & FilterState;

type PSFQueryAction =
  | { type: 'pagination/setPage'; payload: { page: number } }
  | { type: 'pagination/setPageSize'; payload: { size: number } }
  | { type: 'all/dataUpdated'; payload: { data: PaginatedResult<unknown> | unknown } };

export type PSFQueryManager = PaginationManager & SortManager & FilterManager;

export type PSFConfig = PaginationConfig;

// --------------------------------------------------------------------------------------------------------------------

export const usePSFQuery = <ResultType>(
  useQuery: UseQuery<ResultType>,
  options?: UseQueryOptions,
  psfConfig?: Partial<PSFConfig>,
): UseQueryResult<ResultType> & PSFQueryManager => {
  // Override default configs with user specified configs if provided.
  const config = { ...defaultPaginationConfig, ...(psfConfig ?? {}) };

  const initialPaginationState: PaginationState = {
    page: config.initialPage,
    pageSize: config.initialPageSize,
    count: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  const initialSortState: SortState = {
    // TODO
  };

  const initialFilterState: FilterState = {
    // TODO
  };

  // Set up the reducer that will create and manage the pagination, sort, and filter states of the query.
  // `useReducer` was prefferred over`useState` here because:
  //    - the state update logic is complex and the next state often depends on the previous state
  //    - there is a lot of state and individual calls to `useState` would be less performant
  const initialState: PSFQueryState = useMemo(
    () => ({
      ...initialPaginationState,
      ...initialSortState,
      ...initialFilterState,
    }),
    [],
  );

  const reducer = useCallback((state: PSFQueryState = initialState, action: PSFQueryAction): PSFQueryState => {
    switch (action.type) {
      case 'pagination/setPage': {
        const { page } = action.payload;
        const { basePage } = config;
        const { pageCount } = state;
        const lastPage = basePage + pageCount - 1;

        if (basePage <= page && page <= lastPage) {
          const hasPreviousPage = basePage < page;
          const hasNextPage = page < lastPage;
          return { ...state, page, hasPreviousPage, hasNextPage };
        }

        return state;
      }

      case 'pagination/setPageSize': {
        const { size } = action.payload;
        const { minPageSize, maxPageSize } = config;

        if (minPageSize <= size && size <= maxPageSize) {
          const pageSize = size;
          return { ...state, pageSize };
        }

        return state;
      }

      case 'all/dataUpdated': {
        const { data } = action.payload;
        let newState = { ...state };

        // If the data is paginated, we need to update the count and pageCount in case the values
        // have changed (e.g. a filter was applied and the result set is smaller). This also
        // requires re-calculating if there are previous and next pages.
        if (isPaginatedResult(data)) {
          const { count, pageCount } = data.meta;
          const { basePage } = config;
          const { page } = state;
          const lastPage = basePage + pageCount - 1;
          const hasPreviousPage = pageCount > 0 && page > basePage;
          const hasNextPage = pageCount > 0 && page < lastPage;
          newState = { ...newState, count, pageCount, hasPreviousPage, hasNextPage };
        }

        return newState;
      }

      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Use the query hook.
  const { page, pageSize } = state;
  const queryArg = { page, pageSize };
  const queryResult = useQuery(queryArg, options);

  // Certain metadata is returned as part of the response from the server. For example, `count` and `pageCount`
  // are returned as part of the paginated result and can't be known ahead of time.
  useEffect(() => {
    console.log('new data');
    dispatch({ type: 'all/dataUpdated', payload: { data: queryResult.data } });
  }, [queryResult.isSuccess]);

  // Additional action dispatchers that will be exposed as part of the public interface of the query manager.
  // Components or other custom hooks using the usePSFQuery hook can use these methods to update the pagination,
  // sort, and filter states of the query.
  const getPage = useCallback(
    (page: number) => dispatch({ type: 'pagination/setPage', payload: { page } }),
    [dispatch],
  );

  const getPreviousPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page - 1 } }),
    [dispatch, state.page],
  );

  const getNextPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page + 1 } }),
    [dispatch, state.page],
  );

  const changePageSize = useCallback(
    (size: number) => dispatch({ type: 'pagination/setPageSize', payload: { size } }),
    [dispatch],
  );

  return {
    ...queryResult,
    ...state,
    getPage,
    getPreviousPage,
    getNextPage,
    changePageSize,
  };
};