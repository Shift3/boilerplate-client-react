import { useState, useEffect } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Plan, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PlanPrice = styled.div``;

const PlanInterval = styled.div``;

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
    );
  }
  return stripePromise;
};

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const getPlans = useGetPlansQuery();

  // Endpoint will return a `client_secret` that you will use
  // in the `PaymentElement` stripe elements component.
  // https://stripe.com/docs/stripe-js/react

  const handleSubscribe: any = async (e: any) => {
    // try {
    //   await getPlans({ ...data }).unwrap();
    //   navigate('/memberships');
    // } catch (err) {}
    // set isLoading to true;
    // TODO: When the button is clicked, make a call to
    // `POST /subscriptions/` with the price_id of the plan
    // they selected.
    // const response = await getPlans;
  };

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      <PlanContainer>
        {plans &&
          plans.map((plan: Plan) => (
            <Card>
              <Card.Header>{plan.name}</Card.Header>
              <Card.Body>
                <Card.Text>{plan.description}</Card.Text>
                <Card.Text>
                  <PlanPrice>
                    {plan.prices[0].id}${(plan.prices[0].unitAmount / 100).toFixed(2)}
                  </PlanPrice>
                  per
                  <PlanInterval>
                    {plan.prices[0].recurring.intervalCount} {plan.prices[0].recurring.interval}
                  </PlanInterval>
                </Card.Text>
                <Button variant='primary' onClick={handleSubscribe}>
                  Subscribe to {plan.name}
                </Button>
              </Card.Body>
            </Card>
          ))}
      </PlanContainer>
    </WithLoadingOverlay>
  );
  /* const [message, setMessage] = useState('');

   * useEffect(() => {
   *   // Check to see if this is a redirect back from Checkout
   *   const query = new URLSearchParams(window.location.search);

   *   if (query.get('success')) {
   *     setMessage('Order placed! You will receive an email confirmation.');
   *   }

   *   if (query.get('canceled')) {
   *     setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
   *   }
   * }, []);

   * return message ? <Message message={message} /> : <ProductDisplay />; */
};
