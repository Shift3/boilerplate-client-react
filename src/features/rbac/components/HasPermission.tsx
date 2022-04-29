import { useAuth } from 'features/auth/hooks';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { getRbacRules, Permission } from '../rules';
import { ensureArray } from '../utils/ensureArray';
import { userRoleHasPermission } from '../utils/userRoleHasPermission';

type Action = Permission | { permission: Permission; data: unknown };

type Props = {
  // A single action or list of actions the user must be allowed to perform.
  perform?: Action | Action[];
  // Content to render if the user is allowed to perform the actions.
  yes?: ReactNode;
  // Content to render if the user is not allowed to perform the actions.
  no?: ReactNode;
};

export const HasPermission: FC<PropsWithChildren<Props>> = ({
  perform = [],
  children,
  yes: Yes = children,
  no: No = null,
}) => {
  const { user } = useAuth();
  const rules = getRbacRules();
  const actions = ensureArray<Action>(perform);
  const allowed =
    user &&
    actions.reduce((result, action) => {
      const { permission, data } = typeof action === 'object' ? action : { permission: action, data: undefined };
      return result && userRoleHasPermission(rules, permission, user, data);
    }, true);

  return allowed ? <>{Yes}</> : <>{No}</>;
};
