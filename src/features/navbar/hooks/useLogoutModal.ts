import { useLogout } from 'features/auth/hooks';
import { useConfirmationModal } from 'features/confirmation-modal';

export type LogoutModalManager = {
  openLogoutModal: () => void;
};

export type UseLogoutModal = () => LogoutModalManager;

export const useLogoutModal: UseLogoutModal = () => {
  const { logout } = useLogout();
  const { openModal } = useConfirmationModal();

  const openLogoutModal = () => {
    openModal({
      message: 'This will end your login session.',
      confirmButtonLabel: 'Logout',
      declineButtonLabel: 'Cancel',
      onConfirm: logout,
    });
  };

  return {
    openLogoutModal,
  };
};
