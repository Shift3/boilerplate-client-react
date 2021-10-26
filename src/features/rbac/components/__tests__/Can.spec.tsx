import { render, screen } from '@testing-library/react';
import { createAppStore } from 'app/redux';
import { RoleFactory, UserFactory } from 'common/models/testing-factories';
import { Provider } from 'react-redux';
import { Can } from '../Can';
import * as rules from '../../rules';
import { Permission } from '../../rules';

describe('AllowedTo', () => {
  describe('user not authenticated', () => {
    const store = createAppStore({ preloadedState: { auth: { token: null, user: null } } });

    it('should not render children', () => {
      render(
        <Provider store={store}>
          <Can perform='user:create'>
            <div>Children</div>
          </Can>
        </Provider>,
      );

      expect(screen.queryByText('Children')).toBeNull();
    });

    it('should not render the yes prop', () => {
      render(
        <Provider store={store}>
          <Can perform='user:create' yes={() => <div>Yes</div>} no={() => <div>No</div>} />
        </Provider>,
      );

      expect(screen.queryByText('Yes')).toBeNull();
    });

    it('should render the no prop', () => {
      render(
        <Provider store={store}>
          <Can perform='user:create' yes={() => <div>Yes</div>} no={() => <div>No</div>} />
        </Provider>,
      );

      expect(screen.getByText('No')).toBeInTheDocument();
    });
  });

  describe('user authenticated', () => {
    const role = RoleFactory.build({ roleName: 'Admin' });
    const user = UserFactory.build({}, { associations: { role } });
    const store = createAppStore({ preloadedState: { auth: { token: '', user } } });

    describe('no permissions required', () => {
      it('should render children', () => {
        render(
          <Provider store={store}>
            <Can>
              <div>Children</div>
            </Can>
          </Provider>,
        );

        expect(screen.getByText('Children')).toBeInTheDocument();
      });

      it('should render the yes prop', () => {
        render(
          <Provider store={store}>
            <Can yes={() => <div>Yes</div>} no={() => <div>No</div>} />
          </Provider>,
        );

        expect(screen.getByText('Yes')).toBeInTheDocument();
      });

      it('should not render the no prop', () => {
        render(
          <Provider store={store}>
            <Can yes={() => <div>Yes</div>} no={() => <div>No</div>} />
          </Provider>,
        );

        expect(screen.queryByText('No')).toBeNull();
      });
    });

    describe('one permission required', () => {
      const action = 'user:create';

      describe('required rbac permission met', () => {
        beforeEach(() => {
          jest.spyOn(rules, 'getRbacRules').mockReturnValueOnce({
            [user.role.roleName]: {
              [action]: true,
            },
          });
        });

        it('should render children', () => {
          render(
            <Provider store={store}>
              <Can perform={action}>
                <div>Children</div>
              </Can>
            </Provider>,
          );

          expect(screen.getByText('Children')).toBeInTheDocument();
        });

        it('should render the yes prop', () => {
          render(
            <Provider store={store}>
              <Can perform={action} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.getByText('Yes')).toBeInTheDocument();
        });

        it('should not render the no prop', () => {
          render(
            <Provider store={store}>
              <Can perform={action} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.queryByText('No')).toBeNull();
        });
      });

      describe('required rbac permission not met', () => {
        beforeEach(() => {
          jest.spyOn(rules, 'getRbacRules').mockReturnValueOnce({
            [user.role.roleName]: {
              [action]: false,
            },
          });
        });

        it('should not render children', () => {
          render(
            <Provider store={store}>
              <Can perform={action}>
                <div>Children</div>
              </Can>
            </Provider>,
          );

          expect(screen.queryByText('Children')).toBeNull();
        });

        it('should render the no prop', () => {
          render(
            <Provider store={store}>
              <Can perform={action} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.getByText('No')).toBeInTheDocument();
        });

        it('should not render the yes prop', () => {
          render(
            <Provider store={store}>
              <Can perform={action} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.queryByText('Yes')).toBeNull();
        });
      });
    });

    describe('multiple permissions required', () => {
      const actions: Permission[] = ['user:create', 'user:read', 'user:update', 'user:delete'];

      describe('required rbac permissions met', () => {
        beforeEach(() => {
          jest.spyOn(rules, 'getRbacRules').mockReturnValueOnce({
            [user.role.roleName]: actions.reduce((permissionMap, action) => ({ ...permissionMap, [action]: true }), {}),
          });
        });

        it('should render children', () => {
          render(
            <Provider store={store}>
              <Can perform={actions}>
                <div>Children</div>
              </Can>
            </Provider>,
          );

          expect(screen.getByText('Children')).toBeInTheDocument();
        });

        it('should render the yes prop', () => {
          render(
            <Provider store={store}>
              <Can perform={actions} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.getByText('Yes')).toBeInTheDocument();
        });

        it('should not render the no prop', () => {
          render(
            <Provider store={store}>
              <Can perform={actions} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.queryByText('No')).toBeNull();
        });
      });

      describe('required rbac permissions not met', () => {
        beforeEach(() => {
          jest.spyOn(rules, 'getRbacRules').mockReturnValueOnce({
            [user.role.roleName]: actions.reduce(
              (permissionMap, action, index) => ({ ...permissionMap, [action]: index < actions.length - 1 }),
              {},
            ),
          });
        });

        it('should not render children if at least rbac permission is not met', () => {
          render(
            <Provider store={store}>
              <Can perform={actions}>
                <div>Children</div>
              </Can>
            </Provider>,
          );

          expect(screen.queryByText('Children')).toBeNull();
        });

        it('should render the no prop', () => {
          render(
            <Provider store={store}>
              <Can perform={actions} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.getByText('No')).toBeInTheDocument();
        });

        it('should not render the yes prop', () => {
          render(
            <Provider store={store}>
              <Can perform={actions} yes={() => <div>Yes</div>} no={() => <div>No</div>} />
            </Provider>,
          );

          expect(screen.queryByText('Yes')).toBeNull();
        });
      });
    });
  });
});
