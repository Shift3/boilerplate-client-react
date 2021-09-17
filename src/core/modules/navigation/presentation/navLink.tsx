// React import
import { FC } from 'react';

// Third party library imports
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App imports
import { INavLink } from '../application/useNavData';

export interface INavLinkProps {
  link: INavLink;
}

export const NavLink: FC<INavLinkProps> = ({ link }) => (
  <Nav.Link key={link.path} as={Link} to={link.path}>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <FontAwesomeIcon icon={link.icon} />
      <span>{link.label}</span>
    </div>
  </Nav.Link>
);
