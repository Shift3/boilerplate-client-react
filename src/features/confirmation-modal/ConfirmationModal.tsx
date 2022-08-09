import { FC } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { LoadingButton } from 'common/components/LoadingButton';
import { useAppSelector } from 'app/redux';
import { selectConfirmationModalState } from './slice';
import { useConfirmationModal } from './useConfirmationModal';
import { Button } from 'react-bootstrap';

// Based on the styled-components docs at https://styled-components.com/docs/api#caveat-with-function-components,
// in order for typechecking to work correctly with styled components that extend a function components, we need
// to define the component and it's type first as done here.
const BootstrapModal: FC<ModalProps> = ({ children, ...rest }) => <Modal {...rest}>{children}</Modal>;

export const StyledModal = styled(BootstrapModal)`
  display: flex !important;
  justify-content: center;
  align-items: center;

  .modal-dialog {
    border-radius: 24px;
    border: none;

    @media screen and (min-width: 576px) {
      min-width: 500px;
    }
  }

  & .modal-header {
    border: none;
  }

  & .modal-content {
    background: ${props => props.theme.modals.confirmation.contentBackgroundColor};
    border-radius: 24px;
    border: none;
  }

  & .modal-title {
    padding: 50px 50px 0 50px;
  }

  & .modal-body {
    margin-top: 0.25rem;
    padding: 0 50px;
    color: ${props => props.theme.modals.confirmation.bodyTextColor};
  }

  & .modal-footer {
    margin-top: 50px;
    padding: 0;
    border: none;
    justify-content: center;
    display: flex;
    flex-direction: row;

    button {
      display: block;
      height: 50px;
      margin: 0;
      width: 50%;

      &:first-of-type {
        border-radius: 0 0 0 24px;
      }

      &:last-of-type {
        border-radius: 0 0 24px 0;
      }
    }
  }
`;

export const ConfirmationModal: FC = () => {
  const { show, loading, message, confirmButtonLabel, declineButtonLabel } =
    useAppSelector(selectConfirmationModalState);

  const { declineModal, confirmModal } = useConfirmationModal();

  return (
    <StyledModal show={show} onHide={declineModal}>
      <Modal.Title>{message}</Modal.Title>
      <Modal.Body>Do you want to continue?</Modal.Body>
      <Modal.Footer>
        <Button variant='default' onClick={declineModal}>
          {declineButtonLabel}
        </Button>
        <LoadingButton as={Button} loading={loading} onClick={confirmModal}>
          {confirmButtonLabel}
        </LoadingButton>
      </Modal.Footer>
    </StyledModal>
  );
};
