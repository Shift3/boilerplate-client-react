import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignupPage } from '..';
import { expectInDocByTestId } from 'utils/test';

beforeEach(() => render(
  <Router>
    <Switch>
      <Route 
        exact
        path="/"
        component={SignupPage} 
      />
      <Route 
        exact 
        path="/auth/signup" 
        component={() => <div data-testid="test" />}
      />
    </Switch>
  </Router>
));

describe('<SignupPage/>', () => {
  it('Should render the <SignupPageContainer/>', () => 
    expectInDocByTestId("signupPageContainer"));

  it('Should render the <SignupFormContainer/>', () => 
    expectInDocByTestId("signupFormContainer"));

  it('Should render the <SignupForm/>', () => 
    expectInDocByTestId("signupForm"));
});