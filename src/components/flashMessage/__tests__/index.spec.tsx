import { render } from '@testing-library/react';
import { FlashMessage } from '..';
import { expectInDocByTestId } from '../../../utils/test';

// ---------------- @TODO --------------------
// -- TEST -- Check that the flash message is not visible.
// -- ACTION -- Set flash message without timeout.
// -- TEST -- Check that it renders. - REPEAT
// -- TEST -- Check that the variant and message are correct.
// -- ACTION -- Remove the flash message.
// -- TEST -- Check that the flash message is not displayed.
// -- ACTION -- Set flash message with timeout.
// -- TEST -- Check that it renders. - REPEAT
// -- TEST -- (CONDITIONAL) -- After the timeout has completed check that it is not present.

describe('<FlashMessage/>', () => {
  render(<FlashMessage/>);
  it('Should render the <FlashMessageContainer />', () =>
    expectInDocByTestId('fm-c'));
});