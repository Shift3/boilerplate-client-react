import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session, User } from 'common/models';
import { authApi } from './authApi';

export interface SliceState {
  token: string | null;
  user: User | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null } as SliceState,
  reducers: {
    logout: (state: SliceState) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state: SliceState, action: PayloadAction<Session>) => {
      const { jwtToken, user } = action.payload;
      state.token = jwtToken;
      state.user = user;
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

export default authSlice;
