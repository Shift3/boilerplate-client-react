import { HolyGrailWrapper, HolyGrailNavLeft, HolyGrailMain, HolyGrailFooter } from './styled';
import { HolyGrail, HolyGrailLayoutProps } from './types';

export const HolyGrailLayout: HolyGrail = ({ navBar, footer, children }: HolyGrailLayoutProps) => (
  <HolyGrailWrapper>
    <HolyGrailNavLeft>{navBar}</HolyGrailNavLeft>
    <HolyGrailMain>{children}</HolyGrailMain>
    <HolyGrailFooter>{footer}</HolyGrailFooter>
  </HolyGrailWrapper>
);
