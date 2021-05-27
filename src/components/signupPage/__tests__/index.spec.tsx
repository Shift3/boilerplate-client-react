import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignupPage } from '../';
import { FC } from 'react';

const { getByTestId } = screen;

const testPage: FC = () => <div data-testid="test" />;

beforeEach(() => render(
  <Router>
    <Switch>
      <Route exact path="/" component={SignupPage} />
      <Route exact path="/auth/signup" component={testPage} />
    </Switch>
  </Router>
));

afterEach(cleanup);

describe('<SignupPage/>', () => {
  it('Should render the <SignupPageContainer/>', () => {
    expect(getByTestId("spc")).toBeInTheDocument();
  });

  it('Should render the <SignupFormContainer/>', () => {
    expect(getByTestId("sfc")).toBeInTheDocument();
  });

  it('Should render the <SignupForm/>', () => {
    expect(getByTestId("sf")).toBeInTheDocument();
  });
})
