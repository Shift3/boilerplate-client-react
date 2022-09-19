import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLinkConfig } from '../hooks/useNavLinks';

type Props = {
  link: NavLinkConfig;
  handleSamePathNavigate?: () => void;
};

export const CustomNavLink: FC<PropsWithChildren<Props>> = ({ link, handleSamePathNavigate = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === link.path && handleSamePathNavigate) {
      handleSamePathNavigate();
    } else if (link.path) {
      navigate(link.path);
    }
  };

  const isActive = location.pathname === link.path;

  return (
    <Nav.Link onClick={handleClick} className={isActive ? 'active' : ''}>
      <FontAwesomeIcon className='me-2' icon={link.icon} />
      {link.label}
    </Nav.Link>
  );
};

export const CustomNavAction: FC<{
  icon: IconName;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <NavItem onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </NavItem>
);
