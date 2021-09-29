import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUpPage } from '../';
import { expectInDocByTestId } from 'utils/test';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';

beforeEach(() =>
  render(
    <Provider store={createAppStore()}>
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
  it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

  it('Should render the <SignupForm/>', () => expectInDocByTestId('signupForm'));
});
