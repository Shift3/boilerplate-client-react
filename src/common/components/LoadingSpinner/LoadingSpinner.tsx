import { FC } from 'react';
import { Spinner, SpinnerProps } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const LoadingSpinner: FC<Partial<SpinnerProps>> = ({
  animation = 'border',
  variant = 'primary',
  role = 'status',
  ...rest
}) => {
  const { t } = useTranslation('common');

  return (
    <Spinner id='loading-spinner' animation={animation} variant={variant} role={role} {...rest}>
      <span className='visually-hidden'>{t('loading')}</span>
    </Spinner>
  );
};
