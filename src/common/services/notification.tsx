import { toast } from 'react-toastify';

export const showSuccessMessage = (message: string): void => {
  toast.success(message, {
    toastId: message,
  });
};

export const showEndlessSuccessMessage = (message: string): void => {
  toast.success(message, {
    toastId: message,
    autoClose: false,
  });
};

export const showErrorMessage = (message: string): void => {
  toast.error(message, {
    toastId: message,
  });
};

export const showEndlessErrorMessage = (message: string): void => {
  toast.error(message, {
    toastId: message,
    autoClose: false,
  });
};
