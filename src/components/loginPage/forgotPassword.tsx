import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ForgotPassword = styled.div`
  font-size: 1.2em;
  padding-top: 18px;
`;

export const ForgotPasswordLink: FC = () => (
  <ForgotPassword>
    <Link to='/auth/forgot-password'>Forgot Password?</Link>
  </ForgotPassword>
);
