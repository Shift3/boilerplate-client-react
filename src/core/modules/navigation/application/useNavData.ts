import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';

export interface IUserProfile {
  id: number;
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
  const { userHasPermission } = useRbac();

  const navLinks: INavLink[] = [
    {
      icon: 'stethoscope',
      label: 'Directory',
      path: '/agents',
      canUserActivate: userHasPermission('agent:read'),
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/users',
      canUserActivate: userHasPermission('user:read'),
    },
    {
      icon: 'building',
      label: 'Agencies',
      path: '/agencies',
      canUserActivate: userHasPermission('agency:read'),
    },
  ];

  return {
    userProfile: user,
    navLinks,
  };
};
