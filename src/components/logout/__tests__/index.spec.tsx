import { render } from '@testing-library/react';
import store from 'core/redux/store';
import { Provider } from 'react-redux';
import { Logout } from '../Logout';
import { expectInDocByRole, expectInnerHTMLByRole } from '../../../utils/test';

describe('Logout Button', () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <Logout />
      </Provider>,
    ),
  );

  it('Should render', () => expectInDocByRole('button'));

  it('Should have an innerHTML equal to "Sign Out"', () => expectInnerHTMLByRole('button', 'Sign Out'));
});
