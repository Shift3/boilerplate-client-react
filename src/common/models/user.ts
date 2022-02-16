import { Agency } from './agency';
import { Role } from './role';

export interface User {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  agency: Agency;
  role: Role;
  newEmail: string | null;
}
