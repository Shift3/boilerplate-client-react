import { render } from '@testing-library/react';
import { expectInDocByTestId, clickNavigateByTestId } from '../../../utils/test';
import { TopNav } from '..';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

describe('<topNav/>', () => {
  beforeEach(() => render(
    <Router>
      <TopNav/>
      <Switch>
        <Route exact path="/" component={() => <div />} />
        <Route exact path="/auth/login" component={() => <div/>} />
      </Switch>
    </Router>
  ));

  describe('rendering', () => {
    it ('Should render the <NavWrapper />', () => 
      expectInDocByTestId('navWrapper'));

    it ('should render the LOGIN/CREATE account button', () =>
      expectInDocByTestId('loginOrCreateAccountLink'));
  });
  describe('navigation', () => {
    it('Should navigate to /auth/login when the LOGIN/CREATE ACCOUNT button is clicked', () => {
      clickNavigateByTestId('loginOrCreateAccountLink', '/auth/login');
    });
  });
});