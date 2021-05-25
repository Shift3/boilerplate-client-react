import { render, screen, cleanup, act } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from '../';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';

const { click } = userEvent;
const { getByTestId } = screen;

const expectInDocByTestId = (id: string) => expect(getByTestId(id)).toBeInTheDocument();
const clickByTestId = (id: string) => act(() => click(getByTestId(id)));

const mockUsers: FC = () => <div data-testid="users" />;
const mockDirectory: FC = () => <div data-testid="directory" />;
const mockLogout: FC = () => <div data-testid="logout" />;

describe('<NavBar/>', () => {
  it('Should render the <NavBarWrapper/>', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nbw");

    cleanup();
  });

  it('Should render the <NavLogo/>', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nl");

    cleanup();
  });

  it('Should render the <NavLinkWrapper/>', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nlw");

    cleanup();
  });

  it('Should render a <NavLinkStyled/> for directory', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nls-d");

    cleanup();
  });

  it('Should render a <NavLinkStyled/> for users', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nls-u");

    cleanup();
  });

  it('Should render a <NavLinkStyled/> for logout', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
        </Switch>
      </Router>
    );

    expectInDocByTestId("nls-l");

    cleanup();
  });

  it('Should navigate to "/directory" when Directory link is clicked', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/directory" component={mockDirectory} />
        </Switch>
      </Router>
    );

    clickByTestId('nls-d');

    expectInDocByTestId("directory");

    cleanup();
  });

  it('Should navigate to "/users" when Users link is clicked', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/users" component={mockUsers} />
        </Switch>
      </Router>
    );

    clickByTestId('nls-u')

    expectInDocByTestId("users");

    cleanup();
  });

  it('Should navigate to "/logout" when Logout link is clicked', () => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/logout" component={mockLogout} />
        </Switch>
      </Router>
    );

    clickByTestId('nls-l');

    expectInDocByTestId("logout");

    cleanup();
  });
});