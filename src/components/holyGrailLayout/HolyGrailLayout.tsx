import { Footer } from 'components/footer/Footer';
import { useNavPositionManager } from 'core/modules/navigation/application/useNavPositionManager';
import { TopNav } from 'core/modules/navigation/presentation/topNav';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { SideNav } from '../../core/modules/navigation/presentation/sideNav';

export type HolyGrailLayoutProps = {
  header?: ReactNode;
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
};

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
`;

const HolyGrailRight = styled.aside`
  min-width: 16.25em;
  max-width: 16.25em;
  flex-grow: 0;
`;

const HolyGrailFooter = styled.footer``;

export const HolyGrailLayout: FC<HolyGrailLayoutProps> = ({ header, leftAside, children, rightAside, footer }) => {
  const { navPosition, toggleNavPosition } = useNavPositionManager();

  return (
    <HolyGrail>
      {(navPosition === 'top' || header) && (
        <HolyGrailHeader>
          {navPosition === 'top' && <TopNav onNavToggle={toggleNavPosition} />}
          {header}
        </HolyGrailHeader>
      )}
      <HolyGrailMain>
        {(navPosition === 'side' || leftAside) && (
          <HolyGrailLeft>
            {navPosition === 'side' && <SideNav onNavToggle={toggleNavPosition} />}
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
