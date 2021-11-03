import * as notificationService from 'common/services/notification';
import { ForgotPasswordRequest, ResetPasswordRequest } from '../infrastructure/http/dtos';
import { UserService } from '../infrastructure/http/userService';

export type ResetPasswordCredentials = {
  newPassword: string;
  confirmPassword: string;
  token: string; // The temporary token in the reset password link of the reset password email.
};

export interface IPasswordResetFacade {
  /**
   * Sends an email with a link to reset a users password if a user with the specified email exists.
   *
   * If an error occurs and the request fails, an error notification will be shows.
   *
   * @param {string} email - The email address of the user whose password is to be reset.
   * @param {CallableFunction} onSuccess - Optional callback function to be called if email is sent successfully.
   * @param {CallableFunction} onError - Optional callback function to be called if email fails to send.
   */
  sendResetPasswordEmail: (email: string, onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;

  /**
   * Resets the users password.
   *
   * If the password reset is successful, a success notification will be shown. Otherwise, if the password reset
   * fails, an error notification will be shown.
   *
   * @param {ResetPasswordCredentials} credentials - The credentials required to reset the users password.
   * @param {CallableFunction} onSuccess - Optional callback function to be called if password is reset successfully.
   * @param {CallableFunction} onError - Optional callback function to be called if password reset fails.
   */
  resetPassword: (
    credentials: ResetPasswordCredentials,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ) => Promise<void>;
}

/**
 * Custom hook that returns an IPasswordResetFacade.
 */
export const usePasswordReset = (): IPasswordResetFacade => {
  const sendForgotPasswordEmail = async (
    email: string,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const payload: ForgotPasswordRequest = { email };

    try {
      const response = await userService.forgotPassword(payload);
      notificationService.showSuccessMessage(response.message);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      notificationService.showErrorMessage(error.message);

      if (onError) {
        onError();
      }
    }
  };

  const resetPassword = async (
    credentials: ResetPasswordCredentials,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const { newPassword, confirmPassword, token } = credentials;
    const payload: ResetPasswordRequest = { newPassword, confirmPassword };

    try {
      await userService.resetPassword(payload, token);
      notificationService.showSuccessMessage('The password was reset successfully.');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      notificationService.showErrorMessage(error.message);

      if (onError) {
        onError();
      }
    }
  };

  return {
    sendResetPasswordEmail: sendForgotPasswordEmail,
    resetPassword,
  };
};
