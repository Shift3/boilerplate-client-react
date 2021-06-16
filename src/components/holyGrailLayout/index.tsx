import { Footer } from 'components/footer';
import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside,
} from './styled';
import { HolyGrailType } from './types';

export const HolyGrailLayout: HolyGrailType = ({ top, leftSidebar, children, rightSidebar }) => (
  <HolyGrailWrapper data-testid="wrapper">
    <HolyGrailMainWrapper data-testid="mainWrapper">
      { !!top && top }
      {!!leftSidebar && <HolyGrailLeftAside data-testid="leftAside">{leftSidebar}</HolyGrailLeftAside>}
      {!!children && <HolyGrailMain data-testid="main">{children}</HolyGrailMain>}
      {!!rightSidebar && <HolyGrailRightAside data-testid="rightAside">{rightSidebar}</HolyGrailRightAside>}
    </HolyGrailMainWrapper>
    <Footer />
  </HolyGrailWrapper>
);
