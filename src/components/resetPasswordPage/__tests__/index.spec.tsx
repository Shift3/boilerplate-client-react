import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ResetPasswordPage } from '..';
import { FC } from 'react';

const { getByTestId } = screen;

const testPage: FC = () => <div data-testid="test" />; 



describe('<SignupPage/>', () => {
  beforeEach(() => render(
    <Router>
      <Switch>
        <Route exact path="/" component={ResetPasswordPage} />
        <Route exact path="/auth/signup" component={testPage} />
      </Switch>
    </Router>
  ));
  
  afterEach(cleanup);

  it('Should render the <ResetPasswordPageContainer/>', () => {
    expect(getByTestId("rppc")).toBeInTheDocument();
  });

  it('Should render the <ResetPasswordFormContainer/>', () => {
    expect(getByTestId("rpfc")).toBeInTheDocument();
  });

  it('Should render the <SetPasswordForm/>', () => {
    expect(getByTestId("spf")).toBeInTheDocument();
  });
})