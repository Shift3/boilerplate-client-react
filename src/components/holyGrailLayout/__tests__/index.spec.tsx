import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { HolyGrailLayout } from '../index';
import { expectInDocByTestId, expectNotInDocByTestId } from '../../../utils/test';
import store from 'core/redux/store';
import { createMemoryHistory } from 'history';

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

    it('Should display the HolyGrailMainWrapper', () => expectInDocByTestId('mainWrapper'));

    it('Should display the Footer', () => expectInDocByTestId('footer'));

    it('Should not display the HolyGrailLeftAside', () => expectNotInDocByTestId('leftAside'));

    it('Should not display the HolyGrailMain', () => expectNotInDocByTestId('main'));

    it('Should not display the HolyGrailRightAside', () => expectNotInDocByTestId('rightAside'));
  });

  describe('With all props passed in and child present', () => {
    beforeEach(renderWithPropsAndChild);

    it('Should display the HolyGrailWrapper', () => expectInDocByTestId('wrapper'));

    it('Should display the HolyGrailMainWrapper', () => expectInDocByTestId('mainWrapper'));

    it('Should display the Footer', () => expectInDocByTestId('footer'));

    it('Should display the HolyGrailLeftAside', () => expectInDocByTestId('leftAside'));

    it('Should display the HolyGrailRighttAside', () => expectInDocByTestId('rightAside'));

    it('Should display HolyGrailMain', () => expectInDocByTestId('main'));
  });
});
