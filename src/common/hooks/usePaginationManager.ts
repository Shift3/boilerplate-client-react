import { useState } from 'react';

type PaginationState = {
  page: number;
  pageSize: number;
};

type PaginationManager = {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

type UsePaginationManager = (initialState?: Partial<PaginationState>) => PaginationManager;

const defaultState: PaginationState = {
  page: 1,
  pageSize: 10,
};

export const usePaginationManager: UsePaginationManager = (initialState = {}) => {
  const { page: initialPage, pageSize: initialPageSize } = { ...defaultState, ...initialState };

  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
  };
};
