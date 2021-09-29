import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
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
  const { showSuccessNotification, showErrorNotification } = useShowNotification();

  const updateProfile = async (data: UpdateProfileData, onSuccess?: () => void, onError?: () => void) => {
    if (!token || !user) {
      showErrorNotification('Unauthorized');
      return;
    }

    const userService = new UserService();

    try {
      await userService.updateProfile(user.id, data, token);

      showSuccessNotification('Profile updated.');

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
    updateProfile,
  };
};
