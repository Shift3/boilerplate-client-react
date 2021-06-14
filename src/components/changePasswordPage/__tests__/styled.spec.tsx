import { Wrapper } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Change Password Page Styled Components', () => {
  it('Should match the stored <Wrapper /> snapshot', () => expectToMatchSnapshot(<Wrapper />));
});
