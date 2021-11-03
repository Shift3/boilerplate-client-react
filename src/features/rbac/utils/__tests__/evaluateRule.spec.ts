import { UserFactory } from 'common/models/testing-factories';
import { evaluateRule } from '../evaluateRule';

describe('evaluateRule()', () => {
  describe('rule is a boolean value', () => {
    const user = UserFactory.build();

    it('should return true if rule is true', () => {
      const rule = true;
      expect(evaluateRule(rule, user)).toBeTruthy();
    });

    it('should return false if rule is false', () => {
      const rule = false;
      expect(evaluateRule(rule, user)).toBeFalsy();
    });
  });

  describe('rule is a predicate function', () => {
    const user = UserFactory.build();
    const rule = jest.fn();

    it('should return true if the predicate evaluates to true', () => {
      rule.mockReturnValueOnce(true);
      expect(evaluateRule(rule, user)).toBeTruthy();
    });

    it('should return false if the predicate evaluates to false', () => {
      rule.mockReturnValueOnce(false);
      expect(evaluateRule(rule, user)).toBeFalsy();
    });
  });
});
