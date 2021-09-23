import { useLogoutMutation } from 'features/auth/authApi';
import { useState } from 'react';

export interface ILogoutModalManager {
  /**
   * Whether the modal should be shown or hidden.
   */
  show: boolean;

  /**
   * Opens the modal.
   */
  openModal: () => void;

  /**
   * Closes the modal.
   */
  closeModal: () => void;

  /**
   * Function to be called when the modal's cancel button is clicked.
   */
  onCancel: () => void;

  /**
   * Function to be called when the modal's logout button is clicked.
   */
  onLogout: () => void;
}

export const useLogoutModalManager = (): ILogoutModalManager => {
  const [show, setShow] = useState(false);
  const [logout] = useLogoutMutation();

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  const onCancel = () => closeModal();

  const onLogout = () => {
    logout();
    closeModal();
  };

  return {
    show,
    openModal,
    closeModal,
    onCancel,
    onLogout,
  };
};
