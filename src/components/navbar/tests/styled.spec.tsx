import { NavBarWrapper, NavLogo, NavLinkWrapper, NavLinkStyled } from '../styled';
import renderer from 'react-test-renderer';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('Navbar Styled Components', () => {
  it('Should match the stored <NavBarWrapper /> snapshot', () => snapshotMatch(<NavBarWrapper />));
  it('Should match the stored <NavLogo /> snapshot', () => snapshotMatch(<NavLogo />));
  it('Should match the stored <NavLinkWrapper /> snapshot', () => snapshotMatch(<NavLinkWrapper />));
  // it('Should match the stored <NavLinkStyled /> snapshot', () => expect(renderer.create(<NavLinkStyled />).toJSON()).toMatchSnapshot());
});