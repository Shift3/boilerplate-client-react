import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { userHasPermission } from './helpers';
import { Permission } from './permissions';
import { policies } from './policies';

type Props = { requiredPermissions: Permission | Permission[]; data?: any };

const HasPermission: FC<Props> = ({ requiredPermissions, data = {}, children }) => {
  const { user } = useAuth();

  const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];

  const hasPermission = user
    ? permissions
        .map((permission) => userHasPermission(policies, permission, user, data))
        .every((result) => result === true)
    : false;

  return hasPermission ? <>{children}</> : null;
};

export default HasPermission;
