import { ISession, Session } from '../../domain/session';

export class AuthLocalStorage {
  private static LOCAL_STORAGE_SESSION_KEY = 'session';

  public static saveSession = (session: ISession): void => {
    if (session instanceof Session) {
      session = session.toPlainObject();
    }
    localStorage.setItem(AuthLocalStorage.LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));
  };

  public static getSession = (): Session | null => {
    const sessionStr = localStorage.getItem(AuthLocalStorage.LOCAL_STORAGE_SESSION_KEY);

    if (!sessionStr) {
      return null;
    }

    const sessionObj: ISession = JSON.parse(sessionStr);
    return Session.fromPlainObject(sessionObj);
  };

  public static clearSession = (): void => {
    localStorage.removeItem(AuthLocalStorage.LOCAL_STORAGE_SESSION_KEY);
  };
}
