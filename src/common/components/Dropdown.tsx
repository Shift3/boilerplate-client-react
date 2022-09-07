import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLinkConfig } from 'features/navbar';
import { NavLinkStyles } from 'features/navbar/components/CustomNavLink';
import { FC, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { wasMouseEventOutsideContainer } from 'utils/events';

const StyledDropdown = styled.div`
  position: absolute;
  right: 0;
  z-index: 1000;
  min-width: 160px;

  transition: all 0.15s ease-in-out;

  top: 16px;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.75) translateX(-10%);

  &.show {
    visibility: visible;
    opacity: 1;
    top: 98px;
    right: 12px;
    transform: scale(1) translateX(0);
  }
`;

const DropdownMenu = styled(Card)`
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.nav.horizontal.profileBackground} !important;
  box-shadow: ${props => props.theme.boxShadow} !important;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const Dropdown: FC<{
  show: boolean;
  onClose: () => void;
  navLinks: NavLinkConfig[];
}> = ({ show = false, onClose, navLinks }) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownContainerRef.current) return;

      if (wasMouseEventOutsideContainer(dropdownContainerRef.current, e)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLinkClick = (link: NavLinkConfig) => {
    if (link.path) {
      navigate(link.path);
    } else if (link.method !== undefined) {
      link.method();
    }
  };

  return (
    <StyledDropdown className={show ? 'show' : ''} ref={dropdownContainerRef}>
      <DropdownMenu>
        {navLinks.map(link => (
          <NavLinkStyles key={link.id} onClick={() => handleLinkClick(link)}>
            <FontAwesomeIcon icon={link.icon} />
            <span>{link.label}</span>
          </NavLinkStyles>
        ))}
      </DropdownMenu>
    </StyledDropdown>
  );
};
