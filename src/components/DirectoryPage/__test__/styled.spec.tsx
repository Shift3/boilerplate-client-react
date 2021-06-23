import { expectToMatchSnapshot } from '../../../utils/test';
import { DirectoryPageContainer } from '../styled';

import 'jest-styled-components';

describe('<DirectoryPage /> styled component snapshot tests', () => {
  it('Should match the stored <DirectoryPageContainer /> snapshot', () =>
    expectToMatchSnapshot(<DirectoryPageContainer />));
});