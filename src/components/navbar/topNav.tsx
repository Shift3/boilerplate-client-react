import { NavbarType } from './types/navbar.types';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { CustomButton } from '../button/styled';
import { NavDropdown } from './navDropdown';
import { NavDirectoryLink } from './directoryLink';
import {
  TopNavbar,
  NavContainerLeft,
  NavContainerRight,
  TopNavLogo,
} from './styled/topNav.styled';

export const TopNav: NavbarType = ({ userData, signOut }) => {
  const history = useHistory();

  const onDropdownItemSelect = (eventKey: string) => {
    if (eventKey === "profile") history.push("/users/profile");
    if (eventKey === "changePassword") history.push("/auth/change-password");
    if (eventKey === "signOut") signOut();
  };

  return (
    <TopNavbar data-testid="topNavbar" onSelect={ onDropdownItemSelect } >
      <NavContainerLeft data-testid="navContainerLeft">
        <TopNavLogo
          data-testid="navLogo"
          src={ logo }
          alt="Bitwise Technology Consulting"
          onClick={() => history.push('/content/agent-list')}
        />
        {
          userData && <NavDirectoryLink />
        }
      </NavContainerLeft>
      <NavContainerRight data-testid="navContainerRight">
        {
          userData && <NavDropdown { ...userData } />
        }
        {
          !userData && (
            <CustomButton
              onClick={() => history.push('/auth/login')}
              data-testid="loginCreateAccountButton"
            >
              LOGIN/CREATE ACCOUNT
            </CustomButton>
          )
        }
      </NavContainerRight>
    </TopNavbar>
  );
};