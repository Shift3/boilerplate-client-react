/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { create } from 'domain';

// TODO: When the button is clicked, make a call to
// `POST /subscriptions/` with the price_id of the plan
// they selected.

// Endpoint will return a `client_secret` that you will use
// in the `PaymentElement` stripe elements component.
// https://stripe.com/docs/stripe-js/react

const stripePromise = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);
// const stripe: Promise<Stripe | null> = loadStripe(`${process.env.STRIPE_TEST_KEY}`);

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PlanPrice = styled.div``;

const PlanInterval = styled.div``;

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [clientSecret, setClientSecret] = useState('');
  const [createSubscription] = useCreateSubscriptionMutation();

  const onPlanSelect = async (priceId: string) => {
    const data = await createSubscription(priceId).unwrap();
    console.log(data);
  };

  const appearance = {
    theme: 'stripe',
  };

  const options: any | undefined = {
    clientSecret: setClientSecret,
    appearance,
  };

  // const handleSubscribe = () => {
  //   return <CheckoutForm />;
  // };

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      {/* <Elements options={options} stripe={stripePromise}> */}
      <Card>
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
                    <PlanInterval>
                      {plan.prices[0].recurring.intervalCount} per {plan.prices[0].recurring.interval}
                    </PlanInterval>
                  </Card.Text>
                </Card.Body>
                <Button variant='primary' onClick={() => onPlanSelect(plan.prices[0].id)}>
                  Subscribe to {plan.name}
                </Button>
              </Card>
            ))}
        </PlanContainer>
      </Card>
      {/* </Elements> */}
    </WithLoadingOverlay>
  );
};
