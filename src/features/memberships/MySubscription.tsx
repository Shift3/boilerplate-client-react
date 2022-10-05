import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Checkout } from 'features/memberships/Checkout';
import moment from 'moment';
import { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { IsActive } from './IsActive';
import { IsCancelled } from './IsCancelled';

type SubscriptionStatus = null | 'active' | 'cancelled' | 'cancelled_but_active';

export const MySubscription = () => {
  const { data: subscription, isLoading, refetch } = useGetMySubscriptionQuery();

  /*
  TODO(justin): Because of the asynchronousness of webhooks, we need to reconsider
  how to do this refetch stuff, because it's not going to work when the webhook
  fires after the request (which will be most cases)
  */

  const status: SubscriptionStatus = useMemo(() => {
    if (subscription?.activeSubscription?.canceledAt) {
      if (moment().isBefore(subscription.activeSubscription.currentPeriodEnd)) {
        return 'cancelled_but_active';
      }
      return 'cancelled';
    }

    if (subscription?.activeSubscription) {
      return 'active';
    }

    return null;
  }, [subscription]);

  return (
    <WithLoadingOverlay isLoading={isLoading}>
      {subscription && !isLoading ? (
        <>
          {status === 'active' ? (
            <IsActive refetch={refetch} subscription={subscription} onCancel={() => refetch()} />
          ) : null}

          {status === 'cancelled_but_active' ? (
            <IsCancelled subscription={subscription} onCancel={() => refetch()} />
          ) : null}

          {status === 'cancelled' || status === null ? (
            <Row>
              <Col md='5'>
                <h5>Select your plan</h5>
                <p className='text-muted'>
                  You are currently not subscribed. Get access to the features of this application by selecting a plan
                  and subscribing to it!
                </p>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Checkout onComplete={() => refetch()} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : null}
        </>
      ) : null}
    </WithLoadingOverlay>
  );
};
