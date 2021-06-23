import { expectToMatchSnapshot } from '../../../utils/test';
// import renderer from 'react-test-renderer';
import {
  DropdownButton,
  Dropdown,
  NavDropdownItem,
  DropdownContainerLeft,
  ProfilePhoto,
  DropdownContainerRight,
  VerticalLine,
  // NavIcon,
  // DirectoryLink,
} from '../styled/navDropdown.styled';

import 'jest-styled-components';

describe('<NavDropdown /> styled component snapshot tests', () => {
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

  // @TODO - find solution for snapshot testing with components
  // that do not fit the type definition for currently used methodology

  // it ('Should match the stored <NavIcon /> snapshot', () =>
  //   expect(renderer.create(<NavIcon />).toJSON()).toMatchSnapshot());

  // it ('Should match the stored <DirectoryLink /> snapshot', () =>
  //   expect(renderer.create(<DirectoryLink />).toJSON()).toMatchSnapshot());
});