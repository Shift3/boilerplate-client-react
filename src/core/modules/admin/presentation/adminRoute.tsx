import { RouteProps, Route } from 'react-router-dom';
// import { useAuthState } from '../application/useAuthState';
// import { ISession } from '../domain/session';

type Props = RouteProps;

export const PrivateRoute: React.FC<Props> = (props) => {
  return <Route {...props} />;
};