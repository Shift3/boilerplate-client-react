import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styleValues from '../../../utils/styleValues';

const {
  topNavHeight,
  navLogoOffset,
} = styleValues;

export const TopNavbar = styled(Nav)`
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${topNavHeight}
`;

export const TopNavLogo = styled.img`
  height: calc(${ topNavHeight } - ${ navLogoOffset });

  &:hover {
    cursor: pointer;
  }
`;

export const DirectoryLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    color: rgba(0, 0, 0, .5);
  }

  &:hover {
    text-decoration: none;

    & > span {
      color: rgba(0, 0, 0, .7);
    }
  }
`;

export const NavContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavContainerRight = styled.div`
  display: flex;
  align-items: center;
`;

export const NavIcon = styled(FontAwesomeIcon)`
  color: #175f6e;
  font-size: 16px;
`;