import { connect, ConnectedProps } from 'react-redux';
import {
  Redirect,
  Route,
  RouteProps
} from 'react-router-dom';
import { RootState } from '../../../redux/store';

const mapState = (state: RootState) => ({
  loggedIn: state.auth
});

const connector = connect(
  mapState,
  { }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteProps & {

};

const PrivateRoute: React.FC<Props> = (props) => {
  const { loggedIn, ...rest } = props;

  return  !loggedIn ? <Redirect to='/auth/login/' /> :
    <Route {...rest} />;
};

export default connector(PrivateRoute);