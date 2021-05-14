import { render, screen } from '@testing-library/react';
import { Footer, copyrightDate } from '../index';
import { Constants } from '../../../utils/constants';

const { version, creationYear } = Constants;
const { getByTestId } = screen;
let copyright: HTMLElement;

describe('footer', () => {
  beforeEach(() => {
    render(<Footer />);
    copyright = getByTestId('copyright');
  });
  screen.debug();
  it('Should contain the creationYear', () => {
    expect(copyright).toHaveTextContent(creationYear.toString());
  });
  it('Should contain the version', () => {
    expect(copyright).toHaveTextContent(version);
  });
  it('Should contain the copyright date', () => {
    expect(copyright).toHaveTextContent(copyrightDate);
  });
  it('Should display properly formatted copyright date  ', () => {
    expect(copyrightDate).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
  });
});
