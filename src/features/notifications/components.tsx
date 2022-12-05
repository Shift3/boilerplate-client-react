import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButton } from 'common/components/LoadingButton';
import { AppNotification } from 'common/models/notifications';
import { FC, PropsWithChildren } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useMarkRead } from './hooks/useMarkRead';

const BaseNotification: FC<
  PropsWithChildren<{
    title: string;
    notification: AppNotification;
  }>
> = ({ title, notification, children }) => {
  const { markRead, isLoading } = useMarkRead();

  return (
    <div key={notification.id}>
      <div className='d-flex'>
        <div className='flex-fill'>
          <h1 className='fs-5 mb-0'>{title}</h1>
          {children}
        </div>

        {!notification.read && (
          <div className='d-flex align-items-center justify-content-center'>
            <LoadingButton loading={isLoading} variant='default' onClick={() => markRead(notification)}>
              {!isLoading && <FontAwesomeIcon icon={faCheck} />}
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

export const AgentCreatedNotification: FC<{
  notification: AppNotification;
}> = ({ notification }) => {
  const { markRead } = useMarkRead();

  interface AgentCreatedData {
    userId: string;
    agentId: number;
    userName: string;
    agentName: string;
  }

  const isAgentCreatedNotificationData = (data: unknown): data is AgentCreatedData => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(data as any).userName;
  };

  const { data } = notification;
  if (!isAgentCreatedNotificationData(data)) return <></>;

  return (
    <BaseNotification title='New Agent Created' notification={notification}>
      <p className='p-0 m-0 mb-2'>
        <Moment className='fw-normal fs-6 text-muted' fromNow>
          {notification.created}
        </Moment>
      </p>
      <Link to={`/users/update-user/${data.userId}`} onClick={() => markRead(notification)}>
        {data.userName}
      </Link>{' '}
      created a new agent named{' '}
      <Link to={`/agents/update-agent/${data.agentId}`} onClick={() => markRead(notification)}>
        {data.agentName}
      </Link>
    </BaseNotification>
  );
};

export const UserAcceptedInvitationNotification: FC<{
  notification: AppNotification;
}> = ({ notification }) => {
  const { markRead } = useMarkRead();

  interface UserAcceptedInvitationData {
    userId: string;
    userName: string;
  }

  const isUserAcceptedInvitationNotificationData = (data: unknown): data is UserAcceptedInvitationData => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(data as any).userName;
  };

  const { data } = notification;
  if (!isUserAcceptedInvitationNotificationData(data)) return <></>;

  return (
    <BaseNotification title='User Accepted Invitation' notification={notification}>
      <p className='p-0 m-0 mb-2'>
        <Moment className='fw-normal fs-6 text-muted' fromNow>
          {notification.created}
        </Moment>
      </p>
      <Link to={`/users/update-user/${data.userId}`} onClick={() => markRead(notification)}>
        {data.userName}
      </Link>{' '}
      accepter their invitation.{' '}
    </BaseNotification>
  );
};
