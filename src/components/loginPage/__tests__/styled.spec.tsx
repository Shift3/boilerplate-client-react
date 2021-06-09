/* eslint-disable no-undef */
import { Wrapper } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Login Page Styled Components', () => {
  it('Should match the stored <LoginPageContainer /> snapshot', () => expectToMatchSnapshot(<Wrapper />));
});
