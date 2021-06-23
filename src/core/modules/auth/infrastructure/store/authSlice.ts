import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'core/redux';
import { ISession } from '../../domain/session';
import { getSession } from './auth.localStorage';

export type AuthSliceState = {
  session: ISession | null;
};

const initialState: AuthSliceState = {
  session: getSession(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state: AuthSliceState, action: PayloadAction<ISession>) => {
      state.session = action.payload;
    },

    clearSession: (state: AuthSliceState) => {
      state.session = null;
    },
  },
});

export default authSlice;

export const selectSession = (state: RootState): ISession | null => state.auth.session;
