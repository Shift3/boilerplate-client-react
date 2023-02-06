export interface Agent {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  categoryList: unknown[];
  documentList: unknown[];
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
