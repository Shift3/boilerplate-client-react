/* eslint-disable lines-between-class-members */

import { AgencyDTO, IAgencyDTO } from './agency';
import { IRoleDTO, RoleDTO } from './role';

export interface IUserDTO {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  agency: IAgencyDTO;
  role: IRoleDTO;
}

export class UserDTO implements IUserDTO {
  id = 0;
  email = '';
  activatedAt = null;
  firstName = '';
  lastName = '';
  profilePicture = null;
  agency = new AgencyDTO();
  role = new RoleDTO();

  constructor(configOverride?: Partial<IUserDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
