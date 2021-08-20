import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import { StyledCancelButton, StyledConfirmButton, StyledModal } from './styled';

type ConfirmationModalProps = {
  show: boolean;
  message: string;
  confirmButtonLabel: string;
  onCancel: VoidFunction;
  onConfirm: VoidFunction;
};

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  message,
  confirmButtonLabel,
  onCancel,
  onConfirm,
}) => {
  return (
    <StyledModal show={show} onHide={onCancel}>
      <Modal.Title>{message}</Modal.Title>
      <Modal.Body>Do you want to continue?</Modal.Body>
      <Modal.Footer>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledConfirmButton onClick={onConfirm}>{confirmButtonLabel}</StyledConfirmButton>
      </Modal.Footer>
    </StyledModal>
  );
};
