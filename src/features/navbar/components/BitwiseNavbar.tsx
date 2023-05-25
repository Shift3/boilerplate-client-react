import { faCog, faHomeAlt, faSitemap, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButton } from 'common/components/LoadingButton';
import { environment } from 'environment';
import { EnvironmentConfiguration } from 'environment/types';
import { useAuth, useLogout } from 'features/auth/hooks';
import { NotificationButton } from 'features/notifications/components/NotificationButton';
import { NotificationDropdown } from 'features/notifications/components/NotificationDropdown';
import { NotificationContext } from 'features/notifications/context';
import { useRbac } from 'features/rbac';
import { FC, useContext, useRef } from 'react';
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
import { useTranslation } from 'react-i18next';
import { Constants } from 'utils/constants';

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
`;

const StyledNavbarOffcanvas = styled(Navbar.Offcanvas)`
  background-color: ${props => props.theme.nav.vertical.backgroundColor};

  .offcanvas-header {
    background: ${props => props.theme.nav.horizontal.backgroundColor};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .navbar-only {
    display: inline-block;
  }

  .offcanvas-only {
    display: none;
  }

  &.show,
  &.offcanvas-toggling {
    .offcanvas-only {
      display: inline-block;
    }

    .navbar-only {
      display: none;
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
  const navigationToggle = useRef<HTMLButtonElement>(null!);
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  const navbarOffcanvas = useRef<OffcanvasProps>(null!);
  const { t } = useTranslation('common');

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      return (
        <Modal show={open} onHide={hideModal} onExited={onExited} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('signOut')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t('areYouSureSignOut')}</Modal.Body>
          <Modal.Footer>
            <Button variant='link' onClick={hideModal}>
              {t('cancel')}
            </Button>
            <LoadingButton className='action-shadow' loading={isLoading} variant='primary' onClick={() => logout()}>
              <FontAwesomeIcon icon='sign-out-alt' /> {t('signOut')}
            </LoadingButton>
          </Modal.Footer>
        </Modal>
      );
    },
    [isLoading],
  );

  return (
    <StyledNavbar expand='md'>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>
          <Logo />
        </Navbar.Brand>

        <div className='d-flex'>
          <NavLink className='md-only' onClick={() => navigate('/notifications')}>
            <NotificationButton count={count} />
          </NavLink>
          <Navbar.Toggle ref={navigationToggle} aria-controls='offcanvasNavbar-expand-md' />
        </div>

        <StyledNavbarOffcanvas
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md'
          placement='end'
          ref={navbarOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>{Constants.applicationName}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-start flex-grow-1 pe-3'>
              {userHasPermission('farm:read') ? (
                <NavLink onClick={() => navigate('/')} className={location.pathname === '/' ? 'active me-3' : 'me-3'}>
                  <FontAwesomeIcon className='me-2' icon={faHomeAlt} />
                  {t('home')}
                </NavLink>
              ) : null}
              {userHasPermission('farm:read') ? (
                <NavLink
                  onClick={() => navigate('/farms')}
                  className={location.pathname === '/farms' ? 'active me-3' : 'me-3'}
                >
                  <FontAwesomeIcon className='me-2' icon={faSitemap} />
                  {t('directory')}
                </NavLink>
              ) : null}
              {userHasPermission('user:read') ? (
                <NavDropdown
                  title={
                    <div>
                      <FontAwesomeIcon className='me-2' icon={faUserShield} />
                      {t('administration')}
                    </div>
                  }
                >
                  <NavDropdown.Item onClick={() => navigate('/users')} active={location.pathname === '/users'}>
                    <FontAwesomeIcon icon='user' />
                    {t('users')}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>

            <Nav className='justify-content-end'>
              <NavDropdown
                className='nocaret navbar-only me-2'
                aria-label='Notifications'
                align='end'
                title={<NotificationButton count={count} />}
              >
                <NotificationDropdown />
              </NavDropdown>

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
                      <Badge pill>{t(user.role.toLocaleLowerCase(), { ns: 'common' })}</Badge>
                    </div>
                  </NavDropdown.Header>
                  <NavDropdown.Item onClick={() => navigate(`/user/profile/${user.id}`)}>
                    <FontAwesomeIcon icon={faCog} />
                    {t('accountSettings')}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => showModal()}>
                    <FontAwesomeIcon icon='sign-out-alt' />
                    {t('signOut')}
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
