import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationModal } from './ConfirmationModal';
import { ConfirmationModalProps } from './types';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

describe('ConfirmationModal', () => {
  it('should not render if the "show" prop is false', () => {
    const props: ConfirmationModalProps = {
      show: false,
      message: '',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const modal = screen.queryByRole('dialog');

    expect(modal).toBeNull();
  });

  it('should render if the "show" prop is true', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const modal = screen.getByRole('dialog');

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

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const button = screen.getByText(props.cancelButtonLabel as string);

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

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const button = screen.getByText(props.confirmButtonLabel as string);

    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should call the "onCancel" function prop when the cancel button is clicked', () => {
    const props: ConfirmationModalProps = {
      show: true,
      message: '',
      cancelButtonLabel: 'Cancel',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
    };

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const cancelButton = screen.getByText(props.cancelButtonLabel as string);

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

    render(
      <ThemeProvider theme={AppTheme}>
        <ConfirmationModal {...props} />
      </ThemeProvider>,
    );

    const confirmButton = screen.getByText(props.confirmButtonLabel as string);

    userEvent.click(confirmButton);

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    expect(props.onCancel).not.toHaveBeenCalled();
  });
});
