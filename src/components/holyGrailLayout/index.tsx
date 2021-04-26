import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside,
  HolyGrailFooter,
} from './styled';
import { HolyGrail, HolyGrailLayoutProps } from './types';

export const HolyGrailLayout: HolyGrail = ({ leftSidebar, children, rightSidebar, footer }: HolyGrailLayoutProps) => (
  <HolyGrailWrapper>
    <HolyGrailMainWrapper>
      {!!leftSidebar && <HolyGrailLeftAside>{leftSidebar}</HolyGrailLeftAside>}
      {!!children && <HolyGrailMain>{children}</HolyGrailMain>}
      {!!rightSidebar && <HolyGrailRightAside>{rightSidebar}</HolyGrailRightAside>}
      {!!footer && <HolyGrailFooter>{footer}</HolyGrailFooter>}
    </HolyGrailMainWrapper>
  </HolyGrailWrapper>
);
