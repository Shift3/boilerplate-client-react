import { Filter, SortOrder } from 'common/models';

export class QueryParamsBuilder {
  private queryParams: URLSearchParams;

  constructor() {
    this.queryParams = new URLSearchParams();
  }

  public setParam(name: string, value: number | string): QueryParamsBuilder {
    if (this.queryParams.has(name)) {
      this.queryParams.delete(name);
    }
    this.queryParams.append(name, String(value));
    return this;
  }

  public setPaginationParams(page: number, pageSize: number): QueryParamsBuilder {
    return this.setParam('page', page).setParam('pageSize', pageSize);
  }

  public setSortParam(sortBy: SortOrder | undefined): QueryParamsBuilder {
    if (!sortBy) {
      return this;
    }
    const value = sortBy.direction === 'DESC' ? `-${sortBy.property}` : sortBy.property;
    return this.setParam('sort', value);
  }

  public setFilterParam(filters: Filter[]): QueryParamsBuilder {
    return this.setParam('filter', filters.map(f => `${f.attr}__${f.op}:${f.value}`).join(','));
  }

  public build(): string {
    return this.queryParams.toString();
  }
}
