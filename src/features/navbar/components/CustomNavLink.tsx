import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { NavItem } from 'react-bootstrap';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { NavLinkConfig } from '../hooks/useNavLinks';

type Props = {
  link: NavLinkConfig;
};

const NavLinkStyles = styled(NavLink)<NavLinkProps>`
  width: 100%;
  font-size: 1rem;
  position: relative;
  padding: 0.65rem 1.5rem;
  border-radius: 6px;
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
  color: #666;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.buttons.backgroundColor};
  }
  &.active {
    background-color: ${props => props.theme.buttons.backgroundColor};
    color: white;
  }
`;

export const CustomNavLink: FC<Props> = ({ link }) => (
  <NavLinkStyles to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
    <div>
      <FontAwesomeIcon icon={link.icon} />
      <span>{link.label}</span>
    </div>
  </NavLinkStyles>
);

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
