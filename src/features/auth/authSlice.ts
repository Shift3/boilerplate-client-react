import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/redux';
import { User } from 'common/models';
import * as authLocalStorage from './authLocalStorage';
import * as jwt from './utils/jwt';

export interface AuthState {
  token: string | null;
  user: User | null;
}

const storedAuthState = authLocalStorage.getAuthState();

const initialState: AuthState =
  storedAuthState?.token && !jwt.isMalformed(storedAuthState.token) && !jwt.isExpired(storedAuthState.token)
    ? storedAuthState
    : { token: null, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state: AuthState, action: PayloadAction<AuthState>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },

    userLoggedOut: (state: AuthState) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const selectAuthState = (state: RootState): AuthState => state.auth;
