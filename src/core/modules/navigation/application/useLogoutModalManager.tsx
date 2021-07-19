// React imports
import { useState } from 'react';

// App imports
import { useLogout } from 'core/modules/auth/application/useLogout';

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
  const { logoutUser } = useLogout();

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  const onCancel = () => closeModal();

  const onLogout = () => {
    logoutUser();
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
