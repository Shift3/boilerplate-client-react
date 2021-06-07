/* eslint-disable jsx-quotes */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LogInPage } from '..';
import { expectInDocByTestId, expectInnerHTMLByTestId, clickNavigateByTestId } from '../../../utils/test';

const renderInitialTestDOM = () =>
  render(
    <Router>
      <Switch>
        <Route exact path='/login' component={LogInPage} />
      </Switch>
    </Router>,
  );

const renderNavigationTestDOM = () =>
  render(
    <Router>
      <Switch>
        <Route exact path='/' component={LogInPage} />
        <Route exact path='/auth/signup' component={() => <div />} />
      </Switch>
    </Router>,
  );

describe('<LoginPage/>', () => {
  describe('Rendering', () => {
    beforeEach(renderInitialTestDOM);

    it('Should render the <LoginPageContainer/>', () => expectInDocByTestId('lpc'));

    it('Should render the <LoginFormContainer/>', () => expectInDocByTestId('lfc'));

    it('Should render the <LoginFormContainerRight/>', () => expectInDocByTestId('lfc-r'));

    it('Should render the <LoginFormContainerLeft/>', () => expectInDocByTestId('lfc-l'));

    it('Should render the <LoginForm/>', () => expectInDocByTestId('lf'));

    it('Should render an <h2/> with innerHTML equal to "Not Registered Yet?', () =>
      expectInnerHTMLByTestId('lfc-r-h2', 'Not Registered Yet?'));

    it('Should render a <p/> with innerHTML equal to "Registering for your account is quick and easy', () =>
      expectInnerHTMLByTestId('lfc-r-p', 'Registering for your account is quick and easy'));

    it('Should render a <button/> with innerHTML equal to "CREATE ACCOUNT"', () =>
      expectInnerHTMLByTestId('ca-btn', 'CREATE ACCOUNT'));
  });

  describe('navigation', () => {
    beforeEach(renderNavigationTestDOM);

    it('Should navigate to "/auth/signup" when the "CREATE ACCOUNT" button is clicked', () =>
      clickNavigateByTestId('ca-btn', '/auth/signup'));
  });
});
