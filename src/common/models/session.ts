import { User } from '.';

export interface Session {
  token: string;
  user: User;
}
