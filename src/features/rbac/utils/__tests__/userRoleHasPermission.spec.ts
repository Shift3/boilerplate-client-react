import { Role, User } from 'common/models';
import { UserFactory } from 'common/models/testing-factories';
import { RbacRules } from 'features/rbac/rules';
import { userRoleHasPermission } from '../userRoleHasPermission';

describe('userRoleHasPermission()', () => {
  const user: User = UserFactory.build({ role: Role.EDITOR });

  it('should return false if user role is not in rbac rules', () => {
    const rules: RbacRules = {};

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeFalsy();
  });

  it('should return false if rbac rules do not have rule for specified permission', () => {
    const rules: RbacRules = {
      [user.role]: {},
    };

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeFalsy();
  });

  it('should return true if rule for specified permission is true', () => {
    const rules: RbacRules = {
      [user.role]: {
        'user:create': true,
      },
    };

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeTruthy();
  });

  it('should return false if rule for specified permission is false', () => {
    const rules: RbacRules = {
      [user.role]: {
        'user:create': false,
      },
    };

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeFalsy();
  });

  it('should return true if rule for specified permission evaluates to true', () => {
    const rules: RbacRules = {
      [user.role]: {
        'user:create': jest.fn().mockReturnValueOnce(true),
      },
    };

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeTruthy();
  });

  it('should return false if rule for specified permission evaluates to true', () => {
    const rules: RbacRules = {
      [user.role]: {
        'user:create': jest.fn().mockReturnValueOnce(false),
      },
    };

    expect(userRoleHasPermission(rules, 'user:create', user)).toBeFalsy();
  });
});
