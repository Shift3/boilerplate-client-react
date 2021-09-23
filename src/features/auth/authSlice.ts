import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/redux';
import { Session, User } from 'common/models';
import { authApi } from './authApi';

export interface SliceState {
  token: string | null;
  user: User | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null } as SliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state: SliceState, action: PayloadAction<Session>) => {
      const { jwtToken, user } = action.payload;
      state.token = jwtToken;
      state.user = user;
    });

    builder.addMatcher(authApi.endpoints.login.matchRejected, (state: SliceState) => {
      state.token = null;
      state.user = null;
    });

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state: SliceState) => {
      state.token = null;
      state.user = null;
    });

    builder.addMatcher(authApi.endpoints.logout.matchRejected, (state: SliceState) => {
      state.token = null;
      state.user = null;
    });
  },
});

export const selectAuthState = (state: RootState): SliceState => state.auth;
