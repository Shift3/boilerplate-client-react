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
import { Constants } from 'utils/constants';

const { navPosition } = Constants;

export const HolyGrailLayout: HolyGrailType = ({ leftSidebar, children, rightSidebar }) => (
  <HolyGrailWrapper data-testid='wrapper'>
    <HolyGrailMainWrapper data-testid='mainWrapper'>
      {
        navPosition === "top" &&
          <Navbar/>
      }
      {
        navPosition === "side" && !leftSidebar &&
          (
            <HolyGrailLeftAside data-testid='leftAside'>
              <Navbar/>
            </HolyGrailLeftAside>
          )
      }
      {
        leftSidebar && navPosition === "top" &&
          <HolyGrailLeftAside data-testid='leftAside'>
            { leftSidebar }
          </HolyGrailLeftAside>
      }
      {
        children &&
          <HolyGrailMain data-testid='main'>
            { children }
          </HolyGrailMain>}
      {
        rightSidebar &&
          <HolyGrailRightAside data-testid='rightAside'>
            { rightSidebar }
          </HolyGrailRightAside>
      }
    </HolyGrailMainWrapper>
    <Footer />
  </HolyGrailWrapper>
);
