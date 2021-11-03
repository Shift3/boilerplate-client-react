// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

// App imports
import logo from 'assets/img/logo.png';

export const NavLogo: FC = () => (
  <Navbar.Brand as={Link} to='/agents'>
    <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
  </Navbar.Brand>
);
