import { toast, ToastContainer, Zoom } from 'react-toastify';
import styled from 'styled-components';

export const NotificationContainer = styled(ToastContainer).attrs({
  autoClose: 10000,
  closeButton: false,
  closeOnClick: true,
  hideProgressBar: true,
  newestOnTop: true,
  position: toast.POSITION.TOP_CENTER,
  role: 'alert',
  theme: 'colored',
  transition: Zoom,
})`
  position: fixed;
  top: 0;
  padding: 0;

  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: #51a351;
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    background-color: #bd362f;
  }
`;
