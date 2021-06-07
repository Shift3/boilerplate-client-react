import { LoginPageContainer, LoginFormContainer, LoginFormLeft, LoginFormRight } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Login Page Styled Components', () => {
  it('Should match the stored <LoginPageContainer /> snapshot', () => expectToMatchSnapshot(<LoginPageContainer />));
  it('Should match the stored <LoginFormContainer /> snapshot', () => expectToMatchSnapshot(<LoginFormContainer />));
  it('Should match the stored <LoginFormContainerLeft /> snapshot', () => expectToMatchSnapshot(<LoginFormLeft />));
  it('Should match the stored <LoginFormContainerRight /> snapshot', () => expectToMatchSnapshot(<LoginFormRight />));
});
