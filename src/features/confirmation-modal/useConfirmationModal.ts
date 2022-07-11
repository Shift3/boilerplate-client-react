import { useAppDispatch } from 'app/redux';
import { useCallback } from 'react';
import {
  ConfirmationModalCallback,
  confirmConfirmationModal,
  declineConfirmationModal,
  openConfirmationModal,
} from './slice';

export interface ConfirmationModalConfig {
  message: string;
  declineButtonLabel: string;
  confirmButtonLabel: string;
  onConfirm: ConfirmationModalCallback;
  onDecline: ConfirmationModalCallback;
}

export interface ConfirmationModalManager {
  openModal: (config?: Partial<ConfirmationModalConfig>) => void;
  confirmModal: () => void;
  declineModal: () => void;
}

export type useConfirmationModal = () => ConfirmationModalManager;

export const useConfirmationModal: useConfirmationModal = () => {
  const dispatch = useAppDispatch();

  const openModal = useCallback(
    (config: Partial<ConfirmationModalConfig> = {}) => {
      dispatch(openConfirmationModal(config));
    },
    [dispatch],
  );

  const confirmModal = useCallback(() => {
    dispatch(confirmConfirmationModal());
  }, [dispatch]);

  const declineModal = useCallback(() => {
    dispatch(declineConfirmationModal());
  }, [dispatch]);

  return {
    openModal,
    confirmModal,
    declineModal,
  };
};
