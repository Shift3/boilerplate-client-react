import { AppNotification } from 'common/models/notifications';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useMarkRead } from './hooks/useMarkRead';
import { formatDistance, parseISO } from 'date-fns';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';

const BaseNotificationStyles = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const BaseNotification: FC<
  PropsWithChildren<{
    title: string;
    notification: AppNotification;
  }>
> = ({ title, notification, children }) => {
  return (
    <BaseNotificationStyles key={notification.id}>
      <div className='d-flex'>
        <div className='flex-fill'>
          <h1 className='fs-5 mb-0'>{title}</h1>
          {children}
        </div>
      </div>
    </BaseNotificationStyles>
  );
};

export const FarmCreatedNotification: FC<{
  notification: AppNotification;
}> = ({ notification }) => {
  const { t } = useTranslation(['translation', 'common']);
  const { markRead } = useMarkRead();

  interface FarmCreatedData {
    userId: string;
    farmId: number;
    userName: string;
    farmName: string;
  }

  const isFarmCreatedNotificationData = (data: unknown): data is FarmCreatedData => {
    return !!(data as FarmCreatedData).userName;
  };

  const { data } = notification;
  if (!isFarmCreatedNotificationData(data)) return <></>;

  return (
    <BaseNotification title={t('notifications.newFarmCreated')} notification={notification}>
      <p className='p-0 m-0 mb-2'>
        <span className='fw-normal fs-6 text-muted'>
          {formatDistance(new Date(), parseISO(notification.created))} ago
        </span>
      </p>
      <Trans i18nKey="notifications.farmCreatedBy" values={{ userName: data.userName, farmName: data.farmName }}>
        <Link to={`/users/update-user/${data.userId}`} onClick={() => markRead(notification)}>
          {data.userName}
        </Link>
        created a new Farm named
        <Link to={`/farms/update-farm/${data.farmId}`} onClick={() => markRead(notification)}>
          {data.farmName}
        </Link>
      </Trans>
    </BaseNotification>
  );
};
