import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

const CreditCard = styled.div`
  padding: 1rem;
  background: ${props => props.theme.card.backgroundColor};
  font-size: 1.4rem;
  color: ${props => props.theme.textColor};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;

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

// const subscriptionType = ????;

// TODO: move and rename this component.
// Rename to: MySubscriptionPage or something like that.
// Move to: a new tab on the user profile page, called "Subscription"
export const CancelSub = () => {
  const { data } = useGetMySubscriptionQuery();

  return (
    <>
      {/*
        TODO: figure out if the subscription is one of the following:

          - Active
          - Canceled but still active until a specific date.
          - Canceled and no longer active.

          Branch on these here, and display different things based on which
          of these statuses the subscription is in.

          Currently we are display the "Active" case.
      */}
      <h1>Current Plan</h1>

      <div>Your Plan: {data?.activeSubscription.plan.product}</div>
      <div>Amount: {data?.activeSubscription.plan.amount}</div>
      <p>Renews: {data?.activeSubscription.currentPeriodEnd.toString()}</p>
      <div>
        {/* TODO: Cancel will pop up a confirm modal, and then call the POST /subscriptions/cancel/ endpoint if the user chooses to continue. */}
        {/* TODO: Change plan, we still need to figure out, so don't touch yet. */}
        <Link to='/cancel-auto'>Cancel Auto Renew</Link> | <Link to='/change-plan'>Change Plan</Link>
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
            <small>Card Number</small>
            <span>•••• •••• •••• 4242</span>

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
