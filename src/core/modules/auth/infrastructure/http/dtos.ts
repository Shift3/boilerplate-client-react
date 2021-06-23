import { UserResponse } from 'core/modules/user/infrastructure/http/dtos';

export type LoginRequest = {
  email: string;
  password: string;
};

export type SessionResponse = {
  jwtToken: string;
  user: UserResponse;
};
