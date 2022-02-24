import { ErrorBoundary } from '@sentry/react';
import { Routes as AgentRoutes } from 'features/agent-dashboard/Routes';
import { Routes as AuthRoutes } from 'features/auth/Routes';
import { PrivateRoute } from 'features/auth/components/privateRoute.tsx';
import { Routes as UserRoutes } from 'features/user-dashboard/Routes';
import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import AppTheme from 'utils/styleValues';
import { HolyGrailContent, HolyGrailLayout } from 'common/components/HolyGrailLayout';
import { NotificationContainer } from 'common/components/Notification';
import { NotFoundView } from 'common/components/NotFound';
import { UpdateUserProfilePage } from 'features/auth/pages/UpdateUserProfilePage';
import { ConfirmationModal } from 'features/confirmation-modal';
import { Alert } from 'react-bootstrap';
import { BitwiseNavbar } from 'features/navbar';
import { environment } from 'environment';

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
          }

          ${HolyGrailContent} {
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
        <Switch>
          <Route path='/auth' component={AuthRoutes} />
          <PrivateRoute exact path='/user/profile/:id'>
            <HolyGrailLayout>
              <UpdateUserProfilePage />
            </HolyGrailLayout>
          </PrivateRoute>
          <PrivateRoute path='/agents' component={AgentRoutes} />
          <PrivateRoute path='/users' component={UserRoutes} requiredRoles={['Admin', 'Super Administrator']} />
          <PrivateRoute exact path='/'>
            <Redirect to='/agents' />
          </PrivateRoute>
          <Route component={NotFoundView} />
        </Switch>
      </BannerWrapper>
    </ThemeProvider>
    <GlobalStyle />
  </ErrorBoundary>
);
