import { expectToMatchSnapshot } from '../../../utils/test';
import {
  SideNavbar,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  NavLogo,
} from '../styled/sideNav.styled';

import 'jest-styled-components';

describe('SideNav Styled Components', () => {
  it('Should match the stored <SideNavbar /> snapshot', () => expectToMatchSnapshot(<SideNavbar />));
  it('Should match the stored <TopContainer /> snapshot', () => expectToMatchSnapshot(<TopContainer />));
  it('Should match the stored <MiddleContainer /> snapshot', () => expectToMatchSnapshot(<MiddleContainer />));
  it('Should match the stored <BottomContainer /> snapshot', () => expectToMatchSnapshot(<BottomContainer />));
  it('Should match the stored <NavLogo /> snapshot', () => expectToMatchSnapshot(<NavLogo />));
});
