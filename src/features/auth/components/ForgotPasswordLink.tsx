import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ForgotPassword = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  padding-top: 18px;
`;

export const ForgotPasswordLink: FC = () => (
  <ForgotPassword>
    <Link to='/auth/forgot-password'>Forgot Password?</Link>
  </ForgotPassword>
);
