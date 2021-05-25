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

export interface IResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export class ResetPasswordRequest implements IResetPasswordRequest {
  newPassword = '';
  confirmPassword = '';

  constructor(configOverride?: Partial<IResetPasswordRequest>) {
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
