import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import { StyledCancelButton, StyledConfirmButton, StyledModal } from './styled';
import { ConfirmationModalProps } from './types';

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  message,
  cancelButtonLabel = 'CANCEL',
  confirmButtonLabel = 'CONFIRM',
  onCancel,
  onConfirm,
}) => (
  <StyledModal show={show} onHide={onCancel}>
    <Modal.Title>{message}</Modal.Title>
    <Modal.Body>Do you want to continue?</Modal.Body>
    <Modal.Footer>
      <StyledCancelButton onClick={onCancel}>{cancelButtonLabel}</StyledCancelButton>
      <StyledConfirmButton onClick={onConfirm}>{confirmButtonLabel}</StyledConfirmButton>
    </Modal.Footer>
  </StyledModal>
);
