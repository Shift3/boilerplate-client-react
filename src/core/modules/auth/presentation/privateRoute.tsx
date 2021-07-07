import {
  Redirect,
  Route,
  RouteProps
} from 'react-router-dom';
import { useAuthState } from '../application/useAuthState';
import { ISession } from '../domain/session';

type Props = RouteProps;

export const PrivateRoute: React.FC<Props> = (props) => {

  const session: ISession | null = useAuthState();

  return  !session ? <Redirect to='/auth/login/' /> :
    <Route {...props} />;
};
