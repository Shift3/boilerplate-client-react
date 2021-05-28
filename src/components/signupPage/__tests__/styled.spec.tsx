import { SignupPageContainer, SignupFormContainer } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Reset Password Page Styled Components', () => {
  it('Should match the stored <SignupPageContainer /> snapshot', () => expectToMatchSnapshot(<SignupPageContainer />));
  it('Should match the stored <SignupFormContainer /> snapshot', () => expectToMatchSnapshot(<SignupFormContainer />));
});