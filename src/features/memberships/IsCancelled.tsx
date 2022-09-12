import { Subscription, useReactivateSubscriptionMutation } from 'common/api/paymentsApi';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { showSuccessMessage } from 'common/services/notification';
import { format, parseISO } from 'date-fns';
import { FC, useMemo } from 'react';
import { Alert, Badge, Card, Col, Row } from 'react-bootstrap';
import { useModal } from 'react-modal-hook';
import { CardManagement } from './CardManagement';

export const IsCancelled: FC<{
  subscription: Subscription;
  onCancel: () => void;
  refetch: () => void;
}> = ({ subscription, onCancel, refetch }) => {
  const [reactivateSubscription] = useReactivateSubscriptionMutation();

  const currentPeriodEnd = useMemo(() => {
    return format(parseISO(subscription.activeSubscription.currentPeriodEnd), 'MMM Do YYYY');
  }, [subscription.activeSubscription.currentPeriodEnd]);

  const [showCancelModal, hideCancelModal] = useModal(({ in: open, onExited }) => {
    const onConfirm = async () => {
      await reactivateSubscription();
      onCancel();
      showSuccessMessage('Subscription has been reactivated!');
    };

    return (
      <SimpleConfirmModal
        title='Reactivate Subscription'
        show={open}
        onCancel={hideCancelModal}
        onConfirm={onConfirm}
        cancelLabel='Stay Unsubscribed'
        confirmLabel='Reactivate Subscription'
        confirmIcon='refresh'
        confirmVariant='success'
        onExited={onExited}
        body={
          <>
            <p>Welcome back! Reactivating your subscription will resume monthly billing.</p>
            <Alert variant='info'>
              After reactivating your subscription, your next charge will be on <b>{currentPeriodEnd}</b>
            </Alert>
          </>
        }
      />
    );
  });

  return (
    <Row>
      <Col className='mb-3' md={12} xl={6}>
        <Card className='mb-3'>
          <Card.Body>
            <div className='mb-3 d-flex align-items-center'>
              <h4 className='flex-fill m-0'>Subscription</h4>
              <a className='btn btn-sm btn-link' href='#' onClick={() => showCancelModal()}>
                <b>Reactivate</b>
              </a>
            </div>
            <div className='mb-2'>
              {subscription.activeSubscription.plan.product.name} <Badge bg='danger'>Cancelled</Badge>
            </div>
            <p className='text-muted'>
              Your subscription is cancelled, but will remain active until <b>{currentPeriodEnd}.</b> If you would like
              to resume your subscription, click the <em>Reactivate</em> button above.
            </p>
          </Card.Body>
        </Card>
        {subscription.billingHistory.length > 0 ? (
          <Card>
            <Card.Body>
              <Col className='mt-2'>
                <h4>Billing History</h4>
                <table className='table'>
                  <tbody>
                    {subscription.billingHistory.map(({ amount, date, description }, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <tr key={i}>
                        <td key={date}>{format(parseISO(date), 'MMM D, YYYY')}</td>
                        <td key={description}>{description}</td>
                        <td key={amount}>{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Card.Body>
          </Card>
        ) : null}
      </Col>

      <Col className='mb-3' md={12} xl={6}>
        <CardManagement refetch={() => refetch()} subscription={subscription} />
      </Col>
    </Row>
  );
};
