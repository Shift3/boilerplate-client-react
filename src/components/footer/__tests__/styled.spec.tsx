import { Wrapper } from '../styled';

import 'jest-styled-components';
import { expectToMatchSnapshot } from 'utils/test';

describe('<Wrapper />', () => {
  it('should match the stored snapshot', () => {
    expectToMatchSnapshot(<Wrapper />);
  });
});
