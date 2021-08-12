import { AgencyDTO } from 'models/agency.dto';
import { ApiRequestConfig, ApiService, IApiService } from './api.service';

export class AgencyService {
  private controllerRoute: string;

  constructor(private apiService: IApiService = new ApiService()) {
    this.controllerRoute = 'agencies';
  }

  public async getAllAgencies(jwtToken: string): Promise<AgencyDTO> {
    const endpoint = `/${this.controllerRoute}`;
    const config: ApiRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    return this.apiService.get<AgencyDTO>(endpoint, config);
  }
}
