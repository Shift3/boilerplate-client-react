<<<<<<< HEAD
import { FC } from 'react';
import { NavWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';
import logo from '../../assets/img/logo.png';

export const NavBar: FC = () => (
  <NavWrapper data-testid='navWrapper'>
    <NavLogo data-testid='navLogo' src={logo} alt='Bitwise Technology Consulting' />
    <NavLinkWrapper data-testid='navLinkWrapper'>
      <NavLinkStyled data-testid='directoryLink' to='/directory'>
        Directory
      </NavLinkStyled>
      <NavLinkStyled data-testid='usersLink' to='/users'>
        Users
      </NavLinkStyled>
      <NavLinkStyled data-testid='logoutLink' to='/logout'>
        Log Out
      </NavLinkStyled>
    </NavLinkWrapper>
  </NavWrapper>
);
=======
import { SideNav } from '../sideNav';
import { TopNav } from '../topNav';
import { NavbarType } from './types';

export const Navbar: NavbarType = ({ navType }) => {
  // @TODO - utilize hook within redux to proc state update within nav via userData

  const mockUserData = {
    firstName: "Testy",
    lastName: "Testerson",
    profile_picture: "../../assets/img/profile.png"
  };

  const signOut = () => {
    // eslint-disable-next-line
    console.log("Sign Out button clicked");
  };

  return (
    <>
      { navType === "topNav" && <TopNav userData={ mockUserData } signOut={ signOut } /> }
      { navType === "sideNav" && <SideNav/> }
    </>
  );
};
>>>>>>> fc20740 (feat(navbar): new navbar added as parent component that conditionally renders the sideNav or topNav based on the navType prop provided)
