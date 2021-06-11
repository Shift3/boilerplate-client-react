import { expectToMatchSnapshot } from '../../../utils/test';
import renderer from 'react-test-renderer';
import { LoginWrapper, Wrapper, LeftLogin, LinkWrapper, RightLogin, Title, Text, CreateAccountButton } from '../styled';

import 'jest-styled-components';

describe('<LogInPage /> styled components', () => {
  it('Should match the stored <Wrapper/> snapshot', () => expectToMatchSnapshot(<Wrapper />));

  it('Should match the stored <LoginWrapper/> snapshot', () => expectToMatchSnapshot(<LoginWrapper />));

  it('Should match the stored <LeftLogin/> snapshot', () => expectToMatchSnapshot(<LeftLogin />));

  it('Should match the stored <LinkWrapper/> snapshot', () => expectToMatchSnapshot(<LinkWrapper />));

  it('Should match the stored <RightLogin/> snapshot', () => expectToMatchSnapshot(<RightLogin />));

  it('Should match the stored <Title/> snapshot', () => expectToMatchSnapshot(<Title />));

  it('Should match the stored <Text/> snapshot', () => expectToMatchSnapshot(<Text />));

  it('Should match the stored <CreateAccountButton/> snapshot', () =>
    expect(renderer.create(<CreateAccountButton />).toJSON()).toMatchSnapshot());
});
