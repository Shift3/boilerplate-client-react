export interface Agency {
  id: number;
  createdBy?: number;
  createdAt: Date;
  deletedAt?: string;
  deletedBy?: number;
  agencyName: string;

  userCount: number;
}
