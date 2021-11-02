import { render, screen, within } from '@testing-library/react';
import { createAppStore } from 'app/redux';
import { RoleFactory, UserFactory } from 'common/models/testing-factories';
import { AuthState } from 'features/auth/authSlice';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CreateUserView } from '../CreateUserView';
import theme from 'utils/styleValues';

describe('CreateUserView', () => {
  describe('when user has Admin role', () => {
    const role = RoleFactory.build({ roleName: 'Admin' });
    const user = UserFactory.build({}, { associations: { role } });
    const auth: AuthState = { token: 'fake token', user };

    beforeEach(() => {
      render(
        <Provider store={createAppStore({ preloadedState: { auth } })}>
          <ThemeProvider theme={theme}>
            <CreateUserView />
          </ThemeProvider>
        </Provider>,
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
        <Provider store={createAppStore({ preloadedState: { auth } })}>
          <ThemeProvider theme={theme}>
            <CreateUserView />
          </ThemeProvider>
        </Provider>,
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
});
