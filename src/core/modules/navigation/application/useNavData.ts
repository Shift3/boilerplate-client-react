import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useAuthState } from 'core/modules/auth/application/useAuthState';
import { User } from 'core/modules/user/domain/user';

export interface IAuthUserData {
  firstName: string;
  lastName: string;
}

export interface INavLinkData {
  icon: IconName;
  label: string;
  path: string;
  isActive: boolean;
}

export interface INavData {
  authUser: IAuthUserData | null;
  navLinks: INavLinkData[];
}

export const useNavData = (): INavData => {
  const session = useAuthState();
  const user = session?.user ? User.fromPlainObject(session.user) : null;

  const authUser = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
      }
    : null;

  const navLinks: INavLinkData[] = [
    {
      icon: 'stethoscope',
      label: 'Directory',
      path: '/content/agent-list',
      isActive: user?.role.canViewAgents() ?? false,
    },
    {
      icon: 'users',
      label: 'Users',
      path: '/admin/user-list',
      isActive: user?.role.canViewUsers() ?? false,
    },
    {
      icon: 'building',
      label: 'Agencies',
      path: '/admin/agency-list',
      isActive: user?.role.canViewAgencies() ?? false,
    },
  ];

  return {
    authUser,
    navLinks,
  };
};
