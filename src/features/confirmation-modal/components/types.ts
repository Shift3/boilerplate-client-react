export type ConfirmationModalProps = {
  show: boolean;
  message: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  onCancel: VoidFunction;
  onConfirm: VoidFunction;
  loading?: boolean;
};
