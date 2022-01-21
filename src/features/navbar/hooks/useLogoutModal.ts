import { useLogout } from 'features/auth/hooks';
import { useConfirmationModal } from 'features/confirmation-modal';
import { FC } from 'react';

export type LogoutModalManager = {
  /**
   * The managed modal component.
   */
  LogoutModal: FC;

  /**
   * Opens the modal.
   */
  openLogoutModal: () => void;
};

export const useLogoutModal = (): LogoutModalManager => {
  const { logout } = useLogout();
  const { Modal, openModal, closeModal } = useConfirmationModal();

  const handleLogout = () => {
    logout();
    closeModal();
  };

  return {
    LogoutModal: Modal,
    openLogoutModal: () => openModal('This will end your login session.', handleLogout, closeModal),
  };
};
