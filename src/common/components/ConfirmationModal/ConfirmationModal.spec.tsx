import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationModal } from './ConfirmationModal';
import { ConfirmationModalProps } from './types';

describe('ConfirmationModal', () => {
  it('should not render if the "show" prop is false', () => {
    const props: ConfirmationModalProps = {
      show: false,
      message: '',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { queryByRole } = render(<ConfirmationModal {...props} />);

    const modal = queryByRole('dialog');

    expect(modal).toBeNull();
  });

  it('should render if the "show" prop is true', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { getByRole } = render(<ConfirmationModal {...props} />);

    const modal = getByRole('dialog');

    expect(modal).toBeTruthy();
  });

  it('should have a button with "cancelButtonLabel" prop as its text', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      cancelButtonLabel: 'Cancel',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { getByText } = render(<ConfirmationModal {...props} />);

    const button = getByText(props.cancelButtonLabel as string);

    expect(button.getAttribute('type')).toBe('button');
  });

  it('should have a button with "confirmButtonLabel" prop as its text', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      confirmButtonLabel: 'Confirm',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { getByText } = render(<ConfirmationModal {...props} />);

    const button = getByText(props.confirmButtonLabel as string);

    expect(button.getAttribute('type')).toBe('button');
  });

  it('should call the "onCancel" function prop when the cancel button is clicked', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      cancelButtonLabel: 'Cancel',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { getByText } = render(<ConfirmationModal {...props} />);

    const cancelButton = getByText(props.cancelButtonLabel as string);

    userEvent.click(cancelButton);

    expect(props.onCancel).toHaveBeenCalledTimes(1);
    expect(props.onConfirm).not.toHaveBeenCalled();
  });

  it('should call the "onConfirm" function prop when the confirm button is clicked', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      confirmButtonLabel: 'Confirm',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    const { getByText } = render(<ConfirmationModal {...props} />);

    const confirmButton = getByText(props.confirmButtonLabel as string);

    userEvent.click(confirmButton);

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    expect(props.onCancel).not.toHaveBeenCalled();
  });
});
