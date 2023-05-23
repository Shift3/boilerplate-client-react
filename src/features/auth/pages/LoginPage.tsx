import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { useLogin } from 'features/auth/hooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FormData, LogInForm } from '../components/LoginForm';
import { useTranslation } from 'react-i18next';

export const LogInPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const { login } = useLogin();

  const onSubmit = async (credentials: FormData) => {
    await login(credentials);
  };

  return (
    <FrontPageLayout>
      <Title>{t('loginPage.memberLogIn')}</Title>
      <p className='text-muted'>{t('loginPage.memberLogInDescription')}</p>
      <LogInForm onSubmit={onSubmit} />
      <div className='mt-2'>
        <small>
          {t('loginPage.dontHaveAnAccount')} <Link to='/auth/signup'>{t('loginPage.registerForAccount')}</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
