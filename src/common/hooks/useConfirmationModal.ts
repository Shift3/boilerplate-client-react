import { useState } from 'react';

export interface ConfirmationModalManager {
  show: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
}

export const useConfirmationModal = (): ConfirmationModalManager => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  return {
    show,
    openModal,
    closeModal,
  };
};
