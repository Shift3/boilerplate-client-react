/* eslint-disable lines-between-class-members */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export interface IAgencyDTO {
  id: number
  createdBy?: number
  deletedAt?: string
  deletedBy?: number
  agencyName: string
}

export class AgencyDTO implements IAgencyDTO {
  id: number = 0
  createdBy?: number = 0
  deletedAt?: string = ''
  deletedBy?: number = 0
  agencyName: string = ''

  constructor(configOverride?: Partial<IAgencyDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride)
    }
  }
}
