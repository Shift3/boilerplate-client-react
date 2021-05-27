import { act, render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from '..';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';

const { click } = userEvent;
const { getByTestId } = screen;

const testPage: FC = () => <div data-testid="test" />;

beforeEach(async () => render(
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/auth/signup" component={testPage} />
    </Switch>
  </Router>
));

afterEach(cleanup);

describe('<LoginPage/>', () => {

  it('Should render the <LoginPageContainer/>', () => {
    expect(getByTestId("lpc")).toBeInTheDocument();
  });

  it('Should render the <LoginFormContainer/>', () => {
    expect(getByTestId("lfc")).toBeInTheDocument();
  });

  it('Should render the <LoginFormContainerRight/>', () => {
    expect(getByTestId("lfc-r")).toBeInTheDocument();
  });

  it('Should render the <LoginFormContainerLeft/>', () => {
    expect(getByTestId("lfc-l")).toBeInTheDocument();
  });

  it('Should render the <LoginForm/>', () => {
    expect(getByTestId("lf")).toBeInTheDocument();
  });

  it('Should render an <h2/> with innerHTML equal to "Not Registered Yet?', () => {
    const h2 = getByTestId("lfc-r-h2");

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toEqual("Not Registered Yet?");
  });

  it('Should render a <p/> with innerHTML equal to "Registering for your account is quick and easy', () => {
    const p = getByTestId("lfc-r-p");

    expect(p).toBeInTheDocument();
    expect(p.innerHTML).toEqual("Registering for your account is quick and easy");
  });

  it('Should render a <button/> with innerHTML equal to "CREATE ACCOUNT"', () => {
    const button = getByTestId("ca-btn");
    
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toEqual("CREATE ACCOUNT");
  });

  it('Should navigate to "/auth/signup" when the "CREATE ACCOUNT" button is clicked', () => {
    act(() => click(getByTestId("ca-btn")));

    expect(getByTestId('test')).toBeInTheDocument();
  })
});