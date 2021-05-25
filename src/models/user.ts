import { IAgencyDTO } from './agency';
import { IRoleDTO } from './role';

/* eslint-disable lines-between-class-members */
export interface ISignupRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export class SignupRequest implements ISignupRequest {
  email = '';
  firstName = '';
  lastName = '';

  constructor(configOverride?: ISignupRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

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
