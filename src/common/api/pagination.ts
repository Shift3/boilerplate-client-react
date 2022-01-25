import { useCallback, useReducer } from 'react';

// --------------------------------------------------------------------------------------------------------------------
// Public interfaces
// --------------------------------------------------------------------------------------------------------------------
export interface PaginationQueryParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<ResultType> {
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

export interface PaginationConfig {
  // Use either 0-based or 1-based indexing
  basePage: 0 | 1;
  initialPage: number;
  initialPageSize: number;
  minPageSize: number;
  maxPageSize: number;
}

export interface PaginationManager {
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

export type UsePagination = (config?: Partial<PaginationConfig>) => PaginationManager;

// --------------------------------------------------------------------------------------------------------------------
// Private type definitions and variables
// --------------------------------------------------------------------------------------------------------------------
type ReducerState = Pick<
  PaginationManager,
  'page' | 'pageSize' | 'count' | 'pageCount' | 'hasNextPage' | 'hasPreviousPage'
>;

type ReducerAction =
  | { type: `pagination/setPage`; payload: { page: number } }
  | { type: 'pagination/setPageSize'; payload: { size: number } };

// These defaults are set to sane values but can be configured by the developer if needed.
const defaultConfig: PaginationConfig = {
  basePage: 1,
  initialPage: 1,
  initialPageSize: 10,
  minPageSize: 10,
  maxPageSize: 100,
};

// --------------------------------------------------------------------------------------------------------------------
// usePagination Hook
// --------------------------------------------------------------------------------------------------------------------
export const usePagination: UsePagination = (config: Partial<PaginationConfig> = {}) => {
  const { basePage, initialPage, initialPageSize, minPageSize, maxPageSize } = { ...defaultConfig, ...config };

  const initialState: ReducerState = {
    page: initialPage,
    pageSize: initialPageSize,
    count: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  const reducer = useCallback((state: ReducerState = initialState, action: ReducerAction): ReducerState => {
    switch (action.type) {
      case 'pagination/setPage': {
        const { page } = action.payload;
        const { pageCount } = state;
        return page >= basePage && page <= pageCount + basePage - 1 ? { ...state, page } : state;
      }

      case 'pagination/setPageSize': {
        const { size } = action.payload;
        return size >= minPageSize && size <= maxPageSize ? { ...state, pageSize: size } : state;
      }

      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const getPage = useCallback((page: number) => dispatch({ type: 'pagination/setPage', payload: { page } }), []);

  const getNextPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page + 1 } }),
    [],
  );

  const getPreviousPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page - 1 } }),
    [],
  );

  const setPageSize = useCallback(
    (size: number) => dispatch({ type: 'pagination/setPageSize', payload: { size } }),
    [],
  );

  return {
    ...state,
    getPage,
    getNextPage,
    getPreviousPage,
    setPageSize,
  };
};
