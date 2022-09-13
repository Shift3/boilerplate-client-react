import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Checkout } from 'features/payments/Checkout';
import moment from 'moment';
import { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { IsActive } from './IsActive';
import { IsCancelled } from './IsCancelled';

type SubscriptionStatus = null | 'active' | 'cancelled' | 'cancelled_but_active';

export const MySubscription = () => {
  const { data: subscription, isLoading, refetch } = useGetMySubscriptionQuery();
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
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      {subscription && !isLoading ? (
        <>
          {status === 'active' ? <IsActive subscription={subscription} onCancel={() => refetch()} /> : null}

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

          {subscription.billingHistory.length > 0 ? (
            <Row>
              <Col className='mt-3'>
                <h4>Billing History</h4>

                <table className='table'>
                  <tbody>
                    {subscription.billingHistory.map(({ amount, date, description }) => (
                      <tr>
                        <td key={date}>
                          <Moment format='MMM D, YYYY'>{date}</Moment>
                        </td>
                        <td key={description}>{description}</td>
                        <td key={amount}>{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          ) : null}
        </>
      ) : null}
    </WithLoadingOverlay>
  );
};
