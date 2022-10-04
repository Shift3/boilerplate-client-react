import { AuthState } from './authSlice';

const LOCAL_STORAGE_AUTH_KEY = 'auth';

export const saveAuthState = (auth: AuthState): void => {
  document.cookie = `x-auth-token=${auth.token}; path=/; SameSite=None; Secure`;
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
  document.cookie = 'x-auth-token=; Max-Age=0; path=/; SameSite=None; Secure';
};
