import { expectToMatchSnapshot } from '../../../utils/test';
// import renderer from 'react-test-renderer';
import {
  TopNavbar,
  TopNavLogo,
  // DirectoryLink,
  DropdownButton,
  Dropdown,
  NavDropdownItem,
  DropdownContainerLeft,
  ProfilePhoto,
  DropdownContainerRight,
  VerticalLine,
  NavContainerLeft,
  NavContainerRight,
  // NavIcon,
  // LoginCreateAccountButton
} from '../styled';

import 'jest-styled-components';

describe('<TopNav/> styled componenets', () => {
  it ('Should match the stored <Navbar /> snapshot', () =>
    expectToMatchSnapshot(<TopNavbar/>));

  it ('Should match the stored <TopNavLogo /> snapshot', () =>
    expectToMatchSnapshot(<TopNavLogo/>));

  it ('Should match the stored <DropdownButton /> snapshot', () =>
    expectToMatchSnapshot(<DropdownButton/>));

  it ('Should match the stored <Dropdown /> snapshot', () =>
    expectToMatchSnapshot(<Dropdown/>));

  it ('Should match the stored <NavDropdownItem /> snapshot', () =>
    expectToMatchSnapshot(<NavDropdownItem/>));

  it ('Should match the stored <DropdownContainerLeft /> snapshot', () =>
    expectToMatchSnapshot(<DropdownContainerLeft/>));

  it ('Should match the stored <ProfilePhoto /> snapshot', () =>
    expectToMatchSnapshot(<ProfilePhoto/>));

  it ('Should match the stored <DropdownContainerRight /> snapshot', () =>
    expectToMatchSnapshot(<DropdownContainerRight/>));

  it ('Should match the stored <VerticalLine /> snapshot', () =>
    expectToMatchSnapshot(<VerticalLine/>));

  it ('Should match the stored <NavContainerLeft /> snapshot', () =>
    expectToMatchSnapshot(<NavContainerLeft/>));

  it ('Should match the stored <NavContainerRight /> snapshot', () =>
    expectToMatchSnapshot(<NavContainerRight/>));

  // @TODO - find solution for snapshot testing with components
  // that do not fit the type definition for currently used methodology

  // it ('Should match the stored <NavIcon /> snapshot', () =>
  //   expect(renderer.create(<NavIcon />).toJSON()).toMatchSnapshot());

  // it ('Should match the stored <DirectoryLink /> snapshot', () =>
  //   expect(renderer.create(<DirectoryLink />).toJSON()).toMatchSnapshot());

  // it ('Should match the stored <LoginCreateAccountButton /> snapshot', () =>
  //   expect(renderer.create(<LoginCreateAccountButton />).toJSON()).toMatchSnapshot());
});