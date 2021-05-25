/* eslint-disable lines-between-class-members */
import { environment } from 'environment';
import { IActivateAccountRequest, ISignupRequest, IUserDTO } from 'models/user';
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
}
