import { IRole } from 'core/modules/user/domain/role';
import { ApiService, RequestOptions } from 'core/shared/infrastructure/http/apiService';
import { environment } from 'environment';

export class RoleService {
  private controllerRoute = 'roles';
  private url: string;
  private apiService: ApiService;

  constructor(apiService?: ApiService) {
    this.apiService = apiService ?? new ApiService();
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public async getRoles(token: string): Promise<IRole[]> {
    const endpoint = `${this.url}`;
    const options: RequestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    return this.apiService.get<IRole[]>(endpoint, options);
  }
}