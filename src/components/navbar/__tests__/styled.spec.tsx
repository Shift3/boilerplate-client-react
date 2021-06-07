/* eslint-disable no-undef */
import { NavBarWrapper, NavLogo, NavLinkWrapper } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Navbar Styled Components', () => {
  it('Should match the stored <NavBarWrapper /> snapshot', () => expectToMatchSnapshot(<NavBarWrapper />));
  it('Should match the stored <NavLogo /> snapshot', () => expectToMatchSnapshot(<NavLogo />));
  it('Should match the stored <NavLinkWrapper /> snapshot', () => expectToMatchSnapshot(<NavLinkWrapper />));

  // it('Should match the stored <NavLinkStyled /> snapshot', () =>
  //   expect(renderer.create(<NavLinkStyled />).toJSON()).toMatchSnapshot());
});
