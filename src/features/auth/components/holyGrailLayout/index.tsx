import { useNavPositionManager } from 'core/modules/navigation/application/useNavPositionManager';
import { SideNav } from 'core/modules/navigation/presentation/sideNav';
import { TopNav } from 'core/modules/navigation/presentation/topNav';
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
    <HolyGrail data-testid='wrapper'>
      {(navPosition === 'top' || header) && (
        <HolyGrailHeader>
          {navPosition === 'top' && <TopNav onNavToggle={toggleNavPosition} />}
          {header}
        </HolyGrailHeader>
      )}
      <HolyGrailMain data-testid='mainWrapper'>
        {(navPosition === 'side' || leftAside) && (
          <HolyGrailLeft data-testid='leftAside'>
            {navPosition === 'side' && <SideNav onNavToggle={toggleNavPosition} />}
            {leftAside}
          </HolyGrailLeft>
        )}
        <HolyGrailContent data-testid='main'>{children}</HolyGrailContent>
        {rightAside && <HolyGrailRight>{rightAside}</HolyGrailRight>}
      </HolyGrailMain>
      <HolyGrailFooter>{footer ?? <Footer />}</HolyGrailFooter>
    </HolyGrail>
  );
};
