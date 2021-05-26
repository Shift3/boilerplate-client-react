/* eslint-disable lines-between-class-members */
import { environment } from 'environment';
import { IMessage } from 'models/message';
import {
  IActivateAccountRequest,
  ICreateUserRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  ISignupRequest,
  IUserDTO,
} from 'models/user';
import { ApiService } from './api.service';

export class UserService {
  private controllerRoute = 'users';
  private url: string;
  private apiService: ApiService;

  constructor(apiService?: ApiService) {
    this.apiService = apiService ?? new ApiService();
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public async signUp(payload: ISignupRequest): Promise<IUserDTO> {
    const endpoint = `${this.url}/signup/`;
    return this.apiService.post<IUserDTO, ISignupRequest>(endpoint, payload);
  }

  public async activateAccount(payload: IActivateAccountRequest, token: string): Promise<IUserDTO> {
    const endpoint = `${this.url}/activate-account/${token}`;
    return this.apiService.put<IUserDTO, IActivateAccountRequest>(endpoint, payload);
  }

  public async forgotPassword(payload: IForgotPasswordRequest): Promise<IMessage> {
    const endpoint = `${this.url}/forgot-password/`;
    return this.apiService.post<IMessage, IForgotPasswordRequest>(endpoint, payload);
  }

  public async resetPassword(payload: IResetPasswordRequest, token: string): Promise<IUserDTO> {
    const endpoint = `${this.url}/reset-password/${token}`;
    return this.apiService.put<IUserDTO, IResetPasswordRequest>(endpoint, payload);
  }

  public async createUser(payload: ICreateUserRequest): Promise<IUserDTO> {
    const endpoint = `${this.url}`;
    return this.apiService.post<IUserDTO, ICreateUserRequest>(endpoint, payload);
  }
}
