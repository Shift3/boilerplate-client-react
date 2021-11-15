import { SideNavbar, TopNavbar, useNavbarPosition } from 'features/navbar';
import { FC } from 'react';
import styled from 'styled-components';
import { Footer } from '../footer';
import { HolyGrailLayoutProps } from './types';

const HolyGrail = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HolyGrailHeader = styled.header``;

const HolyGrailMain = styled.div`
  display: flex;
  flex: auto;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

const HolyGrailLeft = styled.aside`
  min-width: 16.25em;
  max-width: 16.25em;
  flex-grow: 0;
`;

const HolyGrailContent = styled.main`
  flex-grow: 1;
  margin-top: 40px;
`;

const HolyGrailRight = styled.aside`
  min-width: 16.25em;
  max-width: 16.25em;
  flex-grow: 0;
`;

const HolyGrailFooter = styled.footer``;

export const HolyGrailLayout: FC<HolyGrailLayoutProps> = ({ header, leftAside, children, rightAside, footer }) => {
  const { navbarPosition, toggleNavbarPosition } = useNavbarPosition();

  return (
    <HolyGrail>
      {(navbarPosition === 'top' || header) && (
        <HolyGrailHeader>
          {navbarPosition === 'top' && <TopNavbar onNavbarToggle={toggleNavbarPosition} />}
          {header}
        </HolyGrailHeader>
      )}
      <HolyGrailMain>
        {(navbarPosition === 'side' || leftAside) && (
          <HolyGrailLeft>
            {navbarPosition === 'side' && <SideNavbar onNavbarToggle={toggleNavbarPosition} />}
            {leftAside}
          </HolyGrailLeft>
        )}
        <HolyGrailContent>{children}</HolyGrailContent>
        {rightAside && <HolyGrailRight>{rightAside}</HolyGrailRight>}
      </HolyGrailMain>
      <HolyGrailFooter>{footer ?? <Footer />}</HolyGrailFooter>
    </HolyGrail>
  );
};
