import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';

export const NavWrapper = styled(Nav)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${(props) => props.theme.topNavHeight}
`;

export const DropDownContentLeft = styled.div``;

export const DropDownContentRight = styled.div``;

export const VerticalLine = styled.span`
    display: inline-block;
    border-left: 1px solid #d3d3d3;
    margin: 0 20px;
    height: 125px;
`;

export const NavContainerLeft = styled.div``;

export const NavContainerRight = styled.div``;