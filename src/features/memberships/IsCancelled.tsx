import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Subscription, useReactivateSubscriptionMutation } from 'common/api/paymentsApi';
import { showSuccessMessage } from 'common/services/notification';
import { FC, useCallback } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import styled from 'styled-components';

const CreditCard = styled.div`
  padding: 1rem;
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
    width: auto;
    height: 32px;
  }

  path {
    fill: ${props => props.theme.textColor};
  }
`;

export const IsCancelled: FC<{
  subscription: Subscription;
  onCancel: () => void;
}> = ({ subscription, onCancel }) => {
  // const { openModal } = useConfirmationModal();
  const [reactivateSubscription] = useReactivateSubscriptionMutation();

  const handleReactivate = useCallback(
    () => {
      const message = 'Would you like to reactivate your subscription?';

      const onConfirm = async () => {
        await reactivateSubscription();
        onCancel();
        showSuccessMessage('Subscription has been reactivated!');
      };

      // openModal({
      //   message,
      //   confirmButtonLabel: 'Continue',
      //   declineButtonLabel: 'Go Back',
      //   onConfirm,
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactivateSubscription],
  );

  return (
    <Row>
      <Col className='mb-3' md={12} xl={6}>
        <Card>
          <Card.Body>
            <div className='mb-3 d-flex align-items-center'>
              <h4 className='flex-fill m-0'>Subscription</h4>
              <a className='btn btn-sm btn-link' href='#' onClick={() => handleReactivate()}>
                <b>Reactivate</b>
              </a>
            </div>
            <div className='mb-2'>
              {subscription.activeSubscription.plan.product} <Badge bg='danger'>Cancelled</Badge>
            </div>
            <p className='text-muted'>
              Your subscription is cancelled, but will remain active until{' '}
              <b>
                <Moment format='MMM D, YYYY'>{subscription.activeSubscription.currentPeriodEnd}</Moment>.
              </b>{' '}
              If you would like to resume your subscription, click the <em>Reactivate</em> button above.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col className='mb-3' md={12} xl={6}>
        <Card>
          {/* TODO: Will need to fetch the credit cards on file, and then map through to display.
              Also check that at least one card is on file before allowing user to delete card/s. */}
          <Card.Body>
            <div className='mb-3 d-flex align-items-center'>
              <h4 className='flex-fill m-0'>Payment Methods</h4>
              <a className='btn btn-sm btn-link' href='#'>
                <b>Add</b>
              </a>
            </div>
            <CreditCard>
              <div className='d-flex align-items-center'>
                <img
                  className='me-3'
                  src='https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png'
                  alt='Credit Card'
                />
                <div>
                  <span>•••• •••• •••• 4242</span>
                  <small>4/27</small>
                </div>
                {/* TODO: Add `edit credit card` functionality */}
                <Button className='ms-3' variant='link'>
                  <FontAwesomeIcon size='1x' icon='ellipsis-vertical' />
                </Button>
              </div>
            </CreditCard>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
