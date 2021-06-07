/* eslint-disable jsx-quotes */
/* eslint-disable array-bracket-spacing */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
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
    it('Should render the <NavBarWrapper/>', () => expectInDocByTestId('nbw'));

    it('Should render the <NavLogo/>', () => expectInDocByTestId('nl'));

    it('Should render the <NavLinkWrapper/>', () => expectInDocByTestId('nlw'));

    it('Should render a <NavLinkStyled/> for users', () => expectInDocByTestId('nls-u'));

    it('Should render a <NavLinkStyled/> for logout', () => expectInDocByTestId('nls-l'));

    it('Should render a <NavLinkStyled/> for directory', () => expectInDocByTestId('nls-d'));
  });

  describe('<NavLink/>', () => {
    it('Should navigate to "/users" when Users link is clicked', () => clickExpectByTestId('nls-u', 'users'));

    it('Should navigate to "/logout" when Logout link is clicked', () => clickExpectByTestId('nls-l', 'logout'));

    it('Should navigate to "/directory" when Directory link is clicked', () =>
      clickExpectByTestId('nls-d', 'directory'));
  });
});
