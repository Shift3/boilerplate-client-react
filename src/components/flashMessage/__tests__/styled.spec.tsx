import { FlashMessageContainer } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('FlashMessage Styled Components', () => {
  it('Should match the stored <FlashMessageContainer /> snapshot', () => expectToMatchSnapshot(<FlashMessageContainer />));
});