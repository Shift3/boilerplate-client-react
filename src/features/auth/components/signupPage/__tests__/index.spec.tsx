import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUpPage } from '../';
import { expectInDocByTestId } from 'utils/test';
import { Provider } from 'react-redux';
import { store } from 'app/redux/store';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

describe('<SignUpPage/>', () => {
  beforeEach(() =>
    render(
      <ThemeProvider theme={AppTheme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path='/' component={SignUpPage} />
              <Route exact path='/auth/signup' component={() => <div />} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>,
    ),
  );

  it('Should render the <SignupPage/>', () => expectInDocByTestId('signUpPage'));

  it('Should render the <SignupForm/>', () => expectInDocByTestId('signupForm'));
});
