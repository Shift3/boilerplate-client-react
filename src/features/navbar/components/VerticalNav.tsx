import { CustomSelect } from 'common/components/CustomSelect';
import { BitwiseNavbar } from 'common/styles/page';
import { useAuth } from 'features/auth/hooks';
import { FC, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { languages } from '../../../i18n/config';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';
import { ThemeToggle } from '../../themes/ToggleSwitch';
import { environment } from 'environment';
import { useNotifications } from 'features/notification/hooks/useNotifications';

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
  const { openLogoutModal } = useLogoutModal();
  const { i18n } = useTranslation();
  // const { totalUnreadCount, setTotalUnread, setUnread } = useNotifications();
  const { notificationState, notificationDispatch } = useNotifications();
  const [newUnreadCount, setNewUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return () => null;

    const src = new EventSource(`${environment.apiRoute}/events/${user.id}/`, { withCredentials: true });

    src.onmessage = msg => {
      const data = JSON.parse(msg.data);

      console.log('src:', src);
      console.log('data:', data);

      if (newUnreadCount !== 0) {
        setNewUnreadCount(newUnreadCount + 1);
      } else {
        setNewUnreadCount(notificationState.totalUnreadCount + 1);
      }
      notificationDispatch({ type: 'new notification' });
      // setUnread([]);
      // setTotalUnread(totalUnreadCount + 1);
    };

    return () => {
      src.close();
    };
  }, [user, newUnreadCount]);

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

            <div className='mb-3'>
              <NavUserDetails user={user} />
            </div>

            <CustomNavLink
              link={{
                id: 99,
                icon: 'bell',
                label: 'Notifications',
                path: '/users/notifications',
                badge: newUnreadCount || notificationState.totalUnreadCount,
              }}
            />
            <CustomNavAction onClick={openLogoutModal} label='Sign Out' icon='sign-out-alt' />
          </Nav>
        </div>
      ) : (
        <></>
      )}
    </BitwiseNavbar>
  );
};
