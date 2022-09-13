import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomSelect } from 'common/components/CustomSelect';
import { LoadingButton } from 'common/components/LoadingButton';
import { BitwiseNavbar } from 'common/styles/page';
import { useAuth, useLogout } from 'features/auth/hooks';
import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { useModal } from 'react-modal-hook';
import { languages } from '../../../i18n/config';
import { ThemeToggle } from '../../themes/ToggleSwitch';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';

type Props = {
  closeVerticalNav?: () => void;
};

type LanguageOption = {
  label: string;
  value: string;
};

export const VerticalNav: FC<Props> = ({ closeVerticalNav }) => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { i18n } = useTranslation();
  const { logout, isLoading } = useLogout();

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
            <LoadingButton
              className='action-shadow'
              as={Button}
              loading={isLoading}
              variant='primary'
              onClick={() => logout()}
            >
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

  return (
    <BitwiseNavbar className='flex-column py-0'>
      <div className='position-relative w-100'>
        <Logo />
        <ThemeToggle />
      </div>
      {user ? (
        <div className='nav-wrap w-100'>
          <Nav className='flex-column'>
            {navLinks.map(link => (
              <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />
            ))}
          </Nav>
          <Nav className='flex-column'>
            <div className='w-100 py-3 justify-content-md-start'>
              <CustomSelect<LanguageOption>
                placeholder='Choose Language'
                options={__languageOptions}
                defaultValue={defaultLanguageOption}
                onChange={option => changeLanguage(option.value)}
              />
            </div>
            <NavUserDetails user={user} />
            <CustomNavAction onClick={() => showModal()} label='Sign Out' icon='sign-out-alt' />
          </Nav>
        </div>
      ) : (
        <></>
      )}
    </BitwiseNavbar>
  );
};
