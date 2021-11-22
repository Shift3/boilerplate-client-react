import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useRbac } from 'features/rbac';

export type NavLinkConfig = {
  id: number;
  icon: IconName;
  label: string;
  path: string;
};

export const useNavLinks = (): NavLinkConfig[] => {
  const { userHasPermission } = useRbac();

  const navLinks: NavLinkConfig[] = [];

  if (userHasPermission('agent:read')) {
    navLinks.push({ id: 1, icon: 'stethoscope', label: 'Directory', path: '/agents' });
  }

  if (userHasPermission('user:read')) {
    navLinks.push({ id: 2, icon: 'users', label: 'Users', path: '/users' });
  }

  if (userHasPermission('agency:read')) {
    navLinks.push({ id: 3, icon: 'building', label: 'Agencies', path: '/agencies' });
  }

  return navLinks;
};
