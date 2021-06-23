import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import styleValues from '../../../utils/styleValues';

const { footerHeight } = styleValues;

export const SideNavbar = styled(Nav)`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - ${footerHeight});
`;

export const TopContainer = styled.div`
  height: calc(100%/3);
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MiddleContainer = styled.div`
  height: calc((100%/3) * 2);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BottomContainer = styled.div`
  height: calc((100%/3) *2);
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const NavLogo = styled.img`
  object-fit: contain;
  height: 14vh;
  width: 12vw;
  margin-top: 10px;
  grid-row-start: 1;

  &:hover {
    cursor: pointer;
  }
`;
