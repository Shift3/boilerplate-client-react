import { expectToMatchSnapshot } from '../../../utils/test';
// import renderer from 'react-test-renderer';
import {
  TopNavbar,
  TopNavLogo,
  NavContainerLeft,
  NavContainerRight,
  // NavIcon,
} from '../styled/topNav.styled';

import 'jest-styled-components';

describe('<TopNav/> styled component snapshot tests', () => {
  it ('Should match the stored <Navbar /> snapshot', () =>
    expectToMatchSnapshot(<TopNavbar/>));

  it ('Should match the stored <TopNavLogo /> snapshot', () =>
    expectToMatchSnapshot(<TopNavLogo/>));

  it ('Should match the stored <NavContainerLeft /> snapshot', () =>
    expectToMatchSnapshot(<NavContainerLeft/>));

  it ('Should match the stored <NavContainerRight /> snapshot', () =>
    expectToMatchSnapshot(<NavContainerRight/>));

  // @TODO - find solution for snapshot testing with components
  // that do not fit the type definition for currently used methodology

  // it ('Should match the stored <NavIcon /> snapshot', () =>
  //   expect(renderer.create(<NavIcon />).toJSON()).toMatchSnapshot());
});