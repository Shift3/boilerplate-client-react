/* eslint-disable max-len */
/* eslint-disable no-undef */
import { ResetPasswordPageContainer, ResetPasswordFormContainer } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Reset Password Page Styled Components', () => {
  it('Should match the stored <ResetPasswordPageContainer /> snapshot', () =>
    expectToMatchSnapshot(<ResetPasswordPageContainer />));
  it('Should match the stored <ResetPasswordFormContainer /> snapshot', () =>
    expectToMatchSnapshot(<ResetPasswordFormContainer />));
});
