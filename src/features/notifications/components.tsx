import { AppNotification } from 'common/models/notifications';
import { FC } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const AgentCreatedNotification: FC<{
  notification: AppNotification;
}> = ({ notification }) => {
  interface AgentCreatedData {
    userId: string;
    agentId: number;
    userName: string;
    agentName: string;
  }

  const isAgentCreatedNotificationData = (data: unknown): data is AgentCreatedData => {
    return !!(data as any).userName;
  };

  const { data } = notification;
  console.log(data);
  if (!isAgentCreatedNotificationData(data)) return <></>;

  return (
    <div key={notification.id}>
      <h1 className='fs-5 mb-0'>New Agent Created</h1>
      <p className='p-0 m-0 mb-2'>
        <Moment className='fw-normal fs-6 text-muted' fromNow>
          {notification.created}
        </Moment>
      </p>
      <Link to={`/users/update-user/${data.userId}`}>{data.userName}</Link> created a new agent named{' '}
      <Link to={`/agents/update-agent/${data.agentId}`}>{data.agentName}</Link>
    </div>
  );
};
