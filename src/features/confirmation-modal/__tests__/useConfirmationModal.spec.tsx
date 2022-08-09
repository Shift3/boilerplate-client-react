import { act, render, screen, waitFor, within } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { createAppStore } from 'app/redux';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { flushPromises } from 'test/utils/flushPromises';
import light from 'themes/light';
import { ConfirmationModal } from '../ConfirmationModal';
import { useConfirmationModal } from '../useConfirmationModal';

describe('useConfirmationModal()', () => {
  describe('openModal()', () => {
    let store: ReturnType<typeof createAppStore>;
    const wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

    beforeEach(() => {
      store = createAppStore();

      render(
        <Provider store={store}>
          <ThemeProvider theme={light}>
            <ConfirmationModal />
          </ThemeProvider>
        </Provider>,
      );
    });

    it('should open the modal', () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { openModal } = result.current;

      act(() => {
        openModal();
      });

      const modal = screen.getByRole('dialog');
      expect(modal).not.toBeNull();
    });

    it('should configure the modal with the provided config options', () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { openModal } = result.current;
      const message = 'Test confirmation message';
      const confirmButtonLabel = 'TEST CONFIRM';
      const declineButtonLabel = 'TEST DECLINE';

      act(() => {
        openModal({ message, confirmButtonLabel, declineButtonLabel });
      });

      const modal = screen.getByRole('dialog');

      // Check that the message is in the modal
      expect(within(modal).getByText(message));

      // Check that the confirm and decline buttons have the correct labels.
      const buttons = within(modal).getAllByRole('button');
      const confirmButton = buttons.find(btn => !!within(btn).queryByText(confirmButtonLabel));
      const declineButton = buttons.find(btn => !!within(btn).queryByText(declineButtonLabel));
      expect(confirmButton).toBeDefined();
      expect(declineButton).toBeDefined();
    });
  });

  describe('confirmModal()', () => {
    let store: ReturnType<typeof createAppStore>;
    const wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
    const onConfirm = jest.fn();

    beforeEach(async () => {
      store = createAppStore();
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { openModal } = result.current;

      render(
        <Provider store={store}>
          <ThemeProvider theme={light}>
            <ConfirmationModal />
          </ThemeProvider>
        </Provider>,
      );

      onConfirm.mockClear();
      act(() => openModal({ onConfirm }));
      await waitFor(async () => flushPromises());
    });

    xit('should close the modal', async () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { confirmModal } = result.current;

      act(() => confirmModal());
      await waitFor(async () => flushPromises());

      const modal = screen.queryByRole('dialog');
      expect(modal).toBeNull();
    });

    it('should call the onConfirm callback', async () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { confirmModal } = result.current;

      act(() => confirmModal());
      await waitFor(async () => flushPromises());

      expect(onConfirm).toHaveBeenCalled();
    });
  });

  describe('declineModal()', () => {
    let store: ReturnType<typeof createAppStore>;
    const wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
    const onDecline = jest.fn();

    beforeEach(async () => {
      store = createAppStore();
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { openModal } = result.current;

      render(
        <Provider store={store}>
          <ThemeProvider theme={light}>
            <ConfirmationModal />
          </ThemeProvider>
        </Provider>,
      );

      onDecline.mockClear();
      act(() => openModal({ onDecline }));
      await waitFor(async () => flushPromises());
    });

    xit('should close the modal', async () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { declineModal } = result.current;

      act(() => declineModal());
      await waitFor(() => flushPromises());

      const modal = screen.queryByRole('dialog');
      expect(modal).toBeNull();
    });

    it('should call the onClose callback', async () => {
      const { result } = renderHook(() => useConfirmationModal(), { wrapper });
      const { declineModal } = result.current;

      act(() => declineModal());
      await waitFor(() => flushPromises());

      expect(onDecline).toHaveBeenCalled();
    });
  });
});
