import { AuthState } from './authSlice';

const LOCAL_STORAGE_AUTH_KEY = 'auth';

export const saveAuthState = (auth: AuthState): void => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth));
};

export const getAuthState = (): AuthState | null => {
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  if (!auth) {
    return null;
  }

  return JSON.parse(auth);
};

export const clearAuthState = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};
