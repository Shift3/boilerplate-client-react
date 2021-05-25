/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
import { IAgencyDTO } from './agency';
import { IRoleDTO } from './role';

export interface ISignupRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export class SignupRequest implements ISignupRequest {
  email = '';
  firstName = '';
  lastName = '';

  constructor(configOverride?: Partial<ISignupRequest>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IActivateAccountRequest {
  newPassword: string;
  confirmPassword: string;
}

export class ActivateAccountRequest implements IActivateAccountRequest {
  newPassword = '';
  confirmPassword = '';

  constructor(configOverride?: Partial<IActivateAccountRequest>) {
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
