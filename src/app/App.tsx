import { ErrorBoundary } from '@sentry/react';
import { Content } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFound';
import { NotificationContainer } from 'common/components/Notification';
import { environment } from 'environment';
import { AgentRoutes } from 'features/agent-dashboard';
import { AuthRoutes, RequireAuth } from 'features/auth';
import { ConfirmationModal } from 'features/confirmation-modal';
import { BitwiseNavbar } from 'features/navbar';
import { UserRoutes } from 'features/user-dashboard';
import { UpdateUserProfilePage } from 'features/user-profile/pages/UpdateUserProfilePage';
import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { GlobalStyle } from '../GlobalStyle';

const StagingBanner = styled(Alert).attrs({
  variant: 'warning',
})`
  text-align: center;
  border-radius: 0;
  border: none;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(45deg, #fff3cd, #fff3cd 20px, #fdefc3 20px, #fdefc3 40px);
  border-bottom: 1px #dadada solid;
`;

const BannerWrapper = styled.div<{
  bannerShowing: boolean;
}>`
  ${StagingBanner} {
    display: none;
    visibility: hidden;
  }

  ${props =>
    props.bannerShowing
      ? css`
          ${StagingBanner} {
            display: block;
            visibility: visible;
          }

          ${BitwiseNavbar} {
            padding-top: 56px !important;

          ${Content} {
            padding-top: 56px;
          }
        `
      : null}
`;

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={AppTheme}>
      <ConfirmationModal />
      <NotificationContainer />
      <BannerWrapper bannerShowing={environment.environment === 'staging'}>
        <StagingBanner>
          You are currently on the <b>staging</b> server.
        </StagingBanner>
        <Routes>
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route
            path='/user/profile/:id'
            element={
              <RequireAuth>
                <UpdateUserProfilePage />
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
              <RequireAuth allowedRoles={['Admin', 'Super Administrator']}>
                <UserRoutes />
              </RequireAuth>
            }
          />
          <Route path='/' element={<Navigate to='/agents' />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </BannerWrapper>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
