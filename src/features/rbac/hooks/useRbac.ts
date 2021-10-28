import { useAuth } from 'features/auth/hooks';
import { getRbacRules, Permission } from '../rules';
import { ensureArray } from '../utils/ensureArray';
import { userRoleHasPermission } from '../utils/userRoleHasPermission';

type Action = Permission | { permission: Permission; data: unknown };

type UseRbacHook = () => {
  userHasPermission: (perform: Action | Action[]) => boolean;
};

export const useRbac: UseRbacHook = () => {
  const { user } = useAuth();

  const userHasPermission = (perform: Action | Action[]): boolean => {
    if (!user) {
      return false;
    }

    const actions = ensureArray<Action>(perform);
    const rules = getRbacRules();

    return actions.reduce((result: boolean, action: Action) => {
      const { permission, data } = typeof action === 'object' ? action : { permission: action, data: undefined };
      return result && userRoleHasPermission(rules, permission, user, data);
    }, true);
  };

  return {
    userHasPermission,
  };
};
