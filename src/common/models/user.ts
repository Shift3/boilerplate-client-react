import { Agency } from './agency';
import { Role } from './role';
import { Image } from './image';

export interface User {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: Image | null;
  agency: Agency;
  role: Role;
  newEmail: string | null;
}
