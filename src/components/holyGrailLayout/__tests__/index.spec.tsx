import { render } from '@testing-library/react';
import store from 'core/redux/store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { expectInDocByTestId, expectNotInDocByTestId } from '../../../utils/test';
import { HolyGrailLayout } from '../index';

const renderWithNoProps = () =>
  render(
    <Provider store={store}>
      <Router history={createMemoryHistory()}>
        <HolyGrailLayout />
      </Router>
    </Provider>,
  );

const renderWithPropsAndChild = () =>
  render(
    <Provider store={store}>
      <Router history={createMemoryHistory()}>
        <HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />}>
          <div />
        </HolyGrailLayout>
      </Router>
    </Provider>,
  );

describe('HolyGrailLayout', () => {
  describe('With no props passed in', () => {
    beforeEach(renderWithNoProps);

    it('Should display the HolyGrailWrapper', () => expectInDocByTestId('wrapper'));

    it('Should display the HolyGrailHeader', () => expectInDocByTestId('header'));

    it('Should not display the HolyGrailLeftSideBar', () => expectNotInDocByTestId('leftAside'));

    it('Should not display the HolyGrailMain', () => expectNotInDocByTestId('main'));

    it('Should not display the HolyGrailRightSideBar', () => expectNotInDocByTestId('rightAside'));

    it('Should display the HolyGrailFooter', () => expectInDocByTestId('footer'));
  });

  describe('With all props passed in and child present', () => {
    beforeEach(renderWithPropsAndChild);

    it('Should display the HolyGrailWrapper', () => expectInDocByTestId('wrapper'));

    it('Should display the HolyGrailHeader', () => expectInDocByTestId('headers'));

    it('Should display the HolyGrailLeftSideBar', () => expectInDocByTestId('leftAside'));

    it('Should display the HolyGrailRightSideBar', () => expectInDocByTestId('rightAside'));

    it('Should display HolyGrailMain', () => expectInDocByTestId('main'));

    it('Should display the HolyGrailFooter', () => expectInDocByTestId('footer'));
  });
});
