import { RoleType } from 'common/models';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthState } from '../../../../core/modules/auth/application/useAuthState';
import { ISession } from '../../../../core/modules/auth/domain/session';

type Props = RouteProps & { requiredRoles?: RoleType[] };

export const PrivateRoute: React.FC<Props> = ({ requiredRoles = [], ...rest }) => {
  const session: ISession | null = useAuthState();
  const { showErrorNotification } = useShowNotification();

  if (!session) {
    return <Redirect to='/auth/login' />;
  }

  const { user } = session;

  if (requiredRoles.length === 0 || requiredRoles.includes(user.role.roleName)) {
    return <Route {...rest} />;
  }

  showErrorNotification('Not authorized to view the requested page.');
  return <Redirect to='/content/agent-list' />;
};
