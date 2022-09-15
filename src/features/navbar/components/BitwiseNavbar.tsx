import { CustomSelect } from 'common/components/CustomSelect';
import { useAuth, useLogout } from 'features/auth/hooks';
import { FC, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { languages } from '../../../i18n/config';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';
import { ThemeToggle } from '../../themes/ToggleSwitch';
import { Button, Container, Modal, Navbar, Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';
import { environment } from 'environment';
import { EnvironmentConfiguration } from 'environment/types';
import { useModal } from 'react-modal-hook';
import { LoadingButton } from 'common/components/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  closeVerticalNav?: () => void;
};

type LanguageOption = {
  label: string;
  value: string;
};

const ResponsiveOffCanvasBody = styled(Offcanvas.Body)`
  display: flex;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const ResponsiveNavLinks = styled(Nav)`
  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ResponsiveSection = styled(Nav)`
  @media (min-width: 768px) {
    justify-content: end;
    align-items: center;
    margin-right: 1rem;
  }
`;

const StyledNavbar = styled(Navbar)`
  position: fixed;
  margin-bottom: 1rem;
  width: 100%;
  background-color: ${props => props.theme.nav.horizontal.backgroundColor};
  z-index: 1030;
  margin-top: ${environment.environment === EnvironmentConfiguration.Staging ? '56px' : '0px'};
`;

const StyledNavbarOffcanvas = styled(Navbar.Offcanvas)`
  background-color: ${props => props.theme.nav.vertical.backgroundColor};

  @media (max-width: 767px) {
    margin-top: ${environment.environment === EnvironmentConfiguration.Staging ? '56px' : '0px'};
  }
`;

export const BitwiseNavbar: FC<Props> = ({ closeVerticalNav }) => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { logout, isLoading } = useLogout();
  const { i18n } = useTranslation();
  const { innerWidth: width } = window;
  const [isMobilePerspective, setIsMobilePerspective] = useState(width <= 767);

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

  const changeLanguage = (ln: string) => {
    localStorage.setItem('language', ln);
    i18n.changeLanguage(ln);
  };

  const __languageOptions = languages.map(language => {
    return { label: language.label, value: language.shortcode };
  });

  const defaultLanguageOption = __languageOptions.find(language => language.value === i18n.languages[0]);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    if (newWidth <= 767 && !isMobilePerspective) {
      setIsMobilePerspective(true);
    } else if (newWidth > 767 && isMobilePerspective) {
      setIsMobilePerspective(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <StyledNavbar expand='md'>
      <Container fluid>
        <Navbar.Brand href='#'>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />
        <StyledNavbarOffcanvas
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>React Boilerplate</Offcanvas.Title>
          </Offcanvas.Header>
          <ResponsiveOffCanvasBody>
            <Nav className='justify-content-start flex-grow-1'>
              <ResponsiveNavLinks>
                {navLinks.map(link => (
                  <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />
                ))}
              </ResponsiveNavLinks>
            </Nav>
            <ResponsiveSection>
              <ThemeToggle />
              <CustomSelect<LanguageOption>
                placeholder='Choose Language'
                options={__languageOptions}
                defaultValue={defaultLanguageOption}
                onChange={option => changeLanguage(option.value)}
              />
              {user ? (
                <NavUserDetails
                  user={user}
                  isMobilePerspective={isMobilePerspective}
                  handleSignOutViaDialog={() => showModal()}
                />
              ) : null}
              {isMobilePerspective ? (
                <CustomNavAction onClick={() => showModal()} label='Sign Out' icon='sign-out-alt' />
              ) : null}
            </ResponsiveSection>
          </ResponsiveOffCanvasBody>
        </StyledNavbarOffcanvas>
      </Container>
    </StyledNavbar>
  );
};
