export type SortDirection = 'ASC' | 'DESC';

export type SortOrder = { property: string; direction: SortDirection };

export interface SortingQueryParams {
  sortBy?: SortOrder;
}
