import { Notification } from 'common/models/notification';
import { FC } from 'react';
import { BaseNotification } from './BaseNotification';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMarkReadMutation } from 'common/api/notificationApi';
import { useNotifications } from '../hooks/useNotifications';

interface AgentCreation {
  userId: string;
  agentId: number;
  agentName: string;
  userName: string;
}

const AgentCreatedNotification: FC<{
  notification: Notification;
}> = ({ notification }) => {
  const data = notification.data as AgentCreation;
  const [markRead] = useMarkReadMutation();
  const { notificationDispatch } = useNotifications();

  const handleMarkReadOperation = async () => {
    await markRead(notification.id);
    notificationDispatch({ type: 'reset' });
  };

  return (
    <BaseNotification
      title='New Agent Created'
      body={
        <Card.Text>
          <Link to={`/users/update-user/${data.userId}`} onClick={handleMarkReadOperation}>
            <strong>{data.userName}</strong>
          </Link>{' '}
          created a new agent named{' '}
          <Link to={`/agents/update-agent/${data.agentId}`} onClick={handleMarkReadOperation}>
            <strong>{data.agentName}</strong>
          </Link>
        </Card.Text>
      }
      notification={notification}
    />
  );
};

export default AgentCreatedNotification;
