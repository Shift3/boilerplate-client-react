import { useAppSelector } from 'app/redux';
import { AuthState, selectAuthState } from '../authSlice';

export type UseAuthHook = () => AuthState;

export const useAuth: UseAuthHook = () => useAppSelector(selectAuthState);
