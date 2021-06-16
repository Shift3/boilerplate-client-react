import { render } from '@testing-library/react';
import { SideNav } from '../';
import { expectInDocByTestId, clickNavigateByTestId } from '../../../utils/test';

import { TestRouter } from '../../testRouter';

describe('<SideNav/>', () => {
  beforeEach(() => render(
    <TestRouter>
      <SideNav/>
    </TestRouter>
  ));

  describe('Rendering', () => {
    it('Should render the <NavWrapper/>', () =>
      expectInDocByTestId("navWrapper"));

    it('Should render the <NavLogo/>', () =>
      expectInDocByTestId("navLogo"));

    it('Should render the <NavLinkWrapper/>', () =>
      expectInDocByTestId("navLinkWrapper"));

    it('Should render a <NavLinkStyled/> for users', () =>
      expectInDocByTestId("usersLink"));

    it('Should render a <NavLinkStyled/> for logout', () =>
      expectInDocByTestId("logoutLink"));

    it('Should render a <NavLinkStyled/> for directory', () =>
      expectInDocByTestId("directoryLink"));
  });

  describe('<NavLink/>', () => {
    it('Should navigate to "/users" when Users link is clicked', () =>
      clickNavigateByTestId('usersLink', '/users'));

    it('Should navigate to "/logout" when Logout link is clicked', () =>
      clickNavigateByTestId('logoutLink', '/logout'));

    it('Should navigate to "/directory" when Directory link is clicked', () =>
      clickNavigateByTestId('directoryLink', '/directory'));
  });
});