import { ResetPasswordPageContainer, ResetPasswordFormContainer } from '../styled';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('Reset Password Page Styled Components', () => {
  it('Should match the stored <ResetPasswordPageContainer /> snapshot', () => snapshotMatch(<ResetPasswordPageContainer />));
  it('Should match the stored <ResetPasswordFormContainer /> snapshot', () => snapshotMatch(<ResetPasswordFormContainer />));
});