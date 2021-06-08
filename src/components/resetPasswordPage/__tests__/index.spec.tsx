import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ResetPasswordPage } from '..';
import { expectInDocByTestId } from '../../../utils/test';

describe('<SignupPage/>', () => {
  beforeEach(() => render(
    <Router>
      <Switch>
        <Route exact path="/" component={ResetPasswordPage} />
        <Route exact path="/auth/signup" component={() => <div data-testid="test" />} />
      </Switch>
    </Router>
  ));

  it('Should render the <ResetPasswordPageContainer/>', () => 
    expectInDocByTestId('resetPasswordPageContainer'));

  it('Should render the <ResetPasswordFormContainer/>', () =>
    expectInDocByTestId('resetPasswordFormContainer'));

  it('Should render the <SetPasswordForm/>', () =>
    expectInDocByTestId('setPasswordForm'));
})