import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCancelActiveSubscriptionMutation, Subscription } from 'common/api/paymentsApi';
import { FC } from 'react';
import { Alert, Badge, Button, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Moment from 'react-moment';
import { showSuccessMessage } from 'common/services/notification';
import { useModal } from 'react-modal-hook';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';

const CreditCard = styled.div`
  padding: 1rem;
  margin: 0.6rem;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  border-radius: ${props => props.theme.borderRadius};
  position: relative;

  small {
    display: block;
    color: #999;
  }

  & > div > div {
    flex: 1;
  }

  span {
    display: block;
    font-family: monospace;
  }

  img {
    width: 48px;
    height: auto;
  }

  path {
    fill: ${props => props.theme.textColor};
  }
`;

export const IsActive: FC<{
  subscription: Subscription;
  onCancel: () => void;
}> = ({ subscription, onCancel }) => {
  const [cancelActiveSubscription] = useCancelActiveSubscriptionMutation();

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => {
    const onConfirm = async () => {
      await cancelActiveSubscription();
      onCancel();
      showSuccessMessage('Subscription has been cancelled. You will no longer be billed.');
    };

    return (
      <SimpleConfirmModal
        title='Cancel Subscription'
        show={open}
        onCancel={hideModal}
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
                <Moment>{subscription.activeSubscription.currentPeriodEnd}</Moment>
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
        <Card>
          <Card.Body>
            <div className='mb-3 d-flex align-items-center'>
              <h4 className='flex-fill m-0'>Current Plan</h4>
              <a className='text-danger' href='#' onClick={() => showModal()}>
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
      </Col>
      <Col className='mb-3' md={12} xl={6}>
        <Card>
          {/* TODO: Check that at least one card is on file before allowing user to delete card/s. */}
          <Card.Body>
            <h4>Payment Methods</h4>

            {subscription.paymentMethods.map(paymentMethod => (
              <CreditCard>
                <div className='d-flex align-items-center'>
                  {/* TODO: get all the card images not just visa and mastercard */}
                  <img className='me-3' width={64} src={`/cards/${paymentMethod.card.brand}.png`} alt='Credit Card' />
                  <div>
                    <span>•••• •••• •••• {paymentMethod.card.last4}</span>
                    <small>
                      {paymentMethod.card.expMonth}/{paymentMethod.card.expYear.toString().slice(2)}
                    </small>
                  </div>
                  {/* TODO: Add `edit credit card` functionality */}
                  <Button className='ms-3' variant='link'>
                    <FontAwesomeIcon size='1x' icon='ellipsis-vertical' />
                  </Button>
                </div>
              </CreditCard>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
