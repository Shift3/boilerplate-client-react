import { ApiService } from 'core/shared/infrastructure/http/api.service';
import { environment } from 'environment';
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

  public async signUp(payload: SignUpRequest): Promise<UserResponse> {
    const endpoint = `${this.url}/signup/`;
    return this.apiService.post<UserResponse, SignUpRequest>(endpoint, payload);
  }

  public async activateAccount(payload: ActivateAccountRequest, token: string): Promise<UserResponse> {
    const endpoint = `${this.url}/activate-account/${token}`;
    return this.apiService.put<UserResponse, ActivateAccountRequest>(endpoint, payload);
  }

  public async forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const endpoint = `${this.url}/forgot-password/`;
    return this.apiService.post<ForgotPasswordResponse, ForgotPasswordRequest>(endpoint, payload);
  }

  public async resetPassword(payload: ResetPasswordRequest, token: string): Promise<UserResponse> {
    const endpoint = `${this.url}/reset-password/${token}`;
    return this.apiService.put<UserResponse, ResetPasswordRequest>(endpoint, payload);
  }
}
