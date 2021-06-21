import { render, screen } from '@testing-library/react';
import { Navbar } from '../navbar';
import { expectInDocByTestId } from '../../../utils/test';
import { TestRouter } from '../../testRouter';

describe('<Navbar />', () => {
  it ('Should render the <TopNav /> when the attribute "topNav" is present', () => {
    render(
      <TestRouter>
        <Navbar/>
      </TestRouter>
    );
    screen.debug();
    expectInDocByTestId('topNavbar');
  });

  it ('Should render the <SideNav /> when the attribute "sideNav" is present', () => {
    render(
      <TestRouter>
        <Navbar/>
      </TestRouter>
    );

    expectInDocByTestId('navWrapper');
  });
});
