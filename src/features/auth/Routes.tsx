import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActivateAccountPage } from './pages/ActivateAccountPage';
import { ConfirmChangeEmailPage } from '../user-profile/pages/ConfirmChangeEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SignUpPage } from './pages/SignUpPage';

export const AuthRoutes: FC = () => (
  <Routes>
    <Route path='/login' element={<LogInPage />} />
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/activate-account/:uid/:token' element={<ActivateAccountPage />} />
    <Route path='/confirm-change-email/:uid/:token' element={<ConfirmChangeEmailPage />} />
    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
    <Route path='/reset-password/:uid/:token' element={<ResetPasswordPage />} />
  </Routes>
);
