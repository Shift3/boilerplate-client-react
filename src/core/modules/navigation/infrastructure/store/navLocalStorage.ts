import { NavPosition } from '../../domain/navPosition';

const LOCAL_STORAGE_NAV_POSITION_KEY = 'navPosition';

export const saveNavPosition = (position: NavPosition): void => {
  localStorage.setItem(LOCAL_STORAGE_NAV_POSITION_KEY, position);
};

export const getNavPosition = (): NavPosition | null => {
  const position = localStorage.getItem(LOCAL_STORAGE_NAV_POSITION_KEY);
  if (position) {
    return position as NavPosition;
  }
  return null;
};
