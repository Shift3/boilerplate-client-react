import { render } from '@testing-library/react';
import {
  clickChildByTestId,
  expectInDocByTestId,
  clickNavigateByTestId,
  expectInnerHTMLByTestId,
  expectChildToHaveClassByTestId,
  expectChildToHaveInnerHTMLByTestId
} from '../../../utils/test';
import { TopNav } from '../topNav';
import { TestRouter } from '../../testRouter';

const mockUserData = {
  firstName: "Testy",
  lastName: "Testerson",
  profile_picture: "../../../assets/img/profile.png"
};

const mockSignOut = jest.fn();

const renderTopNavWithUserData = () => render(
  <TestRouter>
    <TopNav
      userData={mockUserData}
      signOut={mockSignOut}
    />
  </TestRouter>
);

const renderTopNavWithoutUserData = () => render(
  <TestRouter>
    <TopNav
      signOut={mockSignOut}
    />
  </TestRouter>
);

describe('<topNav/>', () => {
  describe('Rendering', () => {
    describe('User not logged in', () => {
      beforeEach(() => renderTopNavWithoutUserData());

      it('Should render the <TopNavbar />', () =>
        expectInDocByTestId('topNavbar'));

      it('Should render the <NavContainerLeft/>', () =>
        expectInDocByTestId('navContainerLeft'));

      it('Should render the <NavLogo/>', () => {
        expectInDocByTestId('navLogo');
      });

      it('Should render the <NavContainerRight/>', () =>
        expectInDocByTestId('navContainerRight'));

      it('should render the LOGIN/CREATE account button', () =>
        expectInDocByTestId('loginCreateAccountButton'));
    });

    describe('User logged in', () => {
      beforeEach(() => {
        renderTopNavWithUserData();
        clickChildByTestId('navDropdown', 0);
      });

      it('Should render the <TopNavbar />', () =>
        expectInDocByTestId('topNavbar'));

      it('Should render the <NavContainerLeft/>', () =>
        expectInDocByTestId('navContainerLeft'));

      it('Should render the <NavLogo/>', () => {
        expectInDocByTestId('navLogo');
      });

      it('Should render the <NavContainerRight/>', () =>
        expectInDocByTestId('navContainerRight'));

      it('Should render the <DirectoryLink /> and display a faStethoscope icon and text of "Directory"', () => {
        expectInDocByTestId('directoryLink');
        expectChildToHaveClassByTestId('directoryLink', 0, 'fa-stethoscope');
        expectInnerHTMLByTestId('directoryLinkText', 'Directory');
      });

      it('Should render the <dropdownButton /> and display a faUser icon',
        () => {
          expectInDocByTestId('dropdownButton');
          expectChildToHaveClassByTestId('dropdownButton', 0, 'fa-user');
        });

      it(`Should render the <navDropdown /> and a generated <a/> 
        as the first child with an inner html of "Hi ${mockUserData.firstName}"`, () => {
        expectInDocByTestId('navDropdown');
        expectChildToHaveInnerHTMLByTestId('navDropdown', 0, `Hi ${mockUserData.firstName}`);
      });

      it('Should render the <dropdownContainerLeft />', () => {
        expectInDocByTestId('dropdownContainerLeft');
      });

      it('Should render the <profilePhoto />', () => {
        expectInDocByTestId('profilePhoto');
      });

      it('Should render the <verticalLine />', () =>
        expectInDocByTestId('verticalLine'));

      it('Should render the <dropdownContainerRight />', () =>
        expectInDocByTestId('dropdownContainerRight'));

      it('Should render the profile <DropdownItem /> and have an innerHTML of Profile', () => {
        expectInDocByTestId('profileDropdownItem');
        expectInnerHTMLByTestId('profileDropdownItem', 'Profile');
      });

      it('Should render the changePassword <DropdownItem /> and have an innerHTML of Change Password', () => {
        expectInDocByTestId('changePasswordDropdownItem');
        expectInnerHTMLByTestId('changePasswordDropdownItem', 'Change Password');
      });

      it('Should render the signOut <DropdownItem /> and have an innerHTML of Sign Out', () => {
        expectInDocByTestId('signOutDropdownItem');
        expectInnerHTMLByTestId('signOutDropdownItem', 'Sign Out');
      });
    });
  });

  describe('Navigation', () => {
    describe('User not logged in', () => {
      beforeEach(() => renderTopNavWithoutUserData());

      it('Should navigate to /auth/login when the LOGIN/CREATE ACCOUNT button is clicked', () => {
        clickNavigateByTestId('loginCreateAccountButton', '/auth/login');
      });
    });

    describe('User logged in', () => {
      beforeEach(() => {
        renderTopNavWithUserData();
        clickChildByTestId('navDropdown', 0);
      });

      it('Should navigate to /content/agent-list when the directory link is clicked', () => {
        clickNavigateByTestId('directoryLink', '/content/agent-list');
      });

      it('Should navigate to /users/profile when the profile link is clicked', () => {
        clickNavigateByTestId('profileDropdownItem', '/users/profile');
      });

      it('Should navigate to /auth/change-password when the change password link is clicked', () => {
        clickNavigateByTestId('changePasswordDropdownItem', '/auth/change-password');
      });
    });
  });
});