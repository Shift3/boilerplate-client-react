import { FlashMessageContainer } from '../styled';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('FlashMessage Styled Components', () => {
  it('Should match the stored <FlashMessageContainer /> snapshot', () => snapshotMatch(<FlashMessageContainer />));
});