import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export type NavLinkConfig = {
  icon: IconName;
  label: string;
  path?: string;
  method?: () => void;
};

type Props = {
  link: NavLinkConfig;
  category: string;
  handleSamePathNavigate?: () => void;
};

export const CustomNavLink: FC<PropsWithChildren<Props>> = ({ link, category, handleSamePathNavigate = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === link.path && handleSamePathNavigate) {
      handleSamePathNavigate();
    } else if (link.path) {
      navigate(link.path, { state: { category } });
    }
  };

  const isActive = location.pathname === link.path;

  return (
    <Nav.Link onClick={handleClick} className={isActive ? 'active' : ''}>
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
