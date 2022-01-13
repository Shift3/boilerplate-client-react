import { useAppDispatch } from 'app/redux';
import { ConfirmationModalCallback, openConfirmationModal } from './slice';

export interface ConfirmationModalConfig {
    message?: string;
    cancelButtonLabel?: string;
    confirmButtonLabel?: string; 
    onConfirm?: ConfirmationModalCallback;
    onDecline?: ConfirmationModalCallback;
}

export interface ConfirmationModalManager {
  openModal: (config: ConfirmationModalConfig) => void;
  confirmModal: () => void;
  declineModal: () => void;
}

export type useConfirmationModal = () => ConfirmationModalManager;

export const useConfirmationModal: useConfirmationModal = () => {
    const dispatch = useAppDispatch();

    const openModal = (config: ConfirmationModalConfig) => {
        dispatch(openConfirmationModal(config));
    }

    const confirmModal = () => {
        //
    }

    const declineModal = () => {
        //
    }

    return {
        openModal,
        confirmModal,
        declineModal
    }
}