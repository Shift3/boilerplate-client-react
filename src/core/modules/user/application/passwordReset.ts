import { useShowNotification } from 'core/modules/notifications/application';
import { UserService } from '../infrastructure/http/user.service';

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export interface IPasswordResetActions {
  sendForgotPasswordEmail: (
    data: ForgotPasswordData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ) => Promise<void>;

  resetPassword: (data: ResetPasswordData, onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;
}

export const usePasswordReset = (): IPasswordResetActions => {
  const { showSuccessNotification, showErrorNotification } = useShowNotification();

  const sendForgotPasswordEmail = async (
    data: ForgotPasswordData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const payload = { ...data };

    try {
      const response = await userService.forgotPassword(payload);
      showSuccessNotification(response.message);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showErrorNotification(error.message);

      if (onError) {
        onError();
      }
    }
  };

  const resetPassword = async (
    data: ResetPasswordData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const { token, ...payload } = data;

    try {
      await userService.resetPassword(payload, token);
      showSuccessNotification('The password was reset successfully.');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showErrorNotification(error.message);

      if (onError) {
        onError();
      }
    }
  };

  return {
    sendForgotPasswordEmail,
    resetPassword,
  };
};
