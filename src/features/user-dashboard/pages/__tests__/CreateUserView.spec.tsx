import { act, render, screen, waitFor, within } from '@testing-library/react';
import { createAppStore } from 'app/redux';
import { RoleFactory, UserFactory } from 'common/models/testing-factories';
import { AuthState } from 'features/auth/authSlice';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CreateUserView } from '../CreateUserView';
import theme from 'utils/styleValues';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { EnhancedStore } from '@reduxjs/toolkit';
import { flushPromises } from 'test/utils/flushPromises';
import { baseUrl, server } from 'test/server';
import { rest } from 'msw';
import { StatusCodes } from 'http-status-codes';
import * as notificationService from 'common/services/notification';

describe('CreateUserView', () => {
  describe('when user has Admin role', () => {
    const role = RoleFactory.build({ roleName: 'Admin' });
    const user = UserFactory.build({}, { associations: { role } });
    const auth: AuthState = { token: 'fake token', user };

    beforeEach(() => {
      render(
        <Router history={createMemoryHistory()}>
          <Provider store={createAppStore({ preloadedState: { auth } })}>
            <ThemeProvider theme={theme}>
              <CreateUserView />
            </ThemeProvider>
          </Provider>
        </Router>,
      );
    });

    it('should render a form', async () => {
      // According to MDN docs, the <form> element has an implicit ARIA role of "form" if it has a name attribute
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
      const form = await screen.findByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should render text input fields', async () => {
      const form = await screen.findByRole('form');

      expect(within(form).getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
      expect(within(form).getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
      expect(within(form).getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });

    it('should render Role select field with options', async () => {
      const form = await screen.findByRole('form');
      // According to MDN docs, the <select> element has an implicit ARIA role of "combobox"
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#technical_summary
      const select = within(form).getByRole('combobox', { name: /role/i });
      const options = within(select).getAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(options).not.toHaveLength(0);
    });

    it('should not render Super Administrator as an option in Role select field', async () => {
      const form = await screen.findByRole('form');
      const select = within(form).getByRole('combobox', { name: /role/i });
      const option = within(select).queryByRole('option', { name: /super administrator/i });

      expect(option).not.toBeInTheDocument();
    });

    it('should not render an Agency select field', async () => {
      const form = await screen.findByRole('form');
      const select = within(form).queryByRole('combobox', { name: /agency/i });

      expect(select).not.toBeInTheDocument();
    });
  });

  describe('when user has Super Administrator role', () => {
    const role = RoleFactory.build({ roleName: 'Super Administrator' });
    const user = UserFactory.build({}, { associations: { role } });
    const auth: AuthState = { token: 'fake token', user };

    beforeEach(() => {
      render(
        <Router history={createMemoryHistory()}>
          <Provider store={createAppStore({ preloadedState: { auth } })}>
            <ThemeProvider theme={theme}>
              <CreateUserView />
            </ThemeProvider>
          </Provider>
        </Router>,
      );
    });

    it('should render a form', async () => {
      const form = await screen.findByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should render text input fields', async () => {
      const form = await screen.findByRole('form');

      expect(within(form).getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
      expect(within(form).getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
      expect(within(form).getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });

    it('should render Role select field with options', async () => {
      const form = await screen.findByRole('form');
      const select = within(form).getByRole('combobox', { name: /role/i });
      const options = within(select).getAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(options).not.toHaveLength(0);
    });

    it('should render Super Administrator as an option in Role select field', async () => {
      const form = await screen.findByRole('form');
      const select = within(form).getByRole('combobox', { name: /role/i });
      const option = within(select).getByRole('option', { name: /super administrator/i });

      expect(option).toBeInTheDocument();
    });

    it('should render an Agency select field with options', async () => {
      const form = await screen.findByRole('form');
      const select = within(form).getByRole('combobox', { name: /agency/i });
      const options = within(select).getAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(options).not.toHaveLength(0);
    });
  });

  describe('when form is submitted', () => {
    const role = RoleFactory.build({ roleName: 'Admin' });
    const user = UserFactory.build({}, { associations: { role } });
    const auth: AuthState = { token: 'fake token', user };
    const newUser = UserFactory.build();
    let store: EnhancedStore;

    beforeEach(() => {
      store = createAppStore({ preloadedState: { auth } });

      render(
        <Router history={createMemoryHistory()}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CreateUserView />
            </ThemeProvider>
          </Provider>
        </Router>,
      );
    });

    it('should show a success notification if API request is successful', async () => {
      const spy = jest.spyOn(notificationService, 'showSuccessMessage');

      const form = await screen.findByRole('form');

      await act(async () => {
        userEvent.type(within(form).getByRole('textbox', { name: /first name/i }), newUser.firstName);
        userEvent.type(within(form).getByRole('textbox', { name: /last name/i }), newUser.lastName);
        userEvent.type(within(form).getByRole('textbox', { name: /email/i }), newUser.email);
        userEvent.selectOptions(within(form).getByRole('combobox', { name: /role/i }), newUser.role.roleName);
      });

      await act(async () => {
        userEvent.click(within(form).getByRole('button', { name: /submit/i }));
      });

      // We need to wait for API request to resolve.
      await waitFor(async () => flushPromises());

      expect(spy).toHaveBeenCalled();
    });

    it('should show an error notification if API request fails', async () => {
      const spy = jest.spyOn(notificationService, 'showErrorMessage');

      // Override mock server response to return an error response.
      server.use(
        rest.post(`${baseUrl}/users`, (req, res, ctx) => {
          return res(ctx.status(StatusCodes.BAD_REQUEST));
        }),
      );

      const form = await screen.findByRole('form');

      await act(async () => {
        userEvent.type(within(form).getByRole('textbox', { name: /first name/i }), newUser.firstName);
        userEvent.type(within(form).getByRole('textbox', { name: /last name/i }), newUser.lastName);
        userEvent.type(within(form).getByRole('textbox', { name: /email/i }), newUser.email);
        userEvent.selectOptions(within(form).getByRole('combobox', { name: /role/i }), newUser.role.roleName);
      });

      await act(async () => {
        userEvent.click(within(form).getByRole('button', { name: /submit/i }));
      });

      // We need to wait for API request to resolve.
      await waitFor(async () => flushPromises());

      expect(spy).toHaveBeenCalled();
    });
  });
});
