import { Store } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createAppStore } from 'app/redux';
import { RoleType } from 'common/models';
import { RoleFactory, UserFactory } from 'common/models/testing-factories';
import { createMemoryHistory, MemoryHistory } from 'history';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PrivateRoute } from './index';

describe('PrivateRoute', () => {
  const loginPath = '/auth/login';
  const agentListViewPath = '/agents';
  const testPath = '/test/path';

  const editorRole = RoleFactory.build({ roleName: 'Editor' });
  const adminRole = RoleFactory.build({ roleName: 'Admin' });

  const basicUser = UserFactory.build();
  const editorUser = UserFactory.build({}, { associations: { role: editorRole } });
  const adminUser = UserFactory.build({}, { associations: { role: adminRole } });

  const TestComponent: FC = () => <div data-testid='test-component'></div>;

  describe('when a user is not authenticated', () => {
    let history: MemoryHistory;
    let store: Store;

    beforeEach(() => {
      store = createAppStore();
      history = createMemoryHistory();
      history.push(testPath);

      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path={testPath} component={TestComponent} />
          </Provider>
        </Router>,
      );
    });

    it('should redirect user to the login path', () => {
      expect(history.location.pathname).toBe(loginPath);
    });

    it('should not render the specified component', () => {
      expect(screen.queryByTestId('test-component')).toBeNull();
    });
  });

  describe('when a user is authenticated', () => {
    let history: MemoryHistory;
    let store: Store;
    const auth = { token: 'faketoken', user: basicUser };

    beforeEach(() => {
      store = createAppStore({ preloadedState: { auth } });
      history = createMemoryHistory();
      history.push(testPath);

      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path={testPath} component={TestComponent} />
          </Provider>
        </Router>,
      );
    });

    it('should not redirect user', () => {
      expect(history.location.pathname).toBe(testPath);
    });

    it('should render the specified component', () => {
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('when user does not have required role', () => {
    let history: MemoryHistory;
    let store: Store;
    const auth = { token: 'faketoken', user: editorUser };
    const requiredRoles: RoleType[] = ['Super Administrator', 'Admin'];

    beforeEach(() => {
      store = createAppStore({ preloadedState: { auth } });
      history = createMemoryHistory();
      history.push(testPath);

      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path={testPath} requiredRoles={requiredRoles} component={TestComponent} />
          </Provider>
        </Router>,
      );
    });

    it('should redirect user to the agent list view path', () => {
      expect(history.location.pathname).toBe(agentListViewPath);
    });

    it('should not render the specified component', () => {
      expect(screen.queryByTestId('test-component')).toBeNull();
    });
  });

  describe('when user has required role', () => {
    let history: MemoryHistory;
    let store: Store;
    const auth = { token: 'faketoken', user: adminUser };
    const requiredRoles: RoleType[] = ['Super Administrator', 'Admin'];

    beforeEach(() => {
      store = createAppStore({ preloadedState: { auth } });
      history = createMemoryHistory();
      history.push(testPath);

      render(
        <Router history={history}>
          <Provider store={store}>
            <PrivateRoute path={testPath} requiredRoles={requiredRoles} component={TestComponent} />
          </Provider>
        </Router>,
      );
    });

    it('should not redirect user to login path', () => {
      expect(history.location.pathname).toBe(testPath);
    });

    it('should render the specified component', () => {
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });
});
