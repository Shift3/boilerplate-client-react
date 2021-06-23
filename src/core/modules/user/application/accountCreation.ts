import { useShowNotification } from 'core/modules/notifications/application';
import { UserService } from '../infrastructure/http/user.service';

export type CreateAccountData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type ActivateAccountData = {
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export interface IAccountCreationActions {
  createAccount: (data: CreateAccountData, onSuccess?: CallableFunction, onError?: CallableFunction) => Promise<void>;
  activateAccount: (
    data: ActivateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ) => Promise<void>;
}

export const useAccountCreation = (): IAccountCreationActions => {
  const { showSuccessNotification, showErrorNotification } = useShowNotification();

  const createAccount = async (
    data: CreateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const payload = { ...data };

    try {
      await userService.signUp(payload);
      showSuccessNotification(`An activation email has been sent to ${payload.email}.`);

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

  const activateAccount = async (
    data: ActivateAccountData,
    onSuccess?: CallableFunction,
    onError?: CallableFunction,
  ): Promise<void> => {
    const userService = new UserService();
    const { token, ...payload } = data;

    try {
      await userService.activateAccount(payload, token);
      showSuccessNotification('This account has been activated. Please log in.');

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
    createAccount,
    activateAccount,
  };
};
