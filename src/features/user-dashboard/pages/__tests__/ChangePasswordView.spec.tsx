import { act, render, screen, waitFor, within } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { ChangePasswordPage } from '../ChangePasswordView';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { Provider } from 'react-redux';
import { createAppStore, RootState } from 'app/redux';
import { UserFactory } from 'common/models/testing-factories';
import { AuthState } from 'features/auth/authSlice';
import { EnhancedStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { baseUrl, server } from 'test/server';
import { rest } from 'msw';
import { ErrorResponse, Session } from 'common/models';
import * as notificationService from 'common/services/notification';
import { flushPromises } from 'test/utils/flushPromises';
import { FormData } from 'features/user-dashboard/components/ChangePasswordForm';
import { StatusCodes } from 'http-status-codes';

describe('ChangePasswordPage', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router history={createMemoryHistory()}>
            <Provider store={createAppStore()}>
              <ThemeProvider theme={AppTheme}>
                <ChangePasswordPage />
              </ThemeProvider>
            </Provider>
          </Router>,
        );
      });
    });

    it('should render change password form', async () => {
      const form = await screen.findByRole('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('when form is submitted', () => {
    const testAuth: AuthState = {
      user: UserFactory.build(),
      token: 'faketoken',
    };
    const testFormData: FormData = {
      oldPassword: 'OldPassword1$',
      newPassword: 'NewPassword1$',
      confirmPassword: 'NewPassword1$',
    };
    let store: EnhancedStore;
    let history: MemoryHistory;

    beforeEach(async () => {
      store = createAppStore({ preloadedState: { auth: testAuth } });
      history = createMemoryHistory();

      await act(async () => {
        render(
          <Router history={history}>
            <Provider store={store}>
              <ThemeProvider theme={AppTheme}>
                <ChangePasswordPage />
              </ThemeProvider>
            </Provider>
          </Router>,
        );
      });
    });

    describe('success', () => {
      const jwtToken = 'newfaketoken';

      beforeEach(async () => {
        // Mock the API response
        server.use(
          rest.put(`${baseUrl}/users/change-password/:id`, (req, res, ctx) => {
            const newSession: Session = { jwtToken, user: testAuth.user! };
            return res(ctx.json(newSession));
          }),
        );

        // Submit the form
        const form = await screen.findByRole('form');

        await act(async () => {
          userEvent.type(within(form).getByLabelText(/current password/i), testFormData.oldPassword);
          userEvent.type(within(form).getByLabelText(/new password/i), testFormData.newPassword);
          userEvent.type(within(form).getByLabelText(/confirm password/i), testFormData.confirmPassword);
        });

        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: /submit/i }));
        });
      });

      it('should show a success notification if API request is successful', async () => {
        const spy = jest.spyOn(notificationService, 'showSuccessMessage');

        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        expect(spy).toHaveBeenCalled();
      });

      it('should update auth session token to new jwt token returned from API', async () => {
        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        const { auth } = store.getState() as RootState;

        expect(auth.token).toBe(jwtToken);
      });

      it('should navigate user to agent list view', async () => {
        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        expect(history.location.pathname).toBe('/agents');
      });
    });

    describe('failure', () => {
      beforeEach(async () => {
        // Mock the API response
        server.use(
          rest.put(`${baseUrl}/users/change-password/:id`, (req, res, ctx) => {
            const errorResponse: ErrorResponse = {
              error: 'error',
              message: 'bad request',
              statusCode: StatusCodes.BAD_REQUEST,
            };
            return res(ctx.status(StatusCodes.BAD_REQUEST), ctx.json(errorResponse));
          }),
        );

        // Submit the form
        const form = await screen.findByRole('form');

        await act(async () => {
          userEvent.type(within(form).getByLabelText(/current password/i), testFormData.oldPassword);
          userEvent.type(within(form).getByLabelText(/new password/i), testFormData.newPassword);
          userEvent.type(within(form).getByLabelText(/confirm password/i), testFormData.confirmPassword);
        });

        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: /submit/i }));
        });
      });

      it('should show an error notification if API request is fails', async () => {
        const spy = jest.spyOn(notificationService, 'showErrorMessage');

        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        expect(spy).toHaveBeenCalled();
      });

      it('should not update auth session token', async () => {
        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        const { auth } = store.getState() as RootState;

        expect(auth.token).toBe(testAuth.token);
      });

      it('should navigate user to agent list view', async () => {
        // Wait for promise from API response to resolve.
        await waitFor(async () => flushPromises());

        expect(history.location.pathname).toBe('/agents');
      });
    });
  });
});
