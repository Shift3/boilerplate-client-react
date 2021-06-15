import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {
  clickChildByTestId,
  expectInDocByTestId,
  clickNavigateByTestId,
  expectInnerHTMLByTestId,
  expectChildToHaveClassByTestId,
  expectChildToHaveInnerHTMLByTestId
} from '../../../utils/test';
import { TopNav } from '..';
import { Router, Switch, Route } from 'react-router-dom';

const mockUserData = {
  firstName: "Testy",
  lastName: "Testerson",
  profile_picture: "../../../assets/img/profile.png"
};

const initialRender = () => {
  render(
    <Router history={ createMemoryHistory({ initialEntries: [ "/" ] }) }>
      <Switch>
        <TopNav/>
        <Route exact path="/" component={() => <div />} />
        <Route exact path="/auth/login" component={() => <div/>} />
        <Route exact path="/content/agent-list" component={() => <div/>} />
        <Route exact path="/users/profile" component={() => <div/>} />
      </Switch>
    </Router>
  );
};

describe('<topNav/>', () => {
  beforeEach(initialRender);

  describe('rendering', () => {
    it ('Should render the <TopNavbar />', () =>
      expectInDocByTestId('topNavbar'));

    it ('Should render the <NavContainerLeft/>', () =>
      expectInDocByTestId('navContainerLeft'));

    it ('Should render the <NavLogo/>', () => {
      expectInDocByTestId('navLogo');
    });

    it ('Should render the <NavContainerRight/>', () =>
      expectInDocByTestId('navContainerRight'));

    describe('User logged in', () => {
      beforeEach(() => clickChildByTestId('navDropdown', 0));

      it ('Should render the <DirectoryLink /> and display a faStethoscope icon and text of "Directory"', () => {
        expectInDocByTestId('directoryLink');
        expectChildToHaveClassByTestId('directoryLink', 0, 'fa-stethoscope');
        expectInnerHTMLByTestId('directoryLinkText', 'Directory');
      });

      it ('Should render the <dropdownButton /> and display a faUser icon',
        () => {
          expectInDocByTestId('dropdownButton');
          expectChildToHaveClassByTestId('dropdownButton', 0, 'fa-user');
        });

      it (`Should render the <navDropdown /> and a generated <a/> 
        as the first child with an inner html of "Hi ${mockUserData.firstName}"`, () => {
        expectInDocByTestId('navDropdown');
        expectChildToHaveInnerHTMLByTestId('navDropdown', 0, `Hi ${mockUserData.firstName}`);
      });

      it ('Should render the <dropdownContainerLeft />', () => {
        expectInDocByTestId('dropdownContainerLeft');
      });

      it ('Should render the <profilePhoto />', () => {
        // @TODO - test for default in the case of no profilePicture
        expectInDocByTestId('profilePhoto');
      });

      it ('Should render the <verticalLine />', () =>
        expectInDocByTestId('verticalLine'));

      it ('Should render the <dropdownContainerRight />', () =>
        expectInDocByTestId('dropdownContainerRight'));

      it ('Should render the profile <DropdownItem /> and have an innerHTML of Profile', () => {
        expectInDocByTestId('profileDropdownItem');
        expectInnerHTMLByTestId('profileDropdownItem', 'Profile');
      });

      it ('Should render the changePassword <DropdownItem /> and have an innerHTML of Change Password', () => {
        expectInDocByTestId('changePasswordDropdownItem');
        expectInnerHTMLByTestId('changePasswordDropdownItem', 'Change Password');
      });

      it ('Should render the signOut <DropdownItem /> and have an innerHTML of Sign Out', () => {
        expectInDocByTestId('signOutDropdownItem');
        expectInnerHTMLByTestId('signOutDropdownItem', 'Sign Out');
      });
    });

    describe('User not logged in', () => {
      it ('should render the LOGIN/CREATE account button', () =>
        expectInDocByTestId('loginCreateAccountLink'));
    });
  });
  describe('navigation', () => {
    describe('User not logged in', () => {
      it('Should navigate to /auth/login when the LOGIN/CREATE ACCOUNT button is clicked', () => {
        clickNavigateByTestId('loginCreateAccountLink', '/auth/login');
      });
    });

    describe('User logged in', () => {
      beforeEach(() => clickChildByTestId('navDropdown', 0));

      it ('Should navigate to /content/agent-list when the directory link is clicked', () => {
        clickNavigateByTestId('directoryLink', '/content/agent-list');
      });

      it('Should navigate to /users/profile when the profile link is clicked', () =>
        clickNavigateByTestId('profileDropdownItem', '/users/profile'));

      it('Should navigate to /auth/change-password when the change password link is clicked', () =>
        clickNavigateByTestId('changePasswordDropdownItem', '/auth/change-password'));
    });
  });
});