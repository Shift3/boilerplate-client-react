import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { NavLinkConfig } from '../hooks/useNavLinks';

type Props = {
  link: NavLinkConfig;
};

export const CustomNavLink: FC<Props> = ({ link }) => (
  <Nav.Link as={Link} to={link.path}>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <FontAwesomeIcon icon={link.icon} />
      <span>{link.label}</span>
    </div>
  </Nav.Link>
);
