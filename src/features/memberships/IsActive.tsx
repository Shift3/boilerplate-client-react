import { useCancelActiveSubscriptionMutation, Subscription } from 'common/api/paymentsApi';
import { FC } from 'react';
import { Alert, Badge, Card, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { showSuccessMessage } from 'common/services/notification';
import { useModal } from 'react-modal-hook';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import { CardManagement } from './CardManagement';

export const IsActive: FC<{
  subscription: Subscription;
  refetch: () => void;
  onCancel: () => void;
}> = ({ subscription, onCancel, refetch }) => {
  const [cancelActiveSubscription] = useCancelActiveSubscriptionMutation();

  const [showCancelModal, hideCancelModal] = useModal(({ in: open, onExited }) => {
    const onConfirm = async () => {
      await cancelActiveSubscription();
      onCancel();
      showSuccessMessage('Subscription has been cancelled. You will no longer be billed.');
    };

    return (
      <SimpleConfirmModal
        title='Cancel Subscription'
        show={open}
        onCancel={hideCancelModal}
        onConfirm={onConfirm}
        cancelLabel='Keep My Subscription'
        confirmLabel='Cancel Subscription'
        confirmIcon='trash-alt'
        confirmVariant='danger'
        onExited={onExited}
        body={
          <>
            <p>Are you sure you want to cancel your active subscription?</p>
            <Alert variant='info'>
              Note that your subscription will remain active until{' '}
              <b>
                <Moment format='MMM Do YYYY'>{subscription.activeSubscription.currentPeriodEnd}</Moment>
              </b>{' '}
              after which you will no longer be billed, and your subscription benefits will end.
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
              <h4 className='flex-fill m-0'>Current Plan</h4>
              <a className='text-danger' href='#' onClick={() => showCancelModal()}>
                <b>Cancel</b>
              </a>
            </div>
            <div className='mb-2'>
              {subscription.activeSubscription.plan.product} <Badge bg='success'>Active</Badge>
            </div>
            <p className='text-muted'>
              Your subscription is currently active. You will be billed ${subscription.activeSubscription.plan.amount}{' '}
              on <Moment format='MMM D, YYYY'>{subscription.activeSubscription.currentPeriodEnd}</Moment>
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
                    {subscription.billingHistory.map(({ amount, date, description }) => (
                      <tr key={date}>
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
            </Card.Body>
          </Card>
        ) : null}
      </Col>

      <Col className='mb-3' md={12} xl={6}>
        <CardManagement refetch={refetch} subscription={subscription} />
      </Col>
    </Row>
  );
};
