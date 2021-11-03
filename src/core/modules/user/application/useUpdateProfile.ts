import * as notificationService from 'common/services/notification';
import { useAuth } from 'features/auth/hooks';
import { UserService } from '../infrastructure/http/userService';

export type UpdateProfileData = {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

// This function defines what will be returned by this custom hook
export type UpdateProfileManager = {
  updateProfile: (data: UpdateProfileData, onSuccess?: () => void, onError?: () => void) => void;
};

export const useUpdateProfile = (): UpdateProfileManager => {
  const { token, user } = useAuth();

  const updateProfile = async (data: UpdateProfileData, onSuccess?: () => void, onError?: () => void) => {
    if (!token || !user) {
      notificationService.showErrorMessage('Unauthorized');
      return;
    }

    const userService = new UserService();

    try {
      await userService.updateProfile(user.id, data, token);

      notificationService.showSuccessMessage('Profile updated.');

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
    updateProfile,
  };
};
