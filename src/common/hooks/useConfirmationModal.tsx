import { ConfirmationModal } from 'common/components';
import { FC, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export interface ConfirmationModalManager {
  /**
   * The wrapped/managed modal component that should be rendered.
   */
  Modal: FC;

  /**
   * Opens the modal.
   *
   * @param {string} message - Confirmation message to displayed in the modal.
   * @param {OnConfirmCallback} onConfirm - Function to call if a user clicks the confirm button.
   * @param {OnCancelCallback} onCancel - Function to call if a user clicks the cancel button.
   */
  openModal: (message: string, onConfirm: () => void, onCancel: () => void) => void;

  /**
   * Closes the modal.
   */
  closeModal: () => void;
}

export const useConfirmationModal = (): ConfirmationModalManager => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState(() => noop);
  const [cancelCallback, setCancelCallback] = useState(() => noop);

  const openModal = (message: string, onConfirm: () => void, onCancel: () => void = noop) => {
    setMessage(message);
    setConfirmCallback(() => onConfirm);
    setCancelCallback(() => onCancel);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const Modal: FC = () => (
    <ConfirmationModal show={show} message={message} onConfirm={confirmCallback} onCancel={cancelCallback} />
  );

  return {
    Modal,
    openModal,
    closeModal,
  };
};
