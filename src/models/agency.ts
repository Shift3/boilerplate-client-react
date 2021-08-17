export interface IAgency {
  id: number;
  agencyName: string;
}

export interface IAgencyDTO {
  id: number;
  createdBy?: number;
  deletedAt?: string;
  deletedBy?: number;
  agencyName: string;
}

export interface Agency {
  id: number;
  createdBy?: number;
  deletedAt?: string;
  deletedBy?: number;
  agencyName: string;
}
