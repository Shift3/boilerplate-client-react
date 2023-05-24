import logo from 'assets/img/logo.jpg';
import logoInverted from 'assets/img/logo-inverted.jpg';
import { useTheme } from 'features/themes/useTheme';
import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Constants } from 'utils/constants';

export const Logo: FC = () => {
  const { theme } = useTheme();
  return (
    <Navbar.Brand as={Link} to='/farms'>
      <img
        src={theme === 'light' ? logo : logoInverted}
        alt={Constants.applicationName}
        className='shadow-p-0 bg-gray rounded'
      />
    </Navbar.Brand>
  );
};
