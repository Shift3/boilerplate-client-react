import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ForgotPassword = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  padding-top: 18px;
`;

export const ForgotPasswordLink: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  return (
    <ForgotPassword>
      <Link to='/auth/forgot-password'>{t('userProfile.forgotPassword')}</Link>
    </ForgotPassword>
  );
};
