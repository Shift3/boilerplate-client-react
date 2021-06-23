import logo from '../../assets/img/logo.png';
import { NavDropdown } from './navDropdown';
import { NavbarVariantType } from './types/navbar.types';
import { NavDirectoryLink } from './directoryLink';
import { CustomButton } from 'components/button/styled';
import { useHistory } from 'react-router-dom';
import {
  SideNavbar,
  NavLogo,
  TopContainer,
  BottomContainer,
  MiddleContainer
} from './styled/sideNav.styled';

export const SideNav: NavbarVariantType = ({ userData, signOut }) => {
  const history = useHistory();

  const onDropdownItemSelect = (eventKey: string) => {
    if (eventKey === 'profile') history.push('/users/profile');
    if (eventKey === 'changePassword') history.push('/auth/change-password');
    if (eventKey === 'signOut') signOut();
  };

  return (
    <SideNavbar data-testid='sideNavbar' onSelect={onDropdownItemSelect} >
      <TopContainer data-testid='topContainer'>
        <NavLogo
          data-testid='navLogo'
          src={logo}
          alt='Bitwise Technology Consulting'
          onClick={() => history.push('/content/agent-list')}
        />
      </TopContainer>
      {
        userData &&
        <MiddleContainer data-testid='middleContainer'>
          <NavDirectoryLink />
          <NavDropdown {...userData} />
        </MiddleContainer>
      }
      {
        !userData && (
          <BottomContainer data-testid='bottomContainer'>
            <CustomButton
              onClick={() => history.push('/auth/login')}
              data-testid='loginCreateAccountButton'
            >
              LOGIN/CREATE ACCOUNT
            </CustomButton>
          </BottomContainer>
        )
      }
    </SideNavbar>
  );
};
