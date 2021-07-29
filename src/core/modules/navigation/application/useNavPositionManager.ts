import { useState } from 'react';

export type NavPosition = 'top' | 'side';

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
  const [navPosition, setNavPosition] = useState<NavPosition>('top');

  const toggleNavPosition = () => {
    const newPosition = navPosition === 'top' ? 'side' : 'top';
    setNavPosition(newPosition);
  };

  return {
    navPosition,
    toggleNavPosition,
  };
};
