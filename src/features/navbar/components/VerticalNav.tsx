import { CustomSelect } from 'common/components/CustomSelect';
import { BitwiseNavbar } from 'common/styles/page';
import { useAuth } from 'features/auth/hooks';
import { FC, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { languages } from '../../../i18n/config';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';
import { ThemeToggle } from '../../themes/ToggleSwitch';
import { useLocation } from 'react-router-dom';
import { NavCategory } from './NavCategory';
import { isObject } from 'common/error/utilities';

type Props = {
  closeVerticalNav?: () => void;
};

type LanguageOption = {
  label: string;
  value: string;
};

const getCategoryFromState = (state: unknown): string | null => {
  if (isObject(state) && state.category && typeof state.category === 'string') {
    return state.category;
  }
  return null;
};

export const VerticalNav: FC<Props> = ({ closeVerticalNav }) => {
  const { user } = useAuth();
  const { openLogoutModal } = useLogoutModal();
  const { i18n } = useTranslation();
  const { state } = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(getCategoryFromState(state));

  const changeLanguage = (ln: string) => {
    localStorage.setItem('language', ln);
    i18n.changeLanguage(ln);
  };

  const __languageOptions = languages.map(language => {
    return { label: language.label, value: language.shortcode };
  });

  const defaultLanguageOption = __languageOptions.find(language => language.value === i18n.languages[0]);

  const handleCategorySelection = (category: string | null) => {
    setActiveCategory(category);
  };

  const isCategoryActive = (category: string) => {
    return activeCategory === category ? 'open' : '';
  };

  return (
    <BitwiseNavbar className='flex-column py-0'>
      <div className='position-relative w-100'>
        <Logo />
        <ThemeToggle />
      </div>
      {user ? (
        <div className='nav-wrap w-100'>
          <Nav className='flex-column'>
            <NavCategory
              title='General'
              className={isCategoryActive('General')}
              handleCategorySelection={handleCategorySelection}
            >
              <CustomNavLink
                link={{ icon: 'stethoscope', label: 'Directory', path: '/agents' }}
                category='General'
                handleSamePathNavigate={closeVerticalNav}
              />
            </NavCategory>
            <NavCategory
              title='Administration'
              className={isCategoryActive('Administration')}
              handleCategorySelection={handleCategorySelection}
            >
              <CustomNavLink
                link={{ icon: 'user', label: 'Users', path: '/users' }}
                category='Administration'
                handleSamePathNavigate={closeVerticalNav}
              />
            </NavCategory>
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
            <CustomNavAction onClick={openLogoutModal} label='Sign Out' icon='sign-out-alt' />
          </Nav>
        </div>
      ) : (
        <></>
      )}
    </BitwiseNavbar>
  );
};
