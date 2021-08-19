import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { RoleType } from 'core/modules/user/domain/role';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthState } from '../core/modules/auth/application/useAuthState';
import { ISession } from '../core/modules/auth/domain/session';

type Props = RouteProps & { roles?: RoleType[] };

export const PrivateRoute: React.FC<Props> = ({ roles = [], ...rest }) => {
  const session: ISession | null = useAuthState();
  const { showErrorNotification } = useShowNotification();

  if (!session) {
    return <Redirect to='/auth/login' />;
  }

  const { user } = session;

  if (roles.length === 0 || roles.includes(user.role.roleName)) {
    return <Route {...rest} />;
  }

  showErrorNotification('Not authorized to view the requested page.');
  return <Redirect to='/content/agent-list' />;
};
