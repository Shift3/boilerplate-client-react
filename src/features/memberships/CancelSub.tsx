import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { useConfirmationModal } from 'features/confirmation-modal';
import { Button, Card, Col, Row } from 'react-bootstrap';
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

// type SubscriptionProps = {
//   active_subscription: bool;
//   canceled_at: string;
//   active_until: string;
// };

// active_subscription: bool;
// canceled_at: string;
// active_until: string;

// TODO: move and rename this component.
// Rename to: MySubscriptionPage or something like that.
// Move to: a new tab on the user profile page, called "Subscription"
export const CancelSub = () => {
  const { data } = useGetMySubscriptionQuery();
  const { openModal } = useConfirmationModal();

  const activeSubscription = data?.activeSubscription;
  const currentPeriodEnd = data?.activeSubscription.currentPeriodEnd;
  const cancelledAt = data?.activeSubscription.canceledAt;

  /*
        TODO: figure out if the subscription is one of the following:
    1. - Active
   ** If `activeSubscription === true`
          then ...

    2. - Canceled but still active until a specific date.
   **  If `activeSubscription === true && currentPeriodEnd > today's date`
          then ...

    3. - Canceled and no longer active.
   ** If `!activeSubscription
          then ...

          Branch on these here, and display different things based on which
          of these statuses the subscription is in.

          Currently we are display the "Active" case.
   */
  const handleCancelSub = () => {
    openModal();
  };

  return (
    <Row>
      <Col className='mb-3' md={12} xl={6}>
        <Card>
          <Card.Body>
            <div className='mb-3 d-flex align-items-center'>
              <h4 className='flex-fill m-0'>Current Plan</h4>
              <a className='text-danger' href='#'>
                Cancel
              </a>
            </div>
            <div className='mb-2'>
              Your Plan: {data?.activeSubscription.plan.product}
              <br />
              <Link to='/memberships/change-plan'>Change...</Link>
            </div>
            <div>Amount: ${data?.activeSubscription.plan.amount}</div>
            <p>
              Renews: <Moment format='MMM D, YYYY'>{data?.activeSubscription.currentPeriodEnd}</Moment>
            </p>
            <div className=''></div>
          </Card.Body>
        </Card>
      </Col>

      <Col className='mb-3' md={12} xl={6}>
        <Card>
          <Card.Body>
            <h4>Payment Methods</h4>

            <CreditCard>
              <div className='d-flex align-items-center'>
                <img
                  className='me-3'
                  src='https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png'
                  alt='Credit Card'
                />
                {/* Image tag that has the VISA logo or Mastercard or w/e */}
                <div>
                  <span>•••• •••• •••• 4242</span>
                  <small>4/27</small>
                </div>

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
            {data?.billingHistory.map(row => (
              <tr>
                <td>
                  <Moment format='MMM D, YYYY'>{row.date}</Moment>
                </td>
                <td>{row.description}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};
