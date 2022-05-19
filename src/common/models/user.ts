import { Role } from './role';
import { Image } from './image';

export interface User {
  id: string;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: Image | null;
  role: Role;
  newEmail: string | null;
}
