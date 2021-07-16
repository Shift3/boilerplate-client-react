// React imports
import { ReactElement, useState } from 'react';

// App imports
import { useLogout } from 'core/modules/auth/application/useLogout';
import { LogoutModal } from '../presentation/logoutModal';

export interface ILogoutModalManager {
  /**
   * The LogoutModal to be rendered. The modal is implemented using a react-bootstrap Modal which uses a React Portals
   * under the hood. As a result, the modal will mounted as a child of a subtree outside the DOM hierarchy where.
   */
  modal: ReactElement;

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

  const modal = <LogoutModal show={show} onCancel={closeModal} onLogout={logout} />;

  return {
    modal,
    openModal,
    closeModal,
  };
};
