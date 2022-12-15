import { PageHeader, SmallContainer } from 'common/styles/page';
import { ProfileNav } from 'features/user-profile/pages/UserProfilePage';
import { FC, useContext } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ReadNotifications } from '../components/ReadNotifications';
import { UnreadNotifications } from '../components/UnreadNotifications';
import { NotificationContext } from '../context';

export const NotificationListView: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useContext(NotificationContext);

  return (
    <SmallContainer>
      <PageHeader>
        <div>
          <h1>
            <Trans i18nKey='notifications.title'>My Notifications</Trans>
          </h1>
          <p>
            <Trans i18nKey='notification.subheading'>Notifications that have been sent to me.</Trans>
          </p>
        </div>
      </PageHeader>

      <Row>
        <Col md={3}>
          <ProfileNav className='flex-column'>
            <ProfileNav.Link
              onClick={() => navigate('/notifications')}
              className={location.pathname === '/notifications' ? 'active' : ''}
            >
              <div className='d-flex align-items-center'>
                <div className='flex-fill'>Unread</div>
                {count > 0 && (
                  <Badge pill bg='danger'>
                    {count}
                  </Badge>
                )}
              </div>
            </ProfileNav.Link>

            <ProfileNav.Link
              onClick={() => navigate('/notifications/read')}
              className={location.pathname === '/notifications/read' ? 'active' : ''}
            >
              Read
            </ProfileNav.Link>
          </ProfileNav>
        </Col>

        <Col>
          <Routes>
            <Route path='/' element={<UnreadNotifications />} />
            <Route path='/read' element={<ReadNotifications />} />
          </Routes>
        </Col>
      </Row>
    </SmallContainer>
  );
};
