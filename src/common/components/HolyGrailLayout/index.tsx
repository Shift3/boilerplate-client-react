import { Footer } from 'common/components/Footer';
import { SideNavbar } from 'features/navbar';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const HolyGrail = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HolyGrailMain = styled.div`
  display: flex;
  flex: auto;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

const HolyGrailLeft = styled.aside`
  flex-grow: 0;
`;

const HolyGrailContent = styled.main`
  flex-grow: 1;
  margin-top: 2rem;
  margin-left: 280px;
  padding: 0 2rem;
`;

const HolyGrailRight = styled.aside`
  min-width: 16.25em;
  max-width: 16.25em;
  flex-grow: 0;
`;

const HolyGrailFooter = styled.footer`
`;

type Props = {
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
};

export const HolyGrailLayout: FC<Props> = ({ leftAside, children, rightAside, footer }) => {
  return (
    <HolyGrail>
      <HolyGrailMain>
        <HolyGrailLeft>
          <SideNavbar />
          {leftAside}
        </HolyGrailLeft>
        <HolyGrailContent>{children}</HolyGrailContent>
        {rightAside && <HolyGrailRight>{rightAside}</HolyGrailRight>}
      </HolyGrailMain>
      <HolyGrailFooter>{footer ?? <Footer />}</HolyGrailFooter>
    </HolyGrail>
  );
};
