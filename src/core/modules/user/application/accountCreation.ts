import { useShowNotification } from 'core/modules/notifications/application';
import { ActivateAccountRequest, SignUpRequest } from '../infrastructure/http/dtos';
import { UserService } from '../infrastructure/http/user.service';

export interface ICreateAccountInteractor {
  createAccount: (email: string, firstName: string, lastName: string) => Promise<void>;
  activateAccount: (newPassword: string, confirmPassword: string, token: string) => Promise<void>;
}

export const useCreateAccount = (): ICreateAccountInteractor => {
  const { showSuccessNotification, showErrorNotification } = useShowNotification();

  const createAccount = async (email: string, firstName: string, lastName: string) => {
    const userService = new UserService();
    const payload: SignUpRequest = { email, firstName, lastName };
    try {
      await userService.signUp(payload);
      showSuccessNotification(`An activation email has been sent to ${email}.`);
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  const activateAccount = async (newPassword: string, confirmPassword: string, token: string) => {
    const userService = new UserService();
    const payload: ActivateAccountRequest = { newPassword, confirmPassword };
    try {
      await userService.activateAccount(payload, token);
      showSuccessNotification('This account has been activated. Please log in.');
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  return {
    createAccount,
    activateAccount,
  };
};
