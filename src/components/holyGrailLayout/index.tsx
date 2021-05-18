import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside,
} from './styled';
import { HolyGrailType } from './types';

export const HolyGrailLayout: HolyGrailType = ({ leftSidebar, children, rightSidebar, footer }) => (
  <HolyGrailWrapper>
    <HolyGrailMainWrapper>
      {!!leftSidebar && <HolyGrailLeftAside>{leftSidebar}</HolyGrailLeftAside>}
      {!!children && <HolyGrailMain data-testid="main">{children}</HolyGrailMain>}
      {!!rightSidebar && <HolyGrailRightAside>{rightSidebar}</HolyGrailRightAside>}
    </HolyGrailMainWrapper>
    {!!footer && footer}
  </HolyGrailWrapper>
);
