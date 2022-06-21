import { Notification } from 'common/models/notification';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';

interface NotificationComponent {
  title: string;
  body: JSX.Element;
  notification: Notification;
}

export const BaseNotification: FC<NotificationComponent> = ({ title, body, notification }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>
            {title}{' '}
            <Moment className='ms-2 fw-normal fs-6 text-muted' fromNow>
              {notification.created}
            </Moment>
          </div>
        </Card.Title>
        {body}
      </Card.Body>
    </Card>
  );
};
