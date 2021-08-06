import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUpPage } from '../SignUp';
import { expectInDocByTestId } from 'utils/test';
import { Provider } from 'react-redux';
import store from 'core/redux/store';

beforeEach(() =>
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={SignUpPage} />
          <Route exact path='/auth/signup' component={() => <div data-testid='test' />} />
        </Switch>
      </Router>
    </Provider>,
  ),
);

describe('<SignUpPage/>', () => {

  it('Should render the <SignupForm/>', () => expectInDocByTestId('signupForm'));
});
