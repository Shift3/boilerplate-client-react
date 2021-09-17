import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useAuthState } from 'core/modules/auth/application/useAuthState';
import { User } from 'core/modules/user/domain/user';

export interface IUserProfile {
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

export interface INavLink {
  icon: IconName;
  label: string;
  path: string;
  canUserActivate: boolean;
}

export interface INavData {
  userProfile: IUserProfile | null;
  navLinks: INavLink[];
}

export const useNavData = (): INavData => {
  const session = useAuthState();
  const user = session?.user ? User.fromPlainObject(session.user) : null;

  const authUser = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
      }
    : null;

  const navLinks: INavLink[] = [
    {
      icon: 'stethoscope',
      label: 'Directory',
      path: '/agents',
      canUserActivate: user?.role.canViewAgents() ?? false,
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/users',
      canUserActivate: user?.role.canViewUsers() ?? false,
    },
    {
      icon: 'building',
      label: 'Agencies',
      path: '/agencies',
      canUserActivate: user?.role.canViewAgencies() ?? false,
    },
  ];

  return {
    userProfile: authUser,
    navLinks,
  };
};
