import { toast } from 'react-toastify';

export const showSuccessMessage = (message: string): void => {
  toast.success(message, {
    toastId: message,
  });
};

export const showErrorMessage = (message: string): void => {
  toast.error(message, {
    toastId: message,
  });
};

export const showInfoMessage = (message: string): void => {
  toast.info(message, {
    toastId: message,
  });
};
