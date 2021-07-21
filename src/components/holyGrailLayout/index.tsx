import styled from 'styled-components';
import { } from '../../utils/styleValues';

export const HolyGrail = styled.div`
  font-size: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HolyGrailHeader = styled.header`
  background-color: #b34a4a;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const HolyGrailMain = styled.div`
  background-color: #c3a46a;
  display: flex;
  flex: 1;

  @media (min-width: 768px ) {
    flex-direction: row;
    flex: 1;
  }
`;

export const HolyGrailLeft = styled.aside`
background-color: #6fa06f;
  flex: 1 1 5rem;
   padding-top: 3rem;        

  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailContent = styled.main`
  background-color: #6f88a0;
  flex: 3 3 ; 
  padding-top: 3rem;  
  
  @media (min-width: 768px) {
    flex: 1;
  }
`;

export const HolyGrailRight = styled.aside`
  flex: 1 1 5rem;
  padding-top: 3rem;

  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailFooter = styled.aside`
  padding-top: 3rem;
  padding-bottom: 3rem;

`;

// export const HolyGrailLayout: HolyGrailType = ({ leftNav, children, rightSide }) => (
//   <HolyGrail >
//     <HolyGrailHeader>{TopNav}</HolyGrailHeader>
//     <HolyGrailMainWrapper>
//       {!!leftNav && <HolyGrailLeft>{SideNav}</HolyGrailLeft>}
//       {!!children && <HolyGrailMain >{children}</HolyGrailMain>}
//       {!!rightSide && <HolyGrailRight>{rightSide}</HolyGrailRight>}
//     </HolyGrailMainWrapper>
//     <Footer />
//   </HolyGrail>
// );

export const HolyGrailLayout: any = () => {
  return (
    <HolyGrail>
      <HolyGrailHeader>HEADER</HolyGrailHeader>
      <HolyGrailMain>
        <HolyGrailLeft>SIDE NAV</HolyGrailLeft>
        <HolyGrailContent >MAIN CONTENT</HolyGrailContent>
        <HolyGrailRight>RIGHT ASIDE</HolyGrailRight>
      </HolyGrailMain>
      <HolyGrailFooter>FOOTER</HolyGrailFooter>
    </HolyGrail>
  );
};