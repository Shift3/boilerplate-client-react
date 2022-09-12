import { useGetSubscriptionQuery } from 'common/api/paymentsApi';
import { LoadingSpinner } from 'common/components/LoadingSpinner';
import { showErrorMessage, showSuccessMessage } from 'common/services/notification';
import { SmallContainer } from 'common/styles/page';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const ConfirmSubscription = () => {
  const { id } = useParams();
  const [pollingInterval] = useState(5000);
  const { data } = useGetSubscriptionQuery(id!, {
    pollingInterval,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (data.status === 'active') {
        navigate(`/user/profile?tab=subscription`, { replace: true });
        showSuccessMessage('Subscription has been confirmed. Welcome!');
      }

      if (data.status === 'unpaid' || data.status === 'canceled') {
        navigate(`/user/profile?tab=subscription`, { replace: true });
        showErrorMessage('Something went wrong, please try again later.');
      }
    }
  }, [data, navigate]);

  return (
    <SmallContainer>
      <Card>
        <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
          <p className='lead'>Confirming your payment... Do not navigate away from this page.</p>
          <LoadingSpinner />
        </Card.Body>
      </Card>
    </SmallContainer>
  );
};
