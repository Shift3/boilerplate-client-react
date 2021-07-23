import { Footer } from 'components/footer';
import { TopNav } from 'core/modules/navigation/presentation/topNav';
import { FC } from 'react';
import styled from 'styled-components';
import { SideNav } from '../../core/modules/navigation/presentation/sideNav';
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
  const renderTopNav = true;
  const renderSideNav = true;

  return (
    <HolyGrail>
      {(renderTopNav || header) && (
        <HolyGrailHeader>
          {renderTopNav && <TopNav/>}
          {header}
        </HolyGrailHeader>
      )}
      <HolyGrailMain>
        {(renderSideNav || leftAside) && (
          <HolyGrailLeft>
            {renderSideNav && <SideNav />}
            {leftAside}
          </HolyGrailLeft>
        )}
        <HolyGrailContent>{children}</HolyGrailContent>
        {rightAside && <HolyGrailRight>{rightAside}</HolyGrailRight>}
      </HolyGrailMain>
      <HolyGrailFooter>
        {footer ?? <Footer />}
      </HolyGrailFooter>
    </HolyGrail>
  );
};