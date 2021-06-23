import { render } from '@testing-library/react';
import { HolyGrailLayout } from '../index';
import { expectInDocByTestId } from '../../../utils/test';
import { TestRouter } from 'components/testRouter';

const renderHolyGrailWithTopNav = () => render(
  <TestRouter>
    <HolyGrailLayout navPosition='top'>
    </HolyGrailLayout>
  </TestRouter>
);

const renderHolyGrailWithSideNav = () => render(
  <TestRouter>
    <HolyGrailLayout navPosition='side'>
    </HolyGrailLayout>
  </TestRouter>
);

const renderHolyGrailWithChild = () => render(
  <TestRouter>
    <HolyGrailLayout navPosition='top'>
      <div data-testid='holyGrailChild' />
    </HolyGrailLayout>
  </TestRouter>
);

const renderHolyGrailWithLeftSidebarAndTopNav = () => render(
  <TestRouter>
    <HolyGrailLayout
      navPosition='top'
      leftSidebar={<div data-testid='propComponent' />}>
      <div data-testid='holyGrailChild' />
    </HolyGrailLayout>
  </TestRouter>
);

const renderHolyGrailWithRightSidebarAndTopNav = () => render(
  <TestRouter>
    <HolyGrailLayout
      navPosition='top'
      rightSidebar={<div data-testid='propComponent' />}>
      <div data-testid='holyGrailChild' />
    </HolyGrailLayout>
  </TestRouter>
);

describe('<HolyGrailLayout />', () => {
  describe('Rendering', () => {
    describe('With any prop config', () => {
      beforeEach(() => renderHolyGrailWithTopNav());

      it('Should render the <HolyGrailWrapper />', () =>
        expectInDocByTestId('wrapper'));

      it('Should render the <HolyGrailMainWrapper />', () =>
        expectInDocByTestId('mainWrapper'));

      it('Should render the <Footer />', () =>
        expectInDocByTestId('footer'));
    });

    describe('With navPosition prop of "top"', () => {
      beforeEach(() => renderHolyGrailWithTopNav());

      it('Should render the <TopNav />', () =>
        expectInDocByTestId('topNavbar'));
    });

    describe('With navPosition prop of "side"', () => {
      beforeEach(() => renderHolyGrailWithSideNav());

      it('Should render the <HolyGrailLeftAside/>', () =>
        expectInDocByTestId('leftAside'));

      it('Should render the <SideNav />', () =>
        expectInDocByTestId('sideNavbar'));
    });

    describe('With child component', () => {
      beforeEach(() => renderHolyGrailWithChild());

      it('Should display the <HolyGrailMain />', () =>
        expectInDocByTestId('main'));

      it('Should display the child', () =>
        expectInDocByTestId('holyGrailChild'));
    });

    describe('With component passed via leftSidebar and navPosition prop of "top"', () => {
      beforeEach(() => renderHolyGrailWithLeftSidebarAndTopNav());

      it('Should display the <HolyGrailLeftAside />', () =>
        expectInDocByTestId('leftAside'));

      it('Should display the prop component passed via leftSidebar', () =>
        expectInDocByTestId('propComponent'));
    });

    describe('With component passed via rightSidebar and navPosition prop of "top"', () => {
      beforeEach(() => renderHolyGrailWithRightSidebarAndTopNav());

      it('Should display the <HolyGrailRightAside />', () =>
        expectInDocByTestId('rightAside'));

      it('Should display the prop component passed via rightSidebar', () =>
        expectInDocByTestId('propComponent'));
    });
  });
});