import { Footer } from 'common/components/Footer';
import { SideNavbar, TopNavbar, useNavbarPosition } from 'features/navbar';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

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

type Props = {
  header?: ReactNode;
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
};

export const HolyGrailLayout: FC<Props> = ({ header, leftAside, children, rightAside, footer }) => {
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
