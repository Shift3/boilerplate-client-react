import { ensureArray } from '../ensureArray';

describe('ensureArray()', () => {
  describe('when the argument is not an array', () => {
    it('should return an array containing the argument', () => {
      const elem = 1;
      const expected = [elem];
      const actual = ensureArray(elem);
      expect(actual).toEqual(expected);
    });
  });

  describe('when the argument is an array', () => {
    it('should return the original argument', () => {
      const elem = [1, 2, 3];
      const expected = elem;
      const actual = ensureArray(elem);
      expect(actual).toEqual(expected);
    });
  });
});
