import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { SecondaryButton } from 'common/styles/button';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuthState } from '../authLocalStorage';
import { authSlice } from '../authSlice';

export const AccountProblemPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutLocally = () => {
    dispatch(authSlice.actions.userLoggedOut());
    clearAuthState();
    navigate('/auth/login', { replace: true });
  };

  return (
    <FrontPageLayout>
      <Title>There is a problem with your account.</Title>
      <p className='text-muted'>Please contact the administrators of this site.</p>
      <div className='mt-2'>
        <SecondaryButton onClick={() => logoutLocally()}>Log In</SecondaryButton>
      </div>
    </FrontPageLayout>
  );
};
