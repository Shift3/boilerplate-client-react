import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line
import { createMemoryHistory } from 'history';
import { ChangePasswordPage } from '../index';
import { expectInDocByTestId } from '../../../utils/test';

describe('<ChangePasswordPage/>', () => {
  describe('Rendering', () => {
    beforeEach(() =>
      render(
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
          <ChangePasswordPage />
        </Router>,
      ),
    );

    it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

    it('Should render the <ChangePasswordForm/>', () => expectInDocByTestId('changePasswordForm'));
  });
});
