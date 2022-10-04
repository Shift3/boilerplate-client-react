import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/redux';
import { Image, User } from 'common/models';
import * as authLocalStorage from './authLocalStorage';

export interface AuthState {
  token: string | null;
  user: User | null;
}

const storedAuthState = authLocalStorage.getAuthState();

const initialState: AuthState = storedAuthState?.token ? storedAuthState : { token: null, user: null };

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

    userUpdatedProfile: (state: AuthState, action: PayloadAction<User>) => {
      const updatedUser: User = action.payload;
      state.user = updatedUser;
    },

    userUpdatedProfilePicture: (state: AuthState, action: PayloadAction<Image | null>) => {
      const updatedProfilePicture: Image | null = action.payload;
      if (state.user) {
        state.user = { ...state.user, profilePicture: updatedProfilePicture };
      }
    },
  },
});

export const selectAuthState = (state: RootState): AuthState => state.auth;
