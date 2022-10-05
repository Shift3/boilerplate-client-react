import { environment } from 'environment';
import { EnvironmentConfiguration } from 'environment/types';
import { AuthState } from './authSlice';

const LOCAL_STORAGE_AUTH_KEY = 'auth';

export const saveAuthState = (auth: AuthState): void => {
  if (environment.environment === EnvironmentConfiguration.Development)
    document.cookie = `x-auth-token=${auth.token}; path=/; SameSite=None; Secure`;
  else document.cookie = `x-auth-token=${auth.token}; path=/; SameSite=None; Domain=${environment.apiHost}; Secure`;
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
  if (environment.environment === EnvironmentConfiguration.Development)
    document.cookie = `x-auth-token=; path=/; SameSite=None; Secure`;
  else document.cookie = `x-auth-token=; Max-Age=0; path=/; SameSite=None; Domain=${environment.apiHost}; Secure`;
};
