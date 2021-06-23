import { ApiService } from 'core/shared/infrastructure/http/api.service';
import { environment } from 'environment';
import { Role } from '../../domain/role';
import { User } from '../../domain/user';
import {
  ActivateAccountRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  SignUpRequest,
  UserResponse,
} from './dtos';

export class UserService {
  private controllerRoute = 'users';
  private url: string;
  private apiService: ApiService;

  constructor(apiService?: ApiService) {
    this.apiService = apiService ?? new ApiService();
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public async signUp(payload: SignUpRequest): Promise<User> {
    const endpoint = `${this.url}/signup/`;
    const userDto = await this.apiService.post<UserResponse, SignUpRequest>(endpoint, payload);
    return new User({ ...userDto, role: new Role(userDto.role) });
  }

  public async activateAccount(payload: ActivateAccountRequest, token: string): Promise<User> {
    const endpoint = `${this.url}/activate-account/${token}`;
    const userDto = await this.apiService.put<UserResponse, ActivateAccountRequest>(endpoint, payload);
    return new User({ ...userDto, role: new Role(userDto.role) });
  }

  public async forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const endpoint = `${this.url}/forgot-password/`;
    return this.apiService.post<ForgotPasswordResponse, ForgotPasswordRequest>(endpoint, payload);
  }

  public async resetPassword(payload: ResetPasswordRequest, token: string): Promise<User> {
    const endpoint = `${this.url}/reset-password/${token}`;
    const userDto = await this.apiService.put<UserResponse, ResetPasswordRequest>(endpoint, payload);
    return new User({ ...userDto, role: new Role(userDto.role) });
  }
}
