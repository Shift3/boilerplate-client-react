import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButton } from 'common/components/LoadingButton';
import { environment } from 'environment';
import { EnvironmentConfiguration } from 'environment/types';
import { useAuth, useLogout } from 'features/auth/hooks';
import { MoonIcon } from 'features/themes/MoonIcon';
import { SunIcon } from 'features/themes/SunIcon';
import { useTheme } from 'features/themes/useTheme';
import { FC } from 'react';
import { Badge, Button, Container, Modal, Navbar, NavDropdown, NavLink, Offcanvas } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { useModal } from 'react-modal-hook';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { languages } from '../../../i18n/config';
import { NavLinkConfig, useNavLinks } from '../hooks/useNavLinks';
import { CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { UserProfilePicture } from './UserProfilePicture';

type Props = {
  closeVerticalNav?: () => void;
};

const StyledNavbar = styled(Navbar)`
  position: fixed;
  margin-bottom: 1rem;
  width: 100%;
  background-color: ${props => props.theme.nav.horizontal.backgroundColor};
  backdrop-filter: blur(10px);
  z-index: 1030;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  margin-top: ${environment.environment === EnvironmentConfiguration.Staging ? '56px' : '0px'};
  padding: 0.8rem 0;

  .navbar-toggler {
    border: none;
  }

  .navbar-brand {
    color: ${props => props.theme.textColor};
  }

  .dropdown-toggle::after {
    margin-left: 0.25rem;
    transition: 0.15s ease all;
    color: ${props => props.theme.textColor};
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.textColor};
    border-radius: ${props => props.theme.borderRadius};
    font-weight: 500;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;

    margin-right: 1rem;
    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      background: ${props => props.theme.nav.link.activeBackground};
      color: ${props => props.theme.nav.link.activeText};

      &:after {
        color: ${props => props.theme.nav.link.activeText};
      }
    }
  }
  .dropdown {
    display: flex;
  }

  .dropdown-menu {
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
  }

  .dropdown-header {
    border-bottom: 1px solid ${props => props.theme.nav.borderColor};
  }

  .navbar-brand {
    padding: 0;
    display: flex;
    align-items: center;
  }
  .navbar-brand img {
    width: 40px;
  }

  .nav-link.active {
    background: ${props => props.theme.nav.link.activeBackground};
    color: ${props => props.theme.nav.link.activeText};
  }
`;

const StyledNavbarOffcanvas = styled(Navbar.Offcanvas)`
  background-color: ${props => props.theme.nav.vertical.backgroundColor};

  .offcanvas-header {
    background: ${props => props.theme.nav.horizontal.backgroundColor};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .offcanvas-only {
    display: none;
  }

  &.show,
  &.offcanvas-toggling {
    .offcanvas-only {
      display: inline-block;
    }

    .offcanvas-body {
      display: flex;
      flex-direction: column;

      a.nav-link {
        padding: 1rem 0rem 1rem 1rem;
      }

      .nav-link.active {
        background: ${props => props.theme.nav.link.activeBackground};
        color: ${props => props.theme.nav.link.activeText};
        border-radius: ${props => props.theme.borderRadius};
      }
    }

    .navbar-nav {
      flex: 1 !important;
    }

    .dropdown-menu {
      position: relative;
      top: 0;
      width: 100%;
    }

    .theme-toggle {
      padding: 1rem 0;
      position: absolute;
      right: 2rem;
      top: 3px;
    }
  }
`;

export const BitwiseNavbar: FC<Props> = ({ closeVerticalNav }) => {
  let dropdownLinks: NavLinkConfig[] = [];

  const { user } = useAuth();
  const navLinks = useNavLinks();
  const navigate = useNavigate();
  const { toggle, theme } = useTheme();
  const { logout, isLoading } = useLogout();
  const { i18n } = useTranslation();
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to sign out?</Modal.Body>
          <Modal.Footer>
            <Button variant='link' onClick={hideModal}>
              Cancel
            </Button>
            <LoadingButton className='action-shadow' loading={isLoading} variant='primary' onClick={() => logout()}>
              <FontAwesomeIcon icon='sign-out-alt' /> Sign Out
            </LoadingButton>
          </Modal.Footer>
        </Modal>
      );
    },
    [isLoading],
  );

  if (user) {
    dropdownLinks = [
      { id: 0, icon: 'user', label: 'Profile', path: `/user/profile/${user.id}` },
      { id: 1, icon: 'sign-out-alt', label: 'Sign Out', method: showModal },
    ];
  }

  const changeLanguage = (ln: string) => {
    localStorage.setItem('language', ln);
    i18n.changeLanguage(ln);
  };

  const __languageOptions = languages.map(language => {
    return { label: language.label, value: language.shortcode };
  });

  const defaultLanguageOption = __languageOptions.find(language => language.value === i18n.languages[0]);

  const handleLinkClick = (link: NavLinkConfig) => {
    if (link.path) {
      navigate(link.path);
    } else if (link.method !== undefined) {
      link.method();
    }
  };

  return (
    <StyledNavbar expand='md'>
      <Container>
        <Navbar.Brand onClick={() => navigate('/agents')}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />
        <StyledNavbarOffcanvas
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>Starter Project</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-start flex-grow-1 pe-3'>
              {navLinks.map(link => (
                <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />
              ))}
            </Nav>

            <NavLink onClick={() => toggle()} className='theme-toggle me-3 d-flex align-items-center'>
              <>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</>
            </NavLink>

            <NavDropdown
              align='end'
              title={
                <>
                  <FontAwesomeIcon className='me-2' size='lg' icon={faLanguage} />
                  {defaultLanguageOption?.label}
                </>
              }
              className='me-3'
            >
              {__languageOptions.map(option => (
                <NavDropdown.Item onClick={() => changeLanguage(option.value)}>{option.label}</NavDropdown.Item>
              ))}
            </NavDropdown>

            {user ? (
              <NavDropdown
                align='end'
                title={
                  <>
                    <UserProfilePicture user={user} size='xs' radius={24} />
                    <span className='offcanvas-only'>
                      {user.firstName} {user.lastName.charAt(0)}.
                    </span>
                  </>
                }
              >
                <NavDropdown.Header className='d-flex align-items-center'>
                  <UserProfilePicture user={user} size='xs' radius={32} />
                  <div>
                    <div>
                      {user.firstName} {user.lastName.charAt(0)}.
                    </div>
                    <Badge pill>{user.role}</Badge>
                  </div>
                </NavDropdown.Header>
                {dropdownLinks.map(link => (
                  <NavDropdown.Item key={link.id} onClick={() => handleLinkClick(link)}>
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : null}
          </Offcanvas.Body>
        </StyledNavbarOffcanvas>
      </Container>
    </StyledNavbar>
  );
};
