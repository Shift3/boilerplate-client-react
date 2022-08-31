import { AppErrorBoundary } from 'features/error-boundary/components/AppErrorBoundary';
import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Role } from 'common/models';
import { BannerContentWrapper } from 'common/styles/utilities';
import { environment } from 'environment';
import { AgentRoutes } from 'features/agent-dashboard';
import { AuthRoutes, RequireAuth } from 'features/auth';
import { ConfirmationModal } from 'features/confirmation-modal';
import { UserRoutes } from 'features/user-dashboard';
import { UpdateUserProfilePage } from 'features/user-profile/pages/UpdateUserProfilePage';
import { createContext, FC, useState, useMemo, useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import light from 'themes/light';
import dark from 'themes/dark';
import { Notification } from 'common/models/notification';

export const ThemeContext = createContext({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

export interface NotificationStateType {
  unreadNotifications: Notification[];
  readNotifications: Notification[];
  totalUnreadCount: number;
  totalReadCount: number;
  unreadMetaObject: Record<string, unknown> | null;
  readMetaObject: Record<string, unknown> | null;
  shouldLoadFirstPage: boolean;
  unreadNextCursorLink: string | null;
  readNextCursorLink: string | null;
}

const initialNotificationState = {
  unreadNotifications: [] as Notification[],
  readNotifications: [] as Notification[],
  totalUnreadCount: 0,
  totalReadCount: 0,
  unreadMetaObject: null,
  readMetaObject: null,
  shouldLoadFirstPage: true,
  unreadNextCursorLink: null,
  readNextCursorLink: null,
};

export interface NotificationAction {
  type: string;
  unreadNotifications?: Notification[];
  readNotifications?: Notification[];
  totalUnreadCount?: number;
  totalReadCount?: number;
  unreadMetaObject?: Record<string, unknown>;
  readMetaObject?: Record<string, unknown>;
  unreadNextCursorLink?: string;
  readNextCursorLink?: string;
}

export interface NotificationsContextType {
  notificationState: NotificationStateType;
  notificationDispatch: React.Dispatch<NotificationAction>;
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notificationState: initialNotificationState,
  notificationDispatch: () => null,
});

const notificationReducer = (state: NotificationStateType, action: NotificationAction) => {
  let unreadNotifications: Notification[] = [];
  let readNotifications: Notification[] = [];

  if (action.unreadNotifications) {
    unreadNotifications = action.unreadNotifications;
  }

  if (action.readNotifications) {
    readNotifications = action.readNotifications;
  }

  switch (action.type) {
    case 'reset':
      return initialNotificationState;
    case 'set all data':
      return {
        ...state,
        unreadNotifications,
        readNotifications,
        totalUnreadCount: action.totalUnreadCount ?? 0,
        totalReadCount: action.totalReadCount ?? 0,
        unreadMetaObject: action.unreadMetaObject ?? {},
        readMetaObject: action.readMetaObject ?? {},
        unreadNextCursorLink: action.unreadNextCursorLink ?? null,
        readNextCursorLink: action.readNextCursorLink ?? null,
        shouldLoadFirstPage: false,
      };
    case 'new notification':
      return {
        ...state,
        unreadNotifications: [],
        totalUnreadCount: state.totalUnreadCount + 1,
        unreadMetaObject: null,
        shouldLoadFirstPage: true,
      };
    case 'append to unread notifications':
      return {
        ...state,
        unreadNotifications: [...state.unreadNotifications, ...unreadNotifications],
        unreadMetaObject: action.unreadMetaObject ?? null,
        totalUnreadCount: action.totalUnreadCount ?? 0,
        shouldLoadFirstPage: false,
        unreadNextCursorLink: action.unreadNextCursorLink ?? null,
      };
    case 'append to read notifications':
      return {
        ...state,
        readNotifications: [...state.readNotifications, ...readNotifications],
        readMetaObject: action.readMetaObject ?? null,
        totalReadCount: action.totalReadCount ?? 0,
        shouldLoadFirstPage: false,
        readNextCursorLink: action.readNextCursorLink ?? null,
      };
    default:
      throw new Error();
  }
};

export const App: FC = () => {
  const [theme, setTheme] = useState('light');
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialNotificationState);

  const value = useMemo(() => {
    const toggle = () => {
      return theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return {
      theme,
      toggle,
    };
  }, [theme]);

  const notifications = useMemo(() => {
    return {
      notificationState,
      notificationDispatch,
    };
  }, [notificationState, notificationDispatch]);

  return (
    <AppErrorBoundary>
      <ThemeContext.Provider value={value}>
        <NotificationsContext.Provider value={notifications}>
          <ThemeProvider theme={theme === 'light' ? light : dark}>
            <GlobalStyle />
            <ConfirmationModal />
            <ToastContainer
              autoClose={5000}
              closeButton
              closeOnClick
              newestOnTop
              hideProgressBar={false}
              position={toast.POSITION.TOP_RIGHT}
              role='alert'
              theme='light'
              limit={3}
              transition={Slide}
            />

            <BannerContentWrapper bannerShowing={environment.environment === 'staging'}>
              <Routes>
                <Route path='/auth/*' element={<AuthRoutes />} />
                <Route
                  path='/user/profile/:id'
                  element={
                    <RequireAuth>
                      <Layout>
                        <UpdateUserProfilePage />
                      </Layout>
                    </RequireAuth>
                  }
                />
                <Route
                  path='/agents/*'
                  element={
                    <RequireAuth>
                      <AgentRoutes />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/users/*'
                  element={
                    <RequireAuth allowedRoles={[Role.ADMIN]}>
                      <UserRoutes />
                    </RequireAuth>
                  }
                />
                <Route path='/' element={<Navigate to='/agents' />} />
                <Route path='*' element={<NotFoundView />} />
              </Routes>
            </BannerContentWrapper>
          </ThemeProvider>
        </NotificationsContext.Provider>
      </ThemeContext.Provider>
    </AppErrorBoundary>
  );
};
