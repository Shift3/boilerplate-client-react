import logo from 'assets/img/logo.jpg';
import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Logo: FC = () => (
  <Navbar.Brand as={Link} to='/agents'>
    <img src={logo} alt='Bitwise Technology Consulting' className='shadow-p-0 bg-gray rounded' />
  </Navbar.Brand>
);
