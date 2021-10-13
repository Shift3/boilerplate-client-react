import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUpPage } from '../';
import { expectInDocByTestId } from 'utils/test';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

beforeEach(() =>
  render(
    <ThemeProvider theme={AppTheme}>
      <Router>
        <Switch>
          <Route exact path='/' component={SignUpPage} />
          <Route exact path='/auth/signup' component={() => <div data-testid='test' />} />
        </Switch>
      </Router>
    </ThemeProvider>,
  ),
);

describe('<SignUpPage/>', () => {
  it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

  it('Should render the <SignupForm/>', () => expectInDocByTestId('signupForm'));
});
