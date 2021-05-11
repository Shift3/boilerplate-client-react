import { render, screen } from '@testing-library/react';
import { Footer, copyrightDate, creationYear } from '../index';
import { Constants } from '../../../utils/constants';

/* Keep comments on 'screen.debug' method as
reference for futures tests (EE)...

test('screen debug element', () => {
  render(<Footer />);
  screen.debug();
});
*/

test('should return element based on its role', () => {
  const { getByRole } = render(<div role="footer" />);
  expect(getByRole('footer')).toMatchInlineSnapshot(`
    <div
      role="footer"
    />
  `);
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('footer', () => {
  let footer: HTMLElement;

  describe('render()', () => {
    const { getByText } = render(<Footer />);

    it('Should contain the creationYear', () => {
      const { getByText } = render('2021');
      expect(getByText(2021)).toBeInTheDocument();
    });
    it('Should contain the Version', () => {
      const { getByText } = render(<Footer />);
      expect(getByText(/Bitwise Technology Constulting - 0.1.0 Staging/)).toBeInTheDocument();
    });
    it('Should contain the properly formatted copyright date', () => {
      const { getByText } = render('copyrightDate');
      expect(getByText('copyrightDate')).toBeInTheDocument();
      expect(copyrightDate()).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
    });
  });
});
