import * as notificationService from 'common/services/notification';
import { UserService } from '../infrastructure/http/userService';

export type CreateAccountData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type ActivateAccountData = {
  newPassword: string;
  confirmPassword: string;
  token: string; // The temporary token in the account activation link of the welcome email.
};

export interface IAccountCreationFacade {
  /**
   * Create account and send welcome email with account activation link.
   *
   * If the account is created successfully, a success notification will be shown. Otherwise, if there is an error,
   * an error notification will be shown.
   *
   * @param {CreateAccountData} data - The user data required to create a new account.
   * @param {CallableFunction} onSuccess - Optional callback function to be called if account is created successfully.
   * @param {CallableFunction} onError - Optional callback function to be called if account creation fails.
   */
  createAccount: (data: CreateAccountData, onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;

  /**
   * Activate account with new password.
   *
   * If the account is activated successfully, a success notification will be shown. Otherwise, if there is an error,
   * an error notificaiton will be shown.
   *
   * @param {ActivateAccountData} data - The data required to activate a user account.
   * @param {CallableFunction} onSuccess - Optional callback function to be called if account is activated successfully.
   * @param {CallableFunction} onError - Optional callback function to be called if account activation fails.
   */
  activateAccount: (
    data: ActivateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ) => Promise<void>;
}

/**
 * Custom hook that returns an IAccountCreationFacade.
 */
export const useAccountCreation = (): IAccountCreationFacade => {
  const createAccount = async (
    data: CreateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const payload = { ...data };

    try {
      await userService.signUp(payload);
      notificationService.showSuccessMessage(`An activation email has been sent to ${payload.email}.`);

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

  const activateAccount = async (
    data: ActivateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const { token, ...payload } = data;

    try {
      await userService.activateAccount(payload, token);
      notificationService.showSuccessMessage('This account has been activated. Please log in.');

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
    createAccount,
    activateAccount,
  };
};
