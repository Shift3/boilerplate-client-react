import { RoleType } from 'common/models';
import * as notificationService from 'common/services/notification';
import { useAuth } from 'features/auth/hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps & { requiredRoles?: RoleType[] };

export const PrivateRoute: React.FC<Props> = ({ requiredRoles = [], ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to='/auth/login' />;
  }

  if (requiredRoles.length === 0 || requiredRoles.includes(user.role.roleName)) {
    return <Route {...rest} />;
  }

  notificationService.showErrorMessage('Not authorized to view the requested page.');
  return <Redirect to='/agents' />;
};
