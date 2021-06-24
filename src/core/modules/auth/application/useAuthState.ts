// Third-party imports
import { useSelector } from 'react-redux';

// App imports
import { ISession } from '../domain/session';
import { selectSession } from '../infrastructure/store/authSlice';

export const useAuthState = (): ISession | null => useSelector(selectSession);
