import { HolyGrailWrapper, HolyGrailLeftAside1, HolyGrailMain2, HolyGrailRightAside3, HolyGrailFooter } from './styled';
import { HolyGrail, HolyGrailLayoutProps } from './types';

export const HolyGrailLayout: HolyGrail = ({ leftSidebar, children, rightSidebar, footer }: HolyGrailLayoutProps) => (
  <HolyGrailWrapper>
    {!!leftSidebar && <HolyGrailLeftAside1>{leftSidebar}</HolyGrailLeftAside1>}
    {!!children && <HolyGrailMain2>{children}</HolyGrailMain2>}
    {!!rightSidebar && <HolyGrailRightAside3>{rightSidebar}</HolyGrailRightAside3>}
    {!!footer && <HolyGrailFooter>{footer}</HolyGrailFooter>}
  </HolyGrailWrapper>
);
