import { User } from 'common/models';
import { AuthState } from 'features/auth/authSlice';

describe('authSlice', () => {
  describe('init', () => {
    it('uses stored auth token when available', () => {
      const testToken = '0123456789ABCDEF';
      const store = setUpStore({ token: testToken, user: {} as User });

      // This loads the slice and makes it read the stored token.
      const authData = store.getState().auth as AuthState;

      expect(authData).toBeTruthy();
      expect(authData.token).toEqual(testToken);
    });

    it('sets empty auth data when not previously stored', () => {
      const store = setUpStore();

      // This loads the slice and makes it read the stored token.
      const authData = store.getState().auth as AuthState;

      expect(authData).toBeTruthy();
      expect(authData.token).toBeNull();
      expect(authData.user).toBeNull();
    });
  });
});

/**
 * Prepares store objects in order to test the slice.
 *
 * @param storedAuthState The authentication state that should be returned by
 *  local storage when the slice initializes. The default is to return nothing.
 *
 * @returns The redux store.
 *
 * @remarks
 *
 * This is useful for testing initial state, since there's no way to access that
 * directly from the slice.
 *
 * Also note that isolating the `require`s is needed so that the things we fake
 * on local storage are reset for each test. This was attempted in other ways,
 * such as calling `jest.resetModules`, or using Jest mocks, but for one reason
 * or another, this was the only reliable way of making it work.
 */
function setUpStore(storedAuthState?: AuthState): any {
  let storeModule: any;

  jest.isolateModules(() => {
    const authStorage = require('features/auth/authLocalStorage');

    authStorage.getAuthState = () => storedAuthState;

    storeModule = require('app/redux');
  });

  return storeModule.store;
}
