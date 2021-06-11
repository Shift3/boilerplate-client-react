import { expectToMatchSnapshot } from '../../../utils/test';
import { LoginWrapper, Wrapper, LeftLogin, LinkWrapper, RightLogin, Title, Text } from '../styled';

import 'jest-styled-components';

describe('<LogInPage /> styled components', () => {
  it('Should match the stored <Wrapper/> snapshot', () => expectToMatchSnapshot(<Wrapper />));

  it('Should match the stored <LoginWrapper/> snapshot', () => expectToMatchSnapshot(<LoginWrapper />));

  it('Should match the stored <LeftLogin/> snapshot', () => expectToMatchSnapshot(<LeftLogin />));

  it('Should match the stored <LinkWrapper/> snapshot', () => expectToMatchSnapshot(<LinkWrapper />));

  it('Should match the stored <RightLogin/> snapshot', () => expectToMatchSnapshot(<RightLogin />));

  it('Should match the stored <Title/> snapshot', () => expectToMatchSnapshot(<Title />));

  it('Should match the stored <Text/> snapshot', () => expectToMatchSnapshot(<Text />));
});
