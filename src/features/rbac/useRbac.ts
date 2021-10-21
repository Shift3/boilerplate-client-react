import { useAuth } from 'features/auth/hooks';
import { userHasPermission } from './helpers';
import { Permission } from './permissions';
import { policies } from './policies';

export const useRbac = () => {
  const { user } = useAuth();

  const hasPermission = (requiredPermissions: Permission | Permission[], data?: any) => {
    if (!user) {
      return false;
    }

    const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];

    return permissions
      .map((permission) => userHasPermission(policies, permission, user, data))
      .every((result) => result === true);
  };

  return {
    hasPermission,
  };
};
