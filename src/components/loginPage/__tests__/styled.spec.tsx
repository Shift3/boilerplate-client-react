import { LoginPageContainer, LoginFormContainer, LoginFormContainerLeft, LoginFormContainerRight } from '../styled';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('Login Page Styled Components', () => {
  it('Should match the stored <LoginPageContainer /> snapshot', () => snapshotMatch(<LoginPageContainer />));
  it('Should match the stored <LoginFormContainer /> snapshot', () => snapshotMatch(<LoginFormContainer />));
  it('Should match the stored <LoginFormContainerLeft /> snapshot', () => snapshotMatch(<LoginFormContainerLeft />));
  it('Should match the stored <LoginFormContainerRight /> snapshot', () => snapshotMatch(<LoginFormContainerRight />));
});