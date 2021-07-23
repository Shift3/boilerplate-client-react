import { Footer } from 'components/footer';
import { TopNav } from 'core/modules/navigation/presentation/topNav';
import { FC } from 'react';
import styled from 'styled-components';
import { SideNav } from '../../core/modules/navigation/presentation/sideNav';
import { } from '../../utils/styleValues';
import { HolyGrailLayoutProps } from './types';

export const HolyGrail = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HolyGrailHeader = styled.header`
`;

export const HolyGrailMain = styled.div`
  display: flex;
  flex: auto;
`;

export const HolyGrailLeft = styled.aside`
 min-width: 20%;
  max-width: 20%;
  flex-grow: 0;
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

export const HolyGrailContent = styled.main`
  min-width: 60%;
  flex-grow: 1;
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

export const HolyGrailRight = styled.aside`
  min-width: 20%;
  max-width: 20%;
  flex-grow: 0;
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

export const HolyGrailFooter = styled.footer`
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

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