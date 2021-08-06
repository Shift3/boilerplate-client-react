import { render } from '@testing-library/react';
import { Footer, copyrightDate } from '../Footer';
import { Constants } from '../../../utils/constants';
import { expectInDocByTestId, expectTextContentByTestId } from '../../../utils/test';

const { version, creationYear } = Constants;

const expectedCopyrightDate = `${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`;

describe('footer', () => {
  beforeEach(() => render(<Footer />));

  it('Should display the wrapper', () => expectInDocByTestId('footer'));

  it('Should contain the creationYear', () => expectTextContentByTestId('copyright', creationYear.toString()));

  it('Should contain the version', () => expectTextContentByTestId('copyright', version));

  it('Should contain the copyright date', () => expectTextContentByTestId('copyright', copyrightDate));

  it('Should display properly formatted copyright date', () => expect(copyrightDate).toEqual(expectedCopyrightDate));
});
