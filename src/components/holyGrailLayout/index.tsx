import { Footer } from 'components/footer';
import { Navbar } from 'components/navbar/navbar';
import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside,
} from './styled';
import { HolyGrailType } from './types';

export const HolyGrailLayout: HolyGrailType = ({ leftSidebar, children, rightSidebar, navPosition }) => (
  <HolyGrailWrapper data-testid='wrapper'>
    <HolyGrailMainWrapper data-testid='mainWrapper'>
      {
        navPosition === "top" &&
        <Navbar navPosition={navPosition} />
      }
      {
        navPosition === "side" && !leftSidebar &&
        (
          <HolyGrailLeftAside data-testid='leftAside'>
            <Navbar navPosition={navPosition} />
          </HolyGrailLeftAside>
        )
      }
      {
        leftSidebar && navPosition === "top" &&
        <HolyGrailLeftAside data-testid='leftAside'>
          {leftSidebar}
        </HolyGrailLeftAside>
      }
      {
        children &&
        <HolyGrailMain data-testid='main'>
          {children}
        </HolyGrailMain>}
      {
        rightSidebar &&
        <HolyGrailRightAside data-testid='rightAside'>
          {rightSidebar}
        </HolyGrailRightAside>
      }
    </HolyGrailMainWrapper>
    <Footer />
  </HolyGrailWrapper>
);
