import { render, screen } from '@testing-library/react';
import { createAppStore } from 'app/redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConfirmationModal } from '../ConfirmationModal';
import light from 'themes/light';

describe('ConfirmationModal', () => {
  it('should render without errors', () => {
    const store = createAppStore();

    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should initially be closed', () => {
    const store = createAppStore();

    render(
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeNull();
  });

  it('should be open when "show" is set to true', () => {
    const store = createAppStore({
      preloadedState: {
        confirmationModal: {
          show: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeNull();
  });

  it('should not disable confirmation button when "loading" is set to false', () => {
    const confirmButtonLabel = 'Confirm Button';

    const store = createAppStore({
      preloadedState: {
        confirmationModal: {
          show: true,
          loading: false,
          confirmButtonLabel,
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );

    const button = screen.getByText(confirmButtonLabel);
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('shoud disable confirmation button when "loading" is set to true', () => {
    const confirmButtonLabel = 'Confirm Button';

    const store = createAppStore({
      preloadedState: {
        confirmationModal: {
          show: true,
          loading: true,
          confirmButtonLabel,
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );

    const button = screen.getByText(confirmButtonLabel);
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });
});
