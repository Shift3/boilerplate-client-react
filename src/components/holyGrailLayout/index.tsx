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
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HolyGrailLeft = styled.aside`
  flex: 0.75 1;      
  height: 100%;

   @media (max-width: 540px) {
      flex-direction: column;
    }
`;

export const HolyGrailContent = styled.main`
  flex: 3 3;
  height: 100%;

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

export const HolyGrailRight = styled.aside`
  flex: 0.75 1;
  height: 100%;

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