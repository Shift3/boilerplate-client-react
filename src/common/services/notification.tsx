import { toast } from 'react-toastify';

export const showSuccessMessage = (message: string, id?: string): void => {
  toast.success(message, {
    toastId: id ?? message,
  });
};

export const showErrorMessage = (message: string, id?: string): void => {
  toast.error(message, {
    toastId: id ?? message,
  });
};

export const showEndlessErrorMessage = (message: string): void => {
  toast.error(message, {
    autoClose: false
  });
};

export const showEndlessInfoMessage = (message: string): void => {
  toast.info(message, {
    autoClose: false
  });
};
