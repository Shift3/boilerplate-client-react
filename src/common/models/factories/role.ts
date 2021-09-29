import { Factory } from 'fishery';
import { Role } from '../role';

export const roleFactory = Factory.define<Role>(({ sequence, params }) => ({
  id: sequence,
  roleName: params.roleName ?? 'User',
}));
