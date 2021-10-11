import { RoleType } from 'common/models';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { useAuth } from 'features/auth/hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps & { requiredRoles?: RoleType[] };

export const PrivateRoute: React.FC<Props> = ({ requiredRoles = [], ...rest }) => {
  const { showErrorNotification } = useShowNotification();
  const { user } = useAuth();

  if (!user) {
    return <Redirect to='/auth/login' />;
  }

  if (requiredRoles.length === 0 || requiredRoles.includes(user.role.roleName)) {
    return <Route {...rest} />;
  }

  showErrorNotification('Not authorized to view the requested page.');
  return <Redirect to='/agents' />;
};
