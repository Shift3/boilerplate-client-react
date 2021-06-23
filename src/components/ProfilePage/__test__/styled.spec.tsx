import { expectToMatchSnapshot } from '../../../utils/test';
import { ProfilePageContainer } from '../styled';

import 'jest-styled-components';

describe('<ProfilePage /> styled component snapshot tests', () => {
  it('Should match the stored <ProfilePageContainer /> snapshot', () =>
    expectToMatchSnapshot(<ProfilePageContainer />));
});