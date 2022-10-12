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

  private static replaceCommonPhoneNumberCharactersWithEmptyStrings(phoneNumber: string) {
    return phoneNumber.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
  }

  public setFilterParam(filters: Filter[]): QueryParamsBuilder {
    filters.forEach(f => {
      if (f.attr === 'phoneNumber') {
        if (f.op === 'iendswith') {
          this.setParam(
            `${f.attr}__${f.op}`,
            QueryParamsBuilder.replaceCommonPhoneNumberCharactersWithEmptyStrings(f.value),
          );
        } else {
          this.setParam(
            `${f.attr}__${f.op}`,
            `+1${QueryParamsBuilder.replaceCommonPhoneNumberCharactersWithEmptyStrings(f.value)}`,
          );
        }
      } else {
        this.setParam(`${f.attr}__${f.op}`, f.value);
      }
    });
    return this;
  }

  public setSearchParam(searchText: string): QueryParamsBuilder {
    this.setParam('search', searchText); // The ? is already provided by the query in the relevant Api file.
    return this;
  }

  public build(): string {
    return this.queryParams.toString();
  }
}
