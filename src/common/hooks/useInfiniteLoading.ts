import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { PaginatedResult } from 'common/models';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { UseQuery, UseQueryOptions } from 'rtk-query-config';

export interface WithIdentifier {
  id?: number | string;
}

interface State<T> {
  items: T[];
  nextItemUrl: string | null;
  count: number;
  isGettingMore: boolean;
  isResetting: boolean;
}

const initialState = {
  items: [],
  nextItemUrl: null,
  count: 0,
  isGettingMore: false,
  isResetting: false
};

type Action<T> =
  | { type: 'addOneToFront'; item: T }
  | { type: 'addMultipleToBack'; items: T[]; totalCount: number }
  | { type: 'set-next-item-url'; nextItemUrl: string | null }
  | { type: 'reset-get-more' }
  | { type: 'remove'; item: T }
  | { type: 'reset'; nextItemUrl: string | null };

const reducer = <T extends WithIdentifier>(state: State<T>, action: Action<T>) => {
  switch (action.type) {
    case 'addOneToFront':
      return { ...state, items: [action.item, ...state.items], count: state.count + 1 };
    case 'addMultipleToBack':
      return { ...state, items: [...state.items, ...action.items], count: action.totalCount, isResetting: false };
    case 'remove':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.item.id),
        count: state.count - 1,
      };
    case 'reset':
      return { ...initialState, nextItemUrl: action.nextItemUrl, isResetting: true };
    case 'set-next-item-url':
      return { ...state, nextItemUrl: action.nextItemUrl, isGettingMore: true, allItemsRemoved: false };
    default:
      return { ...initialState };
  }
};

export const useInfiniteLoading = <T extends WithIdentifier, ResultType extends PaginatedResult<T>>(
  initialUrl: string | null,
  useQuery: UseQuery<ResultType>,
  api?: any,
  options?: UseQueryOptions,
) => {
  const [{ items, nextItemUrl, count, isGettingMore, isResetting }, itemDispatch] = useReducer(reducer, {
    ...initialState,
    nextItemUrl: initialUrl,
  });
  const dispatch = useDispatch();

  const { data: fetchedItems, isFetching, isLoading, refetch, error } = useQuery(nextItemUrl, options);

  const addOneToFront = useCallback(
    (newItem: T) => {
      itemDispatch({ type: 'addOneToFront', item: newItem });
    },
    [itemDispatch],
  );

  const clear = useCallback(() => {
    itemDispatch({ type: 'reset', nextItemUrl: initialUrl });
  }, [itemDispatch, initialUrl, dispatch, api]);

  const remove = useCallback(
    (itemToRemove: T) => {
      itemDispatch({ type: 'remove', item: itemToRemove });
    },
    [itemDispatch],
  );

  useEffect(() => {
    if (isResetting) {
      dispatch(api.util.invalidateTags([
        { type: 'AppNotification' },
      ]));
    }
  }, [isResetting]);

  const hasMore = useMemo(() => {
    if (isLoading || isFetching) return false;
    return !!fetchedItems?.links.next;
  }, [fetchedItems, isLoading, isFetching]);

  const getMore = useCallback(() => {
    if (fetchedItems?.links.next && !isFetching) {
      itemDispatch({ type: 'set-next-item-url', nextItemUrl: fetchedItems.links.next });
    }
  }, [itemDispatch, isFetching, fetchedItems]);

  // Clear the items when the user's internet connection is restored
  useEffect(() => {
    if (!isLoading && isFetching && !isGettingMore) {
      clear();
    }
  }, [isLoading, isFetching, isGettingMore, clear]);

  // Append new items that we got from the API to
  // the items list
  useEffect(() => {
    itemDispatch({
      type: 'addMultipleToBack',
      items: fetchedItems?.results || [],
      totalCount: fetchedItems?.meta.count || 0,
    });
  }, [fetchedItems]);

  const itemProviderValue = useMemo(() => {
    const result = {
      items: items as T[],
      count,
      hasMore,
      isFetching,
      isLoading,
      remove,
      clear,
      getMore,
      refetch,
      addOneToFront,
      error,
    };
    return result;
  }, [clear, remove, getMore, hasMore, items, count, isFetching, isLoading, addOneToFront, refetch, error]);

  return itemProviderValue;
};
