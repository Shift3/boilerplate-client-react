import { User } from 'common/models';
import { Permission, RbacRules } from '../rules';
import { evaluateRule } from './evaluateRule';

export const userRoleHasPermission = (
  rules: RbacRules,
  permission: Permission,
  user: User,
  data?: unknown,
): boolean => {
  const permissionMap = rules[user.role];

  if (!permissionMap) {
    return false;
  }

  const rule = permissionMap[permission];

  if (!rule) {
    return false;
  }

  return evaluateRule(rule, user, data);
};
