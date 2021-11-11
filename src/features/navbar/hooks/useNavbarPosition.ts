import { useEffect, useState } from 'react';
import * as navbarStateService from '../services/navbarState';
import { NavbarPosition, NavbarState } from '../services/navbarState';

export type NavbarPositionManager = {
  /**
   * The current position of the navbar.
   */
  navbarPosition: NavbarPosition;

  /**
   * Toggles the position of the navbar between 'top' and 'side'.
   */
  toggleNavbarPosition: () => void;
};

export const useNavbarPosition = (): NavbarPositionManager => {
  const [navbarPosition, setNavbarPosition] = useState<NavbarPosition>(() => navbarStateService.getNavbarPosition());

  // Subscribe to the navbar state service to ensure that the navbarPosition is kept consistent
  // between all consumers of this hook.
  useEffect(() => {
    const subscriptionId = navbarStateService.subscribe((navbarState: NavbarState) => {
      const { position } = navbarState;
      setNavbarPosition(position);
    });

    return () => navbarStateService.unsubscribe(subscriptionId);
  }, []);

  // Write changes to the navbar state service.
  useEffect(() => {
    navbarStateService.saveNavbarPosition(navbarPosition);
  }, [navbarPosition]);

  const toggleNavbarPosition = () => setNavbarPosition((prevPosition) => (prevPosition === 'top' ? 'side' : 'top'));

  return {
    navbarPosition,
    toggleNavbarPosition,
  };
};
