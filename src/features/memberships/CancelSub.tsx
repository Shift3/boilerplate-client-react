import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';
import { useConfirmationModal } from 'features/confirmation-modal';

const CreditCard = styled.div`
  padding: 1rem;
  background: ${props => props.theme.card.backgroundColor};
  font-size: 1.4rem;
  color: ${props => props.theme.textColor};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  width: 25rem;

  small {
    margin-top: 3rem;
    display: block;
    color: #999;
  }

  span {
    display: block;
    font-family: monospace;
  }

  img {
    width: 96px;
  }

  .X {
    width: 48px;
    height: 48px;
    background: red;
    position: absolute;
    top: -24px;
    right: -24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
  }
`;

const CreditCardHeader = styled.div`
  display: flex;
  align-items: center;
  & > div {
    flex: 1;
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

  /* TODO: Cancel will pop up a confirm modal,
      and then call the POST /subscriptions/cancel/
      endpoint if the user chooses to continue. */

  const handleCancelSub = () => {
    openModal({
      message: 'Are you sure you want to cancel your current subscription?',
      confirmButtonLabel: 'Yes',
      declineButtonLabel: 'Go Back',
      // onConfirm: async () => (),
      // onDecline:  () => (),
    });
  };

  return (
    <>
      <h1>Current Plan</h1>
      <div>Your Plan: {data?.activeSubscription.plan.product}</div>
      <div>Amount: {data?.activeSubscription.plan.amount}</div>
      <p>Renews: {data?.activeSubscription.currentPeriodEnd.toString()}</p>
      <div className=''>
        <Button onClick={handleCancelSub}>Cancel Plan</Button>
        <Link to='/memberships/change-plan'>Change Plan</Link>
        {/* TODO: Change plan, we still need to figure out, so don't touch yet. */}
      </div>

      <hr />

      <h1>Payment Methods</h1>

      <Row>
        <Col xs={12} sm={12} md={12} xl={6}>
          <CreditCard>
            <CreditCardHeader>
              <div>Credit Card</div>
              <img
                src='https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png'
                alt='Credit Card'
              />
            </CreditCardHeader>
            {/* Image tag that has the VISA logo or Mastercard or w/e */}
            <div>
              <small>Card Number</small>
              <span>•••• •••• •••• 4242</span>
            </div>

            {/* TODO: don't allow deletion if it's their only card and they have an active subscription. */}
            <div className='X'>X</div>
          </CreditCard>
        </Col>
      </Row>

      <hr />

      <h1>Billing History</h1>

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
    </>
  );
};
