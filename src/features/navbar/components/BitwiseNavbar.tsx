import { faCog, faHomeAlt, faUserShield, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButton } from 'common/components/LoadingButton';
import { environment } from 'environment';
import { EnvironmentConfiguration } from 'environment/types';
import { useAuth, useLogout } from 'features/auth/hooks';
import { NotificationButton } from 'features/notifications/components/NotificationButton';
import { NotificationDropdown } from 'features/notifications/components/NotificationDropdown';
import { NotificationContext } from 'features/notifications/context';
import { useRbac } from 'features/rbac';
import { FC, useContext, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Offcanvas,
  OffcanvasProps,
} from 'react-bootstrap';
import { useModal } from 'react-modal-hook';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from './Logo';
import { UserProfilePicture } from './UserProfilePicture';

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

  #notification-btn-and-toggle-container {
    display: flex;
    flex-direction: row;

    #notification-button {
      #notification-label {
        display: none;
      }

      #notification-counter {
        right: 0;
        top: 0;
        transform: none;
        width: 1.25rem;
        height: 1.25rem;
      }

      svg {
        margin-right: 0;
      }
    }

    @media (min-width: 767px) {
      #notification-button {
        display: none;
      }
    }
  }

  .dropdown-menu {
    min-width: 200px;
  }

  .dropdown-item > svg {
    margin-inline-end: 0.5rem;
  }

  .nav-link.active,
  .dropdown-item.active {
    background: ${props => props.theme.nav.link.activeBackground};
    color: ${props => props.theme.nav.link.activeText};
  }

  .navbar-toggler {
    border: none;
  }

  .navbar-brand {
    color: ${props => props.theme.textColor};
  }

  .dropdown-toggle::after {
    margin-left: 0.25rem;
    color: ${props => props.theme.textColor};
  }

  .show > .nav-link {
    background: ${props => props.theme.nav.link.activeBackground};
    color: ${props => props.theme.nav.link.activeText};
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.textColor};
    border-radius: ${props => props.theme.borderRadius};
    font-weight: 500;
    padding: 0.4rem;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;

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

  @media (max-width: 767px) {
    #notification-dropdown {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0.5rem;
      margin-bttom: 0px !important;
      box-shadow: -4px -4px 5px 20px ${props => props.theme.notifications.boxShadowColor};
      width: auto;
      height: calc(100vh - 1rem);

      div#header {
        height: 5%;
      }

      div#body {
        height: 95%;

        div#tabs-and-mark-all {
          height: 3%;
        }

        div#notification-lists {
          height: 97%;
        }
      }

      #body > #tabs-and-mark-all > #notification-type-tabs {
        display: flex;
        flex-direction: row;
      }
    }
  }

  @media (min-width: 768px) {
    #notification-dropdown {
      position: absolute;
      top: 4.063rem;
      right: 0;
      margin-right: 13vw;
    }
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

      .major-dropdowns {
        display: flex;
        flex-direction: column;
        justify-content: start;
        flex-grow: 1;
      }

      .dropdown-item {
        padding: 1rem 0rem 1rem 1rem;
      }

      .dropdown-item > svg {
        margin-inline-end: 0.5rem;
      }

      .dropdown-item.active {
        background: ${props => props.theme.nav.link.activeBackground};
        color: ${props => props.theme.nav.link.activeText};
        border-radius: ${props => props.theme.borderRadius};
      }

      a.nav-link {
        padding: 1rem 0rem 1rem 0rem;
      }
    }

    .navbar-nav {
      flex: 1 !important;
    }

    .dropdown-menu {
      position: relative;
      top: 0;
      width: 100%;
      padding-top: 0;
      padding-bottom: 0;
    }

    .dropdown-toggle {
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    .theme-toggle {
      padding: 1rem 0;
      position: absolute;
      right: 2rem;
      top: 3px;
    }
  }
`;

export const BitwiseNavbar: FC = () => {
  const { count } = useContext(NotificationContext);
  const { user } = useAuth();
  const { userHasPermission } = useRbac();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  const navigationToggle = useRef<HTMLButtonElement>(null!);
  const navbarOffcanvas = useRef<OffcanvasProps>(null!);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited} centered>
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

  const toggleNotificationDropdown = () => {
    if (navbarOffcanvas.current.isTopModal()) {
      navigationToggle.current.click();
    }

    setShowNotificationDropdown(!showNotificationDropdown);
  };

  return (
    <StyledNavbar expand='md'>
      {showNotificationDropdown && <NotificationDropdown onClose={toggleNotificationDropdown} />}
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>
          <Logo />
        </Navbar.Brand>
        <div id='notification-btn-and-toggle-container'>
          <NotificationButton count={count} handleOnClick={toggleNotificationDropdown} />
          <Navbar.Toggle ref={navigationToggle} aria-controls='offcanvasNavbar-expand-md' />
        </div>
        <StyledNavbarOffcanvas
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md'
          placement='end'
          ref={navbarOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>Starter Project</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-start flex-grow-1 pe-3'>
              {userHasPermission('agent:read') ? (
                <NavLink onClick={() => navigate('/')} className={location.pathname === '/' ? 'active me-3' : 'me-3'}>
                  <FontAwesomeIcon className='me-2' icon={faHomeAlt} />
                  Home
                </NavLink>
              ) : null}
              {userHasPermission('agent:read') ? (
                <NavLink
                  onClick={() => navigate('/agents')}
                  className={location.pathname === '/agents' ? 'active me-3' : 'me-3'}
                >
                  <FontAwesomeIcon className='me-2' icon={faSitemap} />
                  Directory
                </NavLink>
              ) : null}
              {userHasPermission('user:read') ? (
                <NavDropdown
                  title={
                    <div>
                      <FontAwesomeIcon className='me-2' icon={faUserShield} />
                      Administration
                    </div>
                  }
                >
                  <NavDropdown.Item onClick={() => navigate('/users')} active={location.pathname === '/users'}>
                    <FontAwesomeIcon icon='user' />
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>

            <Nav className='justify-content-end'>
              <NotificationButton count={count} handleOnClick={toggleNotificationDropdown} />

              {user ? (
                <NavDropdown
                  align='end'
                  title={
                    <>
                      <div className='me-2'>
                        <UserProfilePicture user={user} size='xs' radius={24} />
                      </div>
                      <span className='offcanvas-only'>
                        {user.firstName} {user.lastName.charAt(0)}.
                      </span>
                    </>
                  }
                >
                  <NavDropdown.Header className='d-flex align-items-center'>
                    <div className='me-2'>
                      <UserProfilePicture user={user} size='xs' radius={32} />
                    </div>
                    <div>
                      <div>
                        {user.firstName} {user.lastName.charAt(0)}.
                      </div>
                      <Badge pill>{user.role}</Badge>
                    </div>
                  </NavDropdown.Header>
                  <NavDropdown.Item onClick={() => navigate(`/user/profile/${user.id}`)}>
                    <FontAwesomeIcon icon={faCog} />
                    Account Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => showModal()}>
                    <FontAwesomeIcon icon='sign-out-alt' />
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Offcanvas.Body>
        </StyledNavbarOffcanvas>
      </Container>
    </StyledNavbar>
  );
};
