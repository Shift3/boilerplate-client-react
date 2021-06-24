import { UserResponse } from 'core/modules/user/infrastructure/http/dtos';

export type SessionResponse = {
  jwtToken: string;
  user: UserResponse;
};
