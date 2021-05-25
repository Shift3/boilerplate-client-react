import { SignupPageContainer, SignupFormContainer } from '../styled';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('Reset Password Page Styled Components', () => {
  it('Should match the stored <SignupPageContainer /> snapshot', () => snapshotMatch(<SignupPageContainer />));
  it('Should match the stored <SignupFormContainer /> snapshot', () => snapshotMatch(<SignupFormContainer />));
});