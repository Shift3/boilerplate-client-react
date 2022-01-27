import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import {
  UseQuery,
  UseQueryStateOptions,
  UseQueryStateResult,
  UseQuerySubscription,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { customBaseQuery } from 'common/api/customBaseQuery';
import { PaginationQueryParams } from 'common/models';
import { useCallback, useMemo, useReducer } from 'react';
import { UseQuerySubscriptionOptions } from 'rtk-query-config';

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

type PaginationManager = PaginationState & PaginationActions;

// --------------------------------------------------------------------------------------------------------------------
type SortState = {
  // TODO
};

type SortActions = {
  // TODO
};

type SortManager = SortState & SortActions;

const initialSortState: SortState = {
  // TODO
};

// --------------------------------------------------------------------------------------------------------------------
type FilterState = {
  // TODO
};

type FilterActions = {
  // TODO
};

type FilterManager = FilterState & FilterActions;

const initialFilterState: FilterState = {
  // TODO
};

// --------------------------------------------------------------------------------------------------------------------
type PSFQueryState = PaginationState & SortState & FilterState;

type PSFQueryManager = PaginationManager & SortManager & FilterManager;

type PSFQueryAction =
  | { type: 'pagination/setPage'; payload: { page: number } }
  | { type: 'pagination/setPageSize'; payload: { size: number } };

// --------------------------------------------------------------------------------------------------------------------
type QueryArg = PaginationQueryParams;

type QueryDef<ResultType> = QueryDefinition<QueryArg, typeof customBaseQuery, string, ResultType, string>;

type UseQueryHook<ResultType> = UseQuery<QueryDef<ResultType>>;

type QueryResult<ResultType> = UseQueryStateResult<QueryDef<ResultType>, Record<string, any>> &
  ReturnType<UseQuerySubscription<QueryDef<ResultType>>>;

type QueryOptions<ResultType> = UseQuerySubscriptionOptions &
  UseQueryStateOptions<QueryDef<ResultType>, Record<string, any>>;

// --------------------------------------------------------------------------------------------------------------------

export const usePSFQuery = <ResultType>(
  useQuery: UseQueryHook<ResultType>,
  options?: QueryOptions<ResultType>,
): QueryResult<ResultType> & PSFQueryManager => {
  // Set up the reducer that will create and manage the pagination, sort, and filter states of the query.
  // `useReducer` was prefferred over`useState` here because:
  //    - the state update logic is complex and the next state often depends on the previous state
  //    - there is a lot of state and individual calls to `useState` would be less performant
  const initialState: PSFQueryState = useMemo(
    () => ({
      // pagination
      page: 1,
      pageSize: 10,
      count: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      // TODO: sort
      // TODO: filter
    }),
    [],
  );

  const reducer = useCallback((state: PSFQueryState = initialState, action: PSFQueryAction): PSFQueryState => {
    switch (action.type) {
      case 'pagination/setPage': {
        const { page } = action.payload;
        return { ...state, page };
      }

      case 'pagination/setPageSize': {
        const { size: pageSize } = action.payload;
        return { ...state, pageSize };
      }

      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Use the query hook.
  const { page, pageSize } = state;
  const queryArg = { page, pageSize };
  const result = useQuery(queryArg, options);

  // Additional action dispatchers that will be exposed as part of the public interface of the query manager.
  // Components or other custom hooks using the usePSFQuery hook can use these methods to update the pagination,
  // sort, and filter states of the query.
  const getPage = useCallback(
    (page: number) => dispatch({ type: 'pagination/setPage', payload: { page } }),
    [dispatch],
  );

  const getPreviousPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page - 1 } }),
    [dispatch],
  );

  const getNextPage = useCallback(
    () => dispatch({ type: 'pagination/setPage', payload: { page: state.page + 1 } }),
    [dispatch],
  );

  const changePageSize = useCallback(
    (size: number) => dispatch({ type: 'pagination/setPageSize', payload: { size } }),
    [dispatch],
  );

  return {
    ...result,
    ...state,
    getPage,
    getPreviousPage,
    getNextPage,
    changePageSize,
  };
};
