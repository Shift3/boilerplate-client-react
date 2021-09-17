import { useState } from 'react';
import { NavPosition } from '../domain/navPosition';
import * as NavLocalStorage from '../infrastructure/store/navLocalStorage';

export type NavPositionManager = {
  /**
   *
   */
  navPosition: NavPosition;

  /**
   *
   */
  toggleNavPosition: () => void;
};

export const useNavPositionManager = (): NavPositionManager => {
  const [navPosition, setNavPosition] = useState<NavPosition>(NavLocalStorage.getNavPosition() ?? 'top');

  const toggleNavPosition = () => {
    const newPosition = navPosition === 'top' ? 'side' : 'top';
    setNavPosition(newPosition);
    NavLocalStorage.saveNavPosition(newPosition);
  };

  return {
    navPosition,
    toggleNavPosition,
  };
};
