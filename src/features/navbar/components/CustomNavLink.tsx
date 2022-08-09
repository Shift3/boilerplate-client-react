import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { NavItem } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavLinkConfig } from '../hooks/useNavLinks';

type Props = {
  link: NavLinkConfig;
  handleSamePathNavigate?: () => void;
};

const NavLinkStyles = styled.div`
  width: 100%;
  font-size: 1rem;
  position: relative;
  padding: 0.65rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 0.25rem;
  i,
  svg {
    position: absolute;
    left: 1rem;
    top: 0.9rem;
  }
  span {
    padding-left: 1.5rem;
  }
  color: ${props => props.theme.nav.textColor};
  font-weight: 400;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.nav.hoverColor};
  }
  &.active {
    background-color: ${props => props.theme.nav.activeBackground};
    color: white;
  }
`;

export const CustomNavLink: FC<PropsWithChildren<Props>> = ({ link, handleSamePathNavigate = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === link.path && handleSamePathNavigate) {
      handleSamePathNavigate();
    } else {
      navigate(link.path);
    }
  };

  const isActive = location.pathname === link.path;

  return (
    <NavLinkStyles onClick={handleClick} className={isActive ? 'active' : ''}>
      <div>
        <FontAwesomeIcon icon={link.icon} />
        <span>{link.label}</span>
      </div>
    </NavLinkStyles>
  );
};

export const CustomNavAction: FC<{
  icon: IconName;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <NavLinkStyles as={NavItem} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </NavLinkStyles>
);
