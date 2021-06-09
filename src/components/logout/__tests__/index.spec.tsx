/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { Logout } from '..';
import { expectInDocByRole, expectInnerHTMLByRole } from '../../../utils/test';

describe('Logout Button', () => {
  beforeEach(() => render(<Logout />));

  it('Should render', () => expectInDocByRole('button'));

  it('Should have an innerHTML equal to "Sign Out"', () => expectInnerHTMLByRole('button', 'Sign Out'));
});
