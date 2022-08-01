/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Plan, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card, Form } from 'react-bootstrap';
import { CheckoutForm } from './CheckoutForm';
import styled from 'styled-components';

// TODO: When the button is clicked, make a call to
// `POST /subscriptions/` with the price_id of the plan
// they selected.

// Endpoint will return a `client_secret` that you will use
// in the `PaymentElement` stripe elements component.
// https://stripe.com/docs/stripe-js/react

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const PlanPrice = styled.div``;

const PlanInterval = styled.div``;

const stripe: Promise<Stripe | null> = loadStripe(`${process.env.STRIPE_TEST_KEY}`);

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [clientSecret, setClientSecret] = useState('');

  const appearance = {
    theme: 'stripe',
  };

  const options: any | undefined = {
    clientSecret: setClientSecret,
    appearance,
  };

  const handleSubscribe = () => {
    return <CheckoutForm />;
  };

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      {clientSecret && (
        <Card>
          <Elements options={options} stripe={stripe}>
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
                    </Card.Body>
                    <Form action='/subscriptions/' method='POST'>
                      <input type='hidden' name='plan_id' value='{{subscription_id}}' />
                      <Button variant='primary' onClick={handleSubscribe}>
                        Subscribe to {plan.name}
                      </Button>
                    </Form>
                  </Card>
                ))}
            </PlanContainer>
          </Elements>
        </Card>
      )}
    </WithLoadingOverlay>
  );
};
