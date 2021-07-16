// React imports
import { ReactPortal, useState } from 'react';
import ReactDOM from 'react-dom';

// App imports
import { useLogout } from 'core/modules/auth/application/useLogout';
import { LogoutModal } from '../presentation/logoutModal';

export interface ILogoutModalManager {
  /**
   * A portal that renders the LogoutModal as a child of a subtree outside the current DOM hierarchy.
   * The modal will be mounted to a root level div with an id of "logout-modal-root".
   */
  modalPortal: ReactPortal | null;

  /**
   * Opens the modal.
   */
  openModal: () => void;

  /**
   * Closes the modal.
   */
  closeModal: () => void;
}

export const useLogoutModal = (): ILogoutModalManager => {
  const [show, setShow] = useState(false);
  const { logoutUser } = useLogout();

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  const logout = () => {
    logoutUser();
    closeModal();
  };

  const portalRoot = document.getElementById('logout-modal-root');

  const modalPortal = portalRoot
    ? ReactDOM.createPortal(<LogoutModal show={show} onCancel={closeModal} onLogout={logout} />, portalRoot)
    : null;

  return {
    modalPortal,
    openModal,
    closeModal,
  };
};
