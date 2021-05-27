import { render, screen, cleanup, act } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { NavBar } from '../';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';

const { click } = userEvent;
const { getByTestId } = screen;

const clickByTestId = (id: string) => act(() => click(getByTestId(id)));

const expectInDocByTestId = (id: string) => expect(getByTestId(id)).toBeInTheDocument();

const clickExpect = (clickId: string, expectId: string) => {
  clickByTestId(clickId);
  expectInDocByTestId(expectId);
};

const generateMockComponent: (id: string) => FC = (id) => () => <div data-testid={id}/>;

describe('<NavBar/>', () => {
  beforeEach(() => render(
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Switch>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/logout" component={generateMockComponent('logout')} />
        <Route exact path="/users" component={generateMockComponent('users')} />
        <Route exact path="/directory" component={generateMockComponent('directory')} />
      </Switch>
    </Router>
  ));
  
  afterEach(cleanup);

  describe('Rendering', () => {
    it('Should render the <NavBarWrapper/>', () => expectInDocByTestId("nbw"));
    it('Should render the <NavLogo/>', () => expectInDocByTestId("nl"));
    it('Should render the <NavLinkWrapper/>', () => expectInDocByTestId("nlw"));
    it('Should render a <NavLinkStyled/> for users', () => expectInDocByTestId("nls-u"));
    it('Should render a <NavLinkStyled/> for logout', () => expectInDocByTestId("nls-l"));
    it('Should render a <NavLinkStyled/> for directory', () => expectInDocByTestId("nls-d"));
  });
  describe('<NavLink/>', () => {
    it('Should navigate to "/users" when Users link is clicked', () => clickExpect('nls-u', 'users'));
    it('Should navigate to "/logout" when Logout link is clicked', () => clickExpect('nls-l', 'logout'));
    it('Should navigate to "/directory" when Directory link is clicked', () => clickExpect('nls-d', 'directory'));
  });
});