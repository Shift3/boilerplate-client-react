import { expectToMatchSnapshot } from '../../../utils/test';
import { StyledForm, Title, FormLabel, InputError, ButtonWrapper, CancelButton, SubmitButton } from '../styled';

import 'jest-styled-components';

describe('<ChangePasswordForm /> styled components', () => {
  it('should match the stored <StyledForm /> snapshot', () => expectToMatchSnapshot(<StyledForm />));

  it('should match the stored <Title /> snapshot', () => expectToMatchSnapshot(<Title />));

  it('should match the stored <FormLabel /> snapshot', () => expectToMatchSnapshot(<FormLabel />));

  it('should match the stored <InputError /> snapshot', () => expectToMatchSnapshot(<InputError />));

  it('should match the stored <ButtonWrapper /> snapshot', () => expectToMatchSnapshot(<ButtonWrapper />));

  it('should match the stored <CancelButton /> snapshot', () => expectToMatchSnapshot(<CancelButton />));

  it('should match the stored <SubmitButton /> snapshot', () => expectToMatchSnapshot(<SubmitButton />));
});
