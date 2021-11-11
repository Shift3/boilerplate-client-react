import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from 'assets/img/logo.png';

export const Logo: FC = () => (
  <Navbar.Brand as={Link} to='/agents'>
    <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
  </Navbar.Brand>
);
