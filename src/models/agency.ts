/* eslint-disable lines-between-class-members */

export interface IAgencyDTO {
  id: number;
  createdBy?: number;
  deletedAt?: string;
  deletedBy?: number;
  agencyName: string;
}

export class AgencyDTO implements IAgencyDTO {
  id = 0;
  createdBy = 0;
  deletedAt = '';
  deletedBy = 0;
  agencyName = '';

  constructor(configOverride?: Partial<IAgencyDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
