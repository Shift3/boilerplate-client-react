import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';

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
  const { userCan } = useRbac();

  const navLinks: INavLink[] = [
    {
      icon: 'stethoscope',
      label: 'Directory',
      path: '/agents',
      canUserActivate: userCan('agent:read'),
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/users',
      canUserActivate: userCan('user:read'),
    },
    {
      icon: 'building',
      label: 'Agencies',
      path: '/agencies',
      canUserActivate: userCan('agency:read'),
    },
  ];

  return {
    userProfile: user,
    navLinks,
  };
};
