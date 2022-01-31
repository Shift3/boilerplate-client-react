import { FC } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { ConfirmationModalProps } from './types';
import styled from 'styled-components';
import { CancelButton } from 'common/styles/button';
import { LoadingButton } from 'common/components/LoadingButton';
import { useAppSelector } from 'app/redux';
import { selectConfirmationModalState } from '../slice';
import { useConfirmationModal } from '../hooks';

// Based on the styled-components docs at https://styled-components.com/docs/api#caveat-with-function-components,
// in order for typechecking to work correctly with styled components that extend a function components, we need
// to define the component and it's type first as done here.
const BootstrapModal: FC<ModalProps> = ({ children, ...rest }) => <Modal {...rest}>{children}</Modal>;

export const StyledModal = styled(BootstrapModal)`
  & .modal-header {
    border: none;
  }

  & .modal-content {
    padding: 50px;
    background-color: ${props => props.theme.modals.confirmation.contentBackgroundColor};
    border-color: ${props => props.theme.modals.confirmation.contentBorderColor};
  }

  & .modal-title {
    color: ${props => props.theme.modals.confirmation.titleTextColor};
  }

  & .modal-body {
    padding: 10px 0;
    color: ${props => props.theme.modals.confirmation.bodyTextColor};
  }

  & .modal-footer {
    margin-top: 50px;
    padding: 0;
    border: none;
    justify-content: center;
  }

  button:first-of-type {
    margin-right: 10px;
  }
`;

export const ConfirmationModal: FC = () => {
  const { show, loading, message, cancelButtonLabel, confirmButtonLabel } =
    useAppSelector(selectConfirmationModalState);

  const { closeModal } = useConfirmationModal();

  // const handleCancel = () => {};

  // const handleConfirm = () => {};

  const onConfirm = () => {
    //
  };

  return (
    <StyledModal show={show} onHide={closeModal}>
      <Modal.Title>{message}</Modal.Title>
      <Modal.Body>Do you want to continue?</Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={closeModal}>{cancelButtonLabel}</CancelButton>
        <LoadingButton loading={loading} onClick={onConfirm}>
          {confirmButtonLabel}
        </LoadingButton>
      </Modal.Footer>
    </StyledModal>
  );
};
