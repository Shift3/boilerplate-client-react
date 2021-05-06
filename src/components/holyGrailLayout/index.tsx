import { HolyGrailWrapper, HolyGrailHeader, HolyGrailLeftAside, HolyGrailMain, HolyGrailRightAside } from './styled';
import { HolyGrail } from './types';

export const HolyGrailLayout: HolyGrail = () => (
  <HolyGrailWrapper>
    <HolyGrailHeader>Header</HolyGrailHeader>
    <HolyGrailLeftAside>Navigation</HolyGrailLeftAside>
    <HolyGrailMain>Main Content</HolyGrailMain>
    <HolyGrailRightAside>Aside</HolyGrailRightAside>
  </HolyGrailWrapper>
);
