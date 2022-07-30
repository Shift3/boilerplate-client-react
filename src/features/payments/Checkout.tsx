import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Plan, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FC, useState, useEffect } from 'react';
import { CheckoutForm } from './CheckoutForm';

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PlanPrice = styled.div``;

const PlanInterval = styled.div``;

const stripePromise: Promise<Stripe | null> = loadStripe(`${process.env.STRIPE_SECRET_TEST_KEY}`);

export const Checkout: FC = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ plan_id: 'plan id' }] }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    clientSecret,
    appearance,
  };

  const handleSubscribe = () => {
    return <CheckoutForm />;
  };
  // TODO: When the button is clicked, make a call to
  // `POST /subscriptions/` with the price_id of the plan
  // they selected.P

  // Endpoint will return a `client_secret` that you will use
  // in the `PaymentElement` stripe elements component.
  // https://stripe.com/docs/stripe-js/react

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
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
                    <Form action='/create-checkout-session/' method='POST'>
                      <input type='hidden' name='plan_id' value='{{plan_id}}' />
                      <Button variant='primary' onClick={handleSubscribe}>
                        Subscribe to {plan.name}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              ))}
          </PlanContainer>
        </Elements>
      )}
    </WithLoadingOverlay>
  );
};
