import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export const PrivateRoute: FC<ProtectedRouteProps> =
({ isAuthenticated, authenticationPath, isAllowed, restrictedPath, ...rest }) => {
  let redirectPath = '';
  if (!isAuthenticated ) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...{ isAuthenticated, authenticationPath, isAllowed, restrictedPath }}
      // eslint-disable-next-line no-undefined
      component={renderComponent} render={undefined} />;
  }
  return <Route {...rest} />;
};

export default PrivateRoute;