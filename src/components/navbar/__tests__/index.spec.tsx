import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
// eslint-disable-next-line
import { createMemoryHistory } from 'history';
import { NavBar } from '..';
import { expectInDocByTestId, clickExpectByTestId } from '../../../utils/test';

describe('<NavBar/>', () => {
  beforeEach(() =>
    render(
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Switch>
          <Route exact path='/' component={NavBar} />
          <Route exact path='/logout' component={() => <div data-testid='logout' />} />
          <Route exact path='/users' component={() => <div data-testid='users' />} />
          <Route exact path='/directory' component={() => <div data-testid='directory' />} />
        </Switch>
      </Router>,
    ),
  );

  describe('Rendering', () => {
    it('Should render the <NavWrapper/>', () => expectInDocByTestId('navWrapper'));

    it('Should render the <NavLogo/>', () => expectInDocByTestId('navLogo'));

    it('Should render the <NavLinkWrapper/>', () => expectInDocByTestId('navLinkWrapper'));

    it('Should render a <NavLinkStyled/> for users', () => expectInDocByTestId('usersLink'));

    it('Should render a <NavLinkStyled/> for logout', () => expectInDocByTestId('logoutLink'));

    it('Should render a <NavLinkStyled/> for directory', () => expectInDocByTestId('directoryLink'));
  });

  describe('<NavLink/>', () => {
    it('Should navigate to "/users" when Users link is clicked', () => clickExpectByTestId('usersLink', 'users'));

    it('Should navigate to "/logout" when Logout link is clicked', () => clickExpectByTestId('logoutLink', 'logout'));

    it('Should navigate to "/directory" when Directory link is clicked', () =>
      clickExpectByTestId('directoryLink', 'directory'));
  });
});
