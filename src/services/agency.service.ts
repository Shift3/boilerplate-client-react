import { IAgency, IAgencyDTO } from 'models/agency';
import { ApiRequestConfig, ApiService, IApiService } from './api.service';

export interface IAgencyService {
  getAllAgencies: (jwtToken: string) => Promise<IAgency[]>;
}

export class AgencyService implements IAgencyService {
  private controllerRoute: string;

  constructor(private apiService: IApiService = new ApiService()) {
    this.controllerRoute = 'agencies';
  }

  public async getAllAgencies(jwtToken: string): Promise<IAgency[]> {
    const endpoint = `/${this.controllerRoute}`;
    const config: ApiRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const dtos: IAgencyDTO[] = await this.apiService.get<IAgencyDTO[]>(endpoint, config);
    const agencies: IAgency[] = dtos.map(this.mapDtoToModel);
    return agencies;
  }

  private mapDtoToModel(dto: IAgencyDTO): IAgency {
    const { id, agencyName } = dto;
    return { id, agencyName };
  }
}
