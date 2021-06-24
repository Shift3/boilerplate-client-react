import { ApiService, RequestOptions } from 'core/shared/infrastructure/http/api.service';
import { environment } from 'environment';
import { LoginRequest, SessionResponse } from './dtos';

export class AuthService {
  private controllerRoute = 'auth';
  private url: string;
  private apiService: ApiService;

  constructor(apiService?: ApiService) {
    this.apiService = apiService ?? new ApiService();
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public async login(payload: LoginRequest): Promise<SessionResponse> {
    const endpoint = `${this.url}/login/`;
    return this.apiService.post<SessionResponse, LoginRequest>(endpoint, payload);
  }

  public async logout(token: string): Promise<void> {
    const endpoint = `${this.url}/logout/`;
    const options: RequestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.apiService.get<void>(endpoint, options);
  }
}
