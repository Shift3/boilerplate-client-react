import { User } from 'core/modules/user/domain/user';
import { ISession, Session } from '../../domain/session';

const LOCAL_STORAGE_SESSION_KEY = 'session';

export const saveSession = (session: ISession): void => {
  if (session instanceof Session) {
    session = session.toPlainObject();
  }
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): Session | null => {
  const sessionStr = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  const sessionObj: ISession = sessionStr ? JSON.parse(sessionStr) : null;
  const user = new User({ ...sessionObj.user });
  return sessionObj ? new Session({ ...sessionObj, user }) : null;
};

export const clearSession = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
};
