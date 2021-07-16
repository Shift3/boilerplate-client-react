import { Footer } from 'components/footer';
import { TopNav } from 'core/modules/navigation/presentation/topNav';
import {
  HolyGrailFooter, HolyGrailHeader, HolyGrailLeftSideBar, HolyGrailMain, HolyGrailRightSideBar, HolyGrailWrapper
} from './styled';
import { HolyGrailType } from './types';

export const HolyGrailLayout: HolyGrailType = ({ leftSidebar, children, rightSidebar }) => (
  <HolyGrailWrapper data-testid='wrapper'>
    <HolyGrailHeader data-testid='header'>{TopNav}</HolyGrailHeader>
    <HolyGrailLeftSideBar data-testid='leftAside'>{leftSidebar}</HolyGrailLeftSideBar>
    <HolyGrailMain data-testid='main'>{children}</HolyGrailMain>
    <HolyGrailRightSideBar data-testid='rightAside'>{rightSidebar}</HolyGrailRightSideBar>
    <HolyGrailFooter data-testid='footer'>{Footer}</HolyGrailFooter>
  </HolyGrailWrapper>
);