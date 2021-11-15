import { nanoid } from '@reduxjs/toolkit';

const LOCAL_STORAGE_NAVBAR_STATE_KEY = 'navbar';

export type NavbarPosition = 'top' | 'side';

export type NavbarState = {
  position: NavbarPosition;
};

export type SubscriptionCallback = (state: NavbarState) => void;

export type SubscriptionId = number | string;

const defaultState: NavbarState = {
  position: 'top',
};

const subscriptions: Map<SubscriptionId, SubscriptionCallback> = new Map<SubscriptionId, SubscriptionCallback>();

const getNavbarState = (): NavbarState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_NAVBAR_STATE_KEY);

    if (!serializedState) {
      return defaultState;
    }

    return JSON.parse(serializedState);
  } catch {
    return defaultState;
  }
};

const saveNavbarState = (state: NavbarState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_NAVBAR_STATE_KEY, serializedState);
    subscriptions.forEach((callback) => callback(state));
  } catch {
    // Exceptions may be thrown in cases such as if storage is full or the user is in
    // private browsing mode. In such cases, ignore saving state.
  }
};

export const getNavbarPosition = (): NavbarPosition => {
  const { position } = getNavbarState();
  return position;
};

export const saveNavbarPosition = (position: NavbarPosition): void => {
  const state = { ...getNavbarState(), position };
  saveNavbarState(state);
};

export const subscribe = (callback: SubscriptionCallback): SubscriptionId => {
  const id = nanoid();
  subscriptions.set(id, callback);
  return id;
};

export const unsubscribe = (id: SubscriptionId): void => {
  subscriptions.delete(id);
};

// If multiple instance of the app are running in different tabs, this will sync a change
// made to the navbar state in one instance with the other instances.
window.addEventListener('storage', (event: StorageEvent) => {
  if (event.key === LOCAL_STORAGE_NAVBAR_STATE_KEY && !!event.newValue) {
    try {
      const newState = JSON.parse(event.newValue);
      subscriptions.forEach((callback) => callback(newState));
    } catch {
      // Ignore.
    }
  }
});
