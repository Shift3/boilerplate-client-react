import { SortOrder } from 'common/models';
import { QueryParamsBuilder } from './queryParamsBuilder';

describe('QueryParamsBuilder', () => {
  describe('when no previous builder steps have been called', () => {
    it('should initially return an empty string', () => {
      const queryString = new QueryParamsBuilder().build();
      expect(queryString).toBeFalsy();
    });

    it('should correctly add a new query param', () => {
      const key = 'age';
      const value = 123;
      const expected = `${key}=${value}`;
      const actual = new QueryParamsBuilder().setParam(key, value).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add pagination params', () => {
      const page = 0;
      const pageSize = 10;
      const expected = new RegExp(`^(?:page=${page}&pageSize=${pageSize}|pageSize=${pageSize}&page=${page})$`);
      const actual = new QueryParamsBuilder().setPaginationParams(page, pageSize).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add ordering param with ascending order', () => {
      const sortBy: SortOrder = { property: 'name', direction: 'ASC' };
      const expected = new RegExp(`^ordering=${sortBy.property}$`);
      const actual = new QueryParamsBuilder().setSortParam(sortBy).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add ordering param with descending order', () => {
      const sortBy: SortOrder = { property: 'name', direction: 'DESC' };
      const expected = new RegExp(`^ordering=-${sortBy.property}$`);
      const actual = new QueryParamsBuilder().setSortParam(sortBy).build();
      expect(actual).toMatch(expected);
    });

    it('should not add param if sortBy is undefined', () => {
      const sortBy = undefined;
      const expected = '';
      const actual = new QueryParamsBuilder().setSortParam(sortBy).build();
      expect(actual).toMatch(expected);
    });
  });

  describe('when previous builder steps have been called', () => {
    let queryStringBuilder: QueryParamsBuilder;

    beforeEach(() => {
      queryStringBuilder = new QueryParamsBuilder().setParam('testKey', 'testValue');
    });

    it('should return a non-empty string', () => {
      const queryString = queryStringBuilder.build();
      expect(queryString).toBeTruthy();
    });

    it('should correct add a new query param at the end', () => {
      const key = 'name';
      const value = 'alice';
      const expected = new RegExp(`^(?:.+=.+&)+${key}=${value}$`);
      const actual = queryStringBuilder.setParam(key, value).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add pagination params at the end', () => {
      const page = 0;
      const pageSize = 10;
      const expected = new RegExp(
        `^(?:.+=.+&)+(?:page=${page}&pageSize=${pageSize}|pageSize=${pageSize}&page=${page})$`,
      );
      const actual = queryStringBuilder.setPaginationParams(page, pageSize).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add ordering param with ascending order at the end', () => {
      const sortBy: SortOrder = { property: 'name', direction: 'ASC' };
      const expected = new RegExp(`^(?:.+=.+&)+ordering=${sortBy.property}$`);
      const actual = queryStringBuilder.setSortParam(sortBy).build();
      expect(actual).toMatch(expected);
    });

    it('should correctly add ordering param with descending order at the end', () => {
      const sortBy: SortOrder = { property: 'name', direction: 'DESC' };
      const expected = new RegExp(`^(?:.+=.+&)+ordering=-${sortBy.property}$`);
      const actual = queryStringBuilder.setSortParam(sortBy).build();
      expect(actual).toMatch(expected);
    });

    it('should not add param if sortBy is undefined', () => {
      const expected = queryStringBuilder.build();
      const actual = queryStringBuilder.setSortParam(undefined).build();
      expect(actual).toMatch(expected);
    });
  });

  describe('setParam', () => {
    it('should not add a param multiple times', () => {
      const queryParams = new QueryParamsBuilder()
        .setParam('name', 'John')
        .setParam('name', 'Bob')
        .setParam('name', 'Alice')
        .build();

      const re = /(?:name=.+)/;
      const matches = re.exec(queryParams);

      expect(matches).toHaveLength(1);
    });

    it('should only save the last value for the added params', () => {
      const queryParams = new QueryParamsBuilder()
        .setParam('name', 'John')
        .setParam('name', 'Bob')
        .setParam('name', 'Alice')
        .build();

      const re = /name=(\w+)/;
      const match = re.exec(queryParams);
      const value = match![1];

      expect(value).toBe('Alice');
    });
  });
});
