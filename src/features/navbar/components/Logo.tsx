import logo from 'assets/img/logo.jpg';
import logoInverted from 'assets/img/logo-inverted.jpg';
import { useTheme } from 'features/themes/useTheme';
import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Logo: FC = () => {
  const { theme } = useTheme();
  return (
    <Navbar.Brand as={Link} to='/agents'>
      <img
        src={theme === 'light' ? logo : logoInverted}
        alt='Bitwise Technology Consulting'
        className='shadow-p-0 bg-gray rounded'
      />
    </Navbar.Brand>
  );
};
