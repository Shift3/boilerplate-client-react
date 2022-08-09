import { Filter, FilterOp, isPaginatedResult, PaginatedResult, SortOrder } from 'common/models';
import { useCallback, useEffect, useReducer } from 'react';
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
type SortState = { sortBy: SortOrder | undefined };

type SortActions = {
  // If sortBy is defined, sorts the result set by the specified property and direction.
  // Otherwise, returns the unsorted result set.
  changeSortBy: (sortBy: SortOrder | undefined) => void;
};

type SortManager = SortState & SortActions;

// --------------------------------------------------------------------------------------------------------------------
type FilterState = {
  filters: Filter[];
};

type FilterActions = {
  addFilter: (attribute: string, operation: FilterOp, value: string) => void;
  removeFilter: (attribute: string, operation: FilterOp) => void;
  resetFilters: () => void;
};

type FilterManager = FilterState & FilterActions;

// --------------------------------------------------------------------------------------------------------------------

type SearchTextState = {
  searchText: string;
};

type SearchActions = {
  addSearchText: (searchText: string) => void;
};

// --------------------------------------------------------------------------------------------------------------------
type PSFQueryState = PaginationState & SortState & FilterState & SearchTextState;

type PSFQueryAction =
  | { type: 'pagination/setPage'; payload: { page: number } }
  | { type: 'pagination/setPageSize'; payload: { size: number } }
  | { type: 'sort/setSortBy'; payload: { sortBy: SortOrder | undefined } }
  | { type: 'filter/add'; payload: { attr: string; op: FilterOp; value: string } }
  | { type: 'filter/remove'; payload: { attr: string; op: FilterOp } }
  | { type: 'filter/reset' }
  | { type: 'all/dataUpdated'; payload: { data: PaginatedResult<unknown> | unknown } }
  | { type: 'addSearchText'; payload: { data: string } };

export type PSFQueryManager = PaginationManager & SortManager & FilterManager & SearchActions;

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
    sortBy: undefined,
  };

  const initialFilterState: FilterState = {
    filters: [],
  };

  const initialSearchTextState: SearchTextState = {
    searchText: '',
  };

  const initialState: PSFQueryState = {
    ...initialPaginationState,
    ...initialSortState,
    ...initialFilterState,
    ...initialSearchTextState,
  };

  // Set up the reducer that will create and manage the pagination, sort, and filter states of the query.
  // `useReducer` was prefferred over`useState` here because:
  //    - the state update logic is complex and the next state often depends on the previous state
  //    - there is a lot of state and individual calls to `useState` would be less performant
  const reducer = (state: PSFQueryState = initialState, action: PSFQueryAction): PSFQueryState => {
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
          const pageCount = Math.ceil(state.count / pageSize);
          return { ...state, pageSize, pageCount };
        }

        return state;
      }

      case 'sort/setSortBy': {
        const { sortBy } = action.payload;
        const { basePage } = config;
        // Reset page to the first page since changing sorting will change the contents of all the pages.
        return { ...state, page: basePage, sortBy };
      }

      case 'filter/add': {
        const { basePage } = config;
        const { filters: oldFilters } = state;
        const { payload } = action;

        const existingFilter = oldFilters.find(filter => filter.attr === payload.attr);
        let newFilters;
        if (existingFilter) {
          newFilters = [...oldFilters.filter(filter => filter.attr !== payload.attr), payload];
        } else {
          newFilters = [...oldFilters, payload];
        }

        return { ...state, page: basePage, filters: newFilters };
      }

      case 'filter/remove': {
        const { basePage } = config;
        const { payload } = action;
        const { filters } = state;
        const newFilters = filters.filter(filter => filter.attr !== payload.attr && filter.op !== payload.op);
        return { ...state, page: basePage, filters: newFilters };
      }

      case 'filter/reset': {
        const { basePage } = config;
        return { ...state, page: basePage, filters: [] };
      }

      case 'addSearchText': {
        const { payload } = action;
        const page = state.searchText !== payload.data ? 1 : state.page;
        return { ...state, searchText: payload.data, page };
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
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Use the query hook.
  const { page, pageSize, sortBy, filters, searchText } = state;
  const queryArg = { page, pageSize, sortBy, filters, searchText };
  const queryResult = useQuery(queryArg, options);

  // Certain metadata is returned as part of the response from the server. For example, `count` and `pageCount`
  // are returned as part of the paginated result and can't be known ahead of time. Whenever the data is updated
  // we need to dispatch an action that updates the state that depends on this metadata.
  const hasData = !!queryResult?.data;
  useEffect(
    () => {
      dispatch({ type: 'all/dataUpdated', payload: { data: queryResult?.data } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasData],
  );

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

  const changeSortBy = useCallback(
    (sortBy: SortOrder | undefined) => dispatch({ type: 'sort/setSortBy', payload: { sortBy } }),
    [dispatch],
  );

  const addFilter = useCallback(
    (attr: string, op: FilterOp, value: string) => dispatch({ type: 'filter/add', payload: { attr, op, value } }),
    [dispatch],
  );

  const removeFilter = useCallback(
    (attr: string, op: FilterOp) => dispatch({ type: 'filter/remove', payload: { attr, op } }),
    [dispatch],
  );

  const addSearchText = useCallback(
    (searchText: string) => dispatch({ type: 'addSearchText', payload: { data: searchText } }),
    [dispatch],
  );

  const resetFilters = useCallback(() => dispatch({ type: 'filter/reset' }), [dispatch]);

  return {
    ...queryResult,
    ...state,
    getPage,
    getPreviousPage,
    getNextPage,
    changePageSize,
    changeSortBy,
    addFilter,
    removeFilter,
    resetFilters,
    addSearchText,
  };
};
