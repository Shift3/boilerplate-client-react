import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from 'features/auth/hooks';

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
  const { user } = useAuth();

  const navLinks: INavLink[] = [
    {
      icon: 'stethoscope',
      label: 'Directory',
      path: '/agents',
      canUserActivate: user?.role.roleName !== '',
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/users',
      canUserActivate: user?.role.roleName === 'Super Administrator' || user?.role.roleName === 'Admin',
    },
    {
      icon: 'building',
      label: 'Agencies',
      path: '/agencies',
      canUserActivate: user?.role.roleName === 'Super Administrator',
    },
  ];

  return {
    userProfile: user,
    navLinks,
  };
};
