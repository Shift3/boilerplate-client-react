import { render, screen } from '@testing-library/react';
import { HolyGrailLayout } from '../index';

// const { version, creationYear } = Constants;
// const { getByTestId } = screen;
// let copyright: HTMLElement;

describe('holyGrailLayout', ({leftSidebar, children }) => {
  beforeEach(() => {
    render(<HolyGrailLayout />);
  });
  screen.debug();
  it('Should render the left sidebar, () => {
    // expect(leftSidebar).toBeInTheDocument());
  // it('Should contain the version', () => {
  //   expect(copyright).toHaveTextContent(version);
  // });
  // it('Should contain the copyright date', () => {
  //   expect(copyright).toHaveTextContent(copyrightDate);
  // });
  // it('Should display properly formatted copyright date  ', () => {
  //   expect(copyrightDate).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
  // });
});
})