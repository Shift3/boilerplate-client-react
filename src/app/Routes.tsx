import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Role } from 'common/models';
import { FarmListView, CreateFarmView, UpdateFarmView } from 'features/farm-dashboard';
import { RequireAuth } from 'features/auth';
import { useAuth } from 'features/auth/hooks';
import { ActivateAccountPage } from 'features/auth/pages/ActivateAccountPage';
import { ForgotPasswordPage } from 'features/auth/pages/ForgotPasswordPage';
import { LogInPage } from 'features/auth/pages/LoginPage';
import { ResetPasswordPage } from 'features/auth/pages/ResetPasswordPage';
import { SignUpPage } from 'features/auth/pages/SignUpPage';
import { ReadNotifications } from 'features/notifications/components/ReadNotifications';
import { UnreadNotifications } from 'features/notifications/components/UnreadNotifications';
import { NotificationListView } from 'features/notifications/pages/NotificationListView';
import { CreateUserView, UpdateUserView, UserListView } from 'features/user-dashboard';
import { AdminHomePage } from 'features/user-dashboard/pages/AdminHomePage';
import { EditorHomePage } from 'features/user-dashboard/pages/EditorHomePage';
import { UserHomePage } from 'features/user-dashboard/pages/UserHomePage';
import { ConfirmChangeEmailPage } from 'features/user-profile/pages/ConfirmChangeEmailPage';
import { UserProfilePage } from 'features/user-profile/pages/UserProfilePage';
import { useRoutes } from 'react-router-dom';

export const Routes = () => {
    const { user } = useAuth();
    const element = useRoutes([
        {
            path: '/auth/*',
            children: [
                { path: 'login', element: <LogInPage /> },
                { path: 'signup', element: <SignUpPage /> },
                { path: 'activate-account/:uid/:token', element: <ActivateAccountPage /> },
                { path: 'confirm-change-email/:uid/:token', element: <ConfirmChangeEmailPage /> },
                { path: 'forgot-password', element: <ForgotPasswordPage /> },
                { path: 'reset-password/:uid/:token', element: <ResetPasswordPage /> },
            ],
        },
        {
            path: '/user/profile/:id',
            element: (
                <RequireAuth>
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                </RequireAuth>
            ),
        },
        {
            path: '/agents/*',
            children: [
                { path: '', element: <FarmListView /> },
                { path: 'create-agent', element: <CreateFarmView /> },
                { path: 'update-agent/:id', element: <UpdateFarmView /> },
                { path: '*', element: <NotFoundView /> },
            ].map(item => ({
                ...item,
                element: (
                    <RequireAuth>
                        <Layout>{item.element}</Layout>
                    </RequireAuth>
                ),
            })),
        },
        {
            path: '/users/*',
            children: [
                { path: '', element: <UserListView /> },
                { path: 'create-user', element: <CreateUserView /> },
                { path: 'update-user/:id', element: <UpdateUserView /> },
                { path: '*', element: <NotFoundView /> },
            ].map(item => ({
                ...item,
                element: (
                    <RequireAuth>
                        <Layout>{item.element}</Layout>
                    </RequireAuth>
                ),
            })),
        },
        {
            path: '/notifications/*',
            children: [
                { path: '', element: <UnreadNotifications /> },
                { path: 'read', element: <ReadNotifications /> },
            ].map(item => ({
                ...item,
                element: (
                    <RequireAuth>
                        <Layout>
                            <NotificationListView>
                                {item.element}
                            </NotificationListView>
                        </Layout>
                    </RequireAuth>
                ),
            })),
        },
        {
            path: '/',
            children: [
                {
                    path: '', element:
                        (<RequireAuth allowedRoles={[Role.ADMIN, Role.EDITOR, Role.USER]}>
                            <Layout>
                                {
                                    user && {
                                        ADMIN: <AdminHomePage />,
                                        EDITOR: <EditorHomePage />,
                                        USER: <UserHomePage />,
                                    }[user.role]
                                }
                            </Layout>
                        </RequireAuth>)
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundView />,
        },
    ]);

    return element;
};
