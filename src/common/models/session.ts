import { User } from '.';

export interface Session {
  jwtToken: string;
  user: User;
}
