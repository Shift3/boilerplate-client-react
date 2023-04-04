import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, ReactElement, useState } from 'react';
import { Button, Modal, ModalProps } from 'react-bootstrap';
import { LoadingButton } from './LoadingButton';

interface SimpleConfirmModalProps extends ModalProps {
  body?: ReactElement;
  show: boolean;
  title: string;
  confirmIcon?: IconProp;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export const SimpleConfirmModal: FC<SimpleConfirmModalProps> = ({
  body,
  title,
  show,
  onCancel,
  onConfirm,
  confirmIcon,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onCancel} centered {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='link' onClick={onCancel}>
          {cancelLabel}
        </Button>
        <LoadingButton className='action-shadow' loading={loading} variant={confirmVariant} onClick={() => confirm()}>
          {confirmIcon ? <FontAwesomeIcon icon={confirmIcon} /> : null} {confirmLabel}
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  );
};
