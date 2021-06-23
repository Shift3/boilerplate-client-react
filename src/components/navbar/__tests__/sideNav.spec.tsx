import { render, screen } from '@testing-library/react';
import { SideNav } from '../sideNav';
import {
  expectInDocByTestId,
  clickNavigateByTestId,
  expectAttributeToEqualByTestId,
  expectInnerHTMLByTestId,
  clickChildByTestId
} from '../../../utils/test';

import { TestRouter } from '../../testRouter';

const mockSignOut = jest.fn();
const mockUserData = {
  firstName: "Testy",
  lastName: "Testerson",
  profile_picture: "../../assets/img/profile_picture.png"
};

const renderSideNavWithUserData = () => render(
  <TestRouter>
    <SideNav
      userData={mockUserData}
      signOut={mockSignOut}
    />
  </TestRouter>
);

const renderSideNavWithoutUserData = () => render(
  <TestRouter>
    <SideNav
      signOut={mockSignOut}
    />
  </TestRouter>
);

describe('<SideNav/>', () => {
  describe('Rendering', () => {
    describe('Either login state', () => {
      beforeEach(() => renderSideNavWithUserData());

      it('Should render the <SideNavbar />', () =>
        expectInDocByTestId('sideNavbar'));

      it('Should render the <TopContainer />', () =>
        expectInDocByTestId('topContainer'));

      it('Should render the <NavLogo /> with an alt tag of "Bitwise Technology Consulting"', () => {
        expectInDocByTestId('navLogo');
        expectAttributeToEqualByTestId('navLogo', 'alt', 'Bitwise Technology Consulting');
      });
    });

    describe('User logged in', () => {
      beforeEach(() => renderSideNavWithUserData());

      it('Should render the <MiddleContainer />', () =>
        expectInDocByTestId('middleContainer'));

      it('Should render the <DirectoryLink />', () =>
        expectInDocByTestId('directoryLink'));

      it('Should render the <NavDropdown />', () =>
        expectInDocByTestId('dropdownButton'));
    });

    describe('User not logged in', () => {
      beforeEach(() => renderSideNavWithoutUserData());

      it('Should render the <BottomContainer />', () =>
        expectInDocByTestId('bottomContainer'));

      it('Should render the <CustomButton/> with an innerHTML of "LOGIN/CREATE ACCOUNT"', () => {
        expectInDocByTestId('loginCreateAccountButton');
        expectInnerHTMLByTestId('loginCreateAccountButton', 'LOGIN/CREATE ACCOUNT');
      });
    });
  });

  describe('Navigation', () => {
    describe('Either login state', () => {
      beforeEach(() => renderSideNavWithUserData());

      it('Should navigate to /content/agent-list when the logo is clicked', () =>
        clickNavigateByTestId('navLogo', '/content/agent-list'));
    });

    describe('User logged in', () => {
      beforeEach(() => {
        renderSideNavWithUserData();
        clickChildByTestId('navDropdown', 0);
      });

      it('Should navigate to /content/agent-list when the directory link is clicked', () =>
        clickNavigateByTestId('directoryLink', '/content/agent-list'));

      it('Should navigate to /users/profile when the profile link is clicked', () =>
        clickNavigateByTestId('profileDropdownItem', '/users/profile'));

      it('Should navigate to /auth/change-password when the change password link is clicked', () =>
        clickNavigateByTestId('changePasswordDropdownItem', '/auth/change-password'));
    });

    describe('User not logged in', () => {
      beforeEach(() => renderSideNavWithoutUserData());

      it('Should navigate to /auth/login when the <CustomButton/> is clicked', () =>
        clickNavigateByTestId('loginCreateAccountButton', '/auth/login'));
    });
  });
});