import { useSelector } from 'react-redux';
import { ISession } from '../domain/session';
import { selectSession } from '../infrastructure/store/authSlice';

export const useAuthState = (): ISession | null => useSelector(selectSession);
