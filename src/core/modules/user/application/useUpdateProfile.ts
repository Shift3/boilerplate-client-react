import { useAuthState } from 'core/modules/auth/application/useAuthState';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { UserService } from '../infrastructure/http/userService';

export type UpdateProfileData = {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

// This function defines what will be returned by this custom hook
export type UpdateProfileManager = {
  updateProfile: (data: UpdateProfileData) => void;
}

export const useUpdateProfile = (): UpdateProfileManager => {
  const session = useAuthState();
  const { showErrorNotification } = useShowNotification();

  const updateProfile = (data: UpdateProfileData) => {
    if (!session) {
      showErrorNotification('Unauthorized');
      return;
    }

    const userService = new UserService();

    try {
      userService.updateProfile(session.user.id, data, session.token);
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  return {
    updateProfile,
  };
};
