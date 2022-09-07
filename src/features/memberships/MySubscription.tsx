import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCancelActiveSubscriptionMutation, useGetMySubscriptionQuery, Subscription } from 'common/api/paymentsApi';
import { useConfirmationModal } from 'features/confirmation-modal';
import { useCallback } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
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
/*
  TODO: figure out if the subscription is one of the following:
    1. - ACTIVE
   ** If `activeSubscription` then ...

    2. - ACTIVE && cancelled_on
   **  If `activeSubscription && cancelledAt > today's date` then ...

    3. - Canceled and no longer active.
   ** If `!activeSubscription` then ...

    Currently we are display the "Active" case.
  */

export const MySubscription = () => {
  const { data } = useGetMySubscriptionQuery();
  const { openModal } = useConfirmationModal();
  const [cancelActiveSubscription] = useCancelActiveSubscriptionMutation();

  const handleCancelSub = useCallback(
    (subscription: Subscription) => {
      const message = 'Would you like to cancel your current subscription?';

      const onConfirm = async () => {
        await cancelActiveSubscription({ id: subscription.activeSubscription.id }).unwrap();
      };

      openModal({
        message,
        confirmButtonLabel: 'Continue',
        declineButtonLabel: 'Go Back',
        onConfirm,
      });
    },
    [openModal, cancelActiveSubscription],
  );

  return (
    <Container>
      <Row>
        <Col className='mb-3' md={12} xl={6}>
          <Card>
            <Card.Body>
              <div className='mb-3 d-flex align-items-center'>
                <h4 className='flex-fill m-0'>Current Plan</h4>
                <a
                  className='text-danger'
                  href='#'
                  onClick={() => {
                    handleCancelSub(data?.activeSubscription.id);
                  }}
                >
                  Cancel
                </a>
              </div>
              <div className='mb-2'>
                Your Plan: {data?.activeSubscription.plan.product}
                <br />
                <Link to='/memberships/change-plan'>Change Plan</Link>
              </div>
              <div>Amount: ${data?.activeSubscription.plan.amount}</div>
              <p>
                Renews: <Moment format='MMM D, YYYY'>{data?.activeSubscription.currentPeriodEnd}</Moment>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3' md={12} xl={6}>
          <Card>
            {/* TODO: Will need to fetch the credit cards on file, and then map through to display.
              Also check that at least one card is on file before allowing user to delete card/s. */}
            <Card.Body>
              <h4>Payment Methods</h4>
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

        <Col className='mt-3'>
          <h4>Billing History</h4>

          <table className='table'>
            <tbody>
              {data?.billingHistory.map(({ amount, date, description }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={i}>
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
    </Container>
  );
};
