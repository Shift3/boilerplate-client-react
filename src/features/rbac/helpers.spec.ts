import { Role, User } from 'common/models';
import { RoleFactory, UserFactory } from 'common/models/testing-factories';
import { evaluateRule, userHasPermission } from './helpers';
import { RolePolicies, Rule } from './policies';

describe('evaluateRule()', () => {
  describe('when rule is a boolean', () => {
    const user: User = UserFactory.build();

    it('should return true if rule is true', () => {
      const rule: Rule = true;
      expect(evaluateRule(rule, user)).toBeTruthy();
    });

    it('should return false if rule is false', () => {
      const rule: Rule = false;
      expect(evaluateRule(rule, user)).toBeFalsy();
    });
  });

  describe('when rule is a predicate function', () => {
    const user: User = UserFactory.build();
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

describe('userHasPermission()', () => {
  const role: Role = RoleFactory.build({ roleName: 'Editor' });
  const user: User = UserFactory.build({}, { associations: { role } });

  it('should return false if user role is not in policies', () => {
    const policies: RolePolicies = {
      Admin: { 'user:create': true },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeFalsy();
  });

  it('should return false if permission is not in policy set', () => {
    const policies: RolePolicies = {
      [user.role.roleName]: {
        'user:read': true,
      },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeFalsy();
  });

  it('should return true if policy is true', () => {
    const policies: RolePolicies = {
      [user.role.roleName]: {
        'user:create': true,
      },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeTruthy();
  });

  it('should return false if policy is false', () => {
    const policies: RolePolicies = {
      [user.role.roleName]: {
        'user:create': false,
      },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeFalsy();
  });

  it('should return true if policy is a predicate that evaluates to true', () => {
    const policies: RolePolicies = {
      [user.role.roleName]: {
        'user:create': jest.fn().mockReturnValueOnce(true),
      },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeTruthy();
  });

  it('should return false if policy is a predicate that evaluates to true', () => {
    const policies: RolePolicies = {
      [user.role.roleName]: {
        'user:create': jest.fn().mockReturnValueOnce(false),
      },
    };

    expect(userHasPermission(policies, 'user:create', user)).toBeFalsy();
  });
});
