import { render, screen, cleanup, act } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from '../';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';

const { click } = userEvent;
const { getByTestId, getByRole } = screen;

const expectInDocByTestId = (id: string) => expect(getByTestId(id)).toBeInTheDocument();
const clickByTestId = (id: string) => act(() => click(getByTestId(id)));
const genMock: (id: string) => FC = (id) => () => <div data-testid={id}/>;

describe('<NavBar/>', () => {
  beforeEach(() => {
    render(
      <Router>
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/logout" component={genMock('logout')} />
          <Route exact path="/users" component={genMock('users')} />
          <Route exact path="/directory" component={genMock('directory')} />
        </Switch>
      </Router>
    );
  });

  describe('Rendering', () => {
    it('Should render the <NavBarWrapper/>', () => expectInDocByTestId("nbw"));

    it('Should render the <NavLogo/>', () => expectInDocByTestId("nl"));
  
    it('Should render the <NavLinkWrapper/>', () => expectInDocByTestId("nlw"));
  
    it('Should render a <NavLinkStyled/> for directory', () => expectInDocByTestId("nls-d"));
  
    it('Should render a <NavLinkStyled/> for users', () => expectInDocByTestId("nls-u"));
  
    it('Should render a <NavLinkStyled/> for logout', () => expectInDocByTestId("nls-l"));
  });

  describe('<NavLink/>', () => {
    it('Should navigate to "/users" when Users link is clicked', () => {
      console.log("====== TEST 1 =======");
      screen.debug();
      clickByTestId('nls-u');
      console.log("====== NEW PAGE ======");
      screen.debug();
      expectInDocByTestId('users');
    });
  
    it('Should navigate to "/directory" when Directory link is clicked', () => {
      console.log("====== TEST 2 =======");
      screen.debug();
      clickByTestId('nls-d');
      console.log("====== NEW PAGE ======");
      screen.debug();
      expectInDocByTestId('directory');
    });
  
    it('Should navigate to "/logout" when Logout link is clicked', () => {
      console.log("====== TEST 3 =======");
      screen.debug();
      clickByTestId('nls-l');
      console.log("====== NEW PAGE ======");
      screen.debug();
      expectInDocByTestId('logout');
    });
  });
});