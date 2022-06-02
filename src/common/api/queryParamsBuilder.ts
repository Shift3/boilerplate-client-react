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
    return this.setParam('ordering', value);
  }

  public setFilterParam(filters: Filter[]): QueryParamsBuilder {
    filters.forEach(f => {
      if (f.op !== 'eq') this.setParam(`${f.attr}__${f.op}`, f.value);
      else this.setParam(f.attr, f.value);
    });
    // Note: I don't see the point of doing this.
    // filters.forEach(f => {
    //   this.setParam('search_fields', f.op === '$' ? `$${f.attr}$` : `${f.op}${f.attr}`);
    // });
    return this;
  }

  public build(): string {
    return this.queryParams.toString();
  }
}
