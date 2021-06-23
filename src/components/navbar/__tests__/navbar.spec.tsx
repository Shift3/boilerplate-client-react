import { render } from '@testing-library/react';
import { Navbar } from '../navbar';
import { expectInDocByTestId } from '../../../utils/test';
import { TestRouter } from '../../testRouter';

describe('<Navbar />', () => {
  describe('topNavbar', () => {
    beforeEach(() => render(
      <TestRouter>
        <Navbar navPosition='top' />
      </TestRouter>
    ));

    it('Should render the <TopNav /> when the navPosition prop is "top"', () =>
      expectInDocByTestId('topNavbar'));
  });

  describe('sideNavbar', () => {
    beforeEach(() => render(
      <TestRouter>
        <Navbar navPosition='side' />
      </TestRouter>
    ));

    it('Should render the <SideNav /> when the navPosition prop is "side"', () =>
      expectInDocByTestId('sideNavbar'));
  });
});
