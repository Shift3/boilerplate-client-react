import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { ConfirmationModal } from 'features/confirmation-modal';
import { Provider } from 'react-redux';
import { store } from 'app/redux';

describe('ConfirmationModal', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={AppTheme}>
          <ConfirmationModal />
        </ThemeProvider>
      </Provider>,
    );
  });

  it('should render', () => {
    const modal = screen.queryByRole('dialog');

    expect(modal).toBeNull();
  });
});

//   it('should have a button with "cancelButtonLabel" prop as its text', () => {
//     const props: ConfirmationModalProps = {
//       show: true,
//       message: '',
//       cancelButtonLabel: 'Cancel',
//       onCancel: jest.fn(),
//       onConfirm: jest.fn(),
//     };

//     const button = screen.getByText(props.cancelButtonLabel as string);

//     expect(button.getAttribute('type')).toBe('button');
//   });

//   it('should have a button with "confirmButtonLabel" prop as its text', () => {
//     const props: ConfirmationModalProps = {
//       show: true,
//       message: '',
//       confirmButtonLabel: 'Confirm',
//       onCancel: jest.fn(),
//       onConfirm: jest.fn(),
//     };

//     const button = screen.getByText(props.confirmButtonLabel as string);

//     expect(button.getAttribute('type')).toBe('button');
//   });

//   it('should call the "onCancel" function prop when the cancel button is clicked', () => {
//     const props: ConfirmationModalProps = {
//       show: true,
//       message: '',
//       cancelButtonLabel: 'Cancel',
//       onCancel: jest.fn(),
//       onConfirm: jest.fn(),
//     };

//     render(
//       <ThemeProvider theme={AppTheme}>
//         <ConfirmationModal {...props} />
//       </ThemeProvider>,
//     );

//     const cancelButton = screen.getByText(props.cancelButtonLabel as string);

//     userEvent.click(cancelButton);

//     expect(props.onCancel).toHaveBeenCalledTimes(1);
//     expect(props.onConfirm).not.toHaveBeenCalled();
//   });

//   it('should call the "onConfirm" function prop when the confirm button is clicked', () => {
//     const props: ConfirmationModalProps = {
//       show: true,
//       message: '',
//       confirmButtonLabel: 'Confirm',
//       onCancel: jest.fn(),
//       onConfirm: jest.fn(),
//     };

//     const confirmButton = screen.getByText(props.confirmButtonLabel as string);

//     userEvent.click(confirmButton);

//     expect(props.onConfirm).toHaveBeenCalledTimes(1);
//     expect(props.onCancel).not.toHaveBeenCalled();
//   });
// });
