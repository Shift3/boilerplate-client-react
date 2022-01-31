import jwtDecode, { JwtPayload } from 'jwt-decode';

export const isMalformed = (token: string): boolean => {
  try {
    jwtDecode<JwtPayload>(token);
  } catch (e) {
    return true;
  }
  return false;
};

export const isExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  const { exp } = decoded;
  // eslint-disable-next-line no-magic-numbers
  return !!exp && exp * 1000 < Date.now();
};