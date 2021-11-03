import { ErrorNotificationIcon, SuccessNotificationIcon } from 'common/components/Notification';
import { toast } from 'react-toastify';

export const showSuccessMessage = (message: string): void => {
  toast.success(message, {
    icon: SuccessNotificationIcon,
  });
};

export const showErrorMessage = (message: string): void => {
  toast.error(message, {
    icon: ErrorNotificationIcon,
  });
};
