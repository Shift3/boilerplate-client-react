/* eslint-disable jsx-quotes */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LogInPage } from '../index';
import { expectInDocByTestId, expectInnerHTMLByTestId, clickNavigateByTestId } from '../../../utils/test';

const renderInitialTestDOM = () =>
  render(
    <Router>
      <Switch>
        <Route exact path='/' component={LogInPage} />
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

    it('Should render the <Wrapper/>', () => expectInDocByTestId('wrapper'));

    it('Should render the <LoginWrapper/>', () => expectInDocByTestId('loginWrapper'));

    it('Should render the <LoginFormContainerRight/>', () => expectInDocByTestId('rightLogin'));

    it('Should render the <LoginFormContainerLeft/>', () => expectInDocByTestId('leftLogin'));

    it('Should render the <LoginForm/>', () => expectInDocByTestId('loginForm'));

    it('Should render an <h2/> with innerHTML equal to "Not Registered Yet?', () =>
      expectInnerHTMLByTestId('loginPageInfoHeading', 'Not Registered Yet?'));

    it('Should render a <p/> with innerHTML equal to "Registering for your account is quick and easy.', () =>
      expectInnerHTMLByTestId('loginPageInfoContent', 'Registering for your account is quick and easy.'));

    it('Should render a <button/> with innerHTML equal to "CREATE ACCOUNT"', () =>
      expectInnerHTMLByTestId('createAccountButton', 'CREATE ACCOUNT'));
  });

  describe('navigation', () => {
    beforeEach(renderNavigationTestDOM);

    it('Should navigate to "/auth/signup" when the "CREATE ACCOUNT" button is clicked', () =>
      clickNavigateByTestId('createAccountButton', '/auth/signup'));
  });
});
