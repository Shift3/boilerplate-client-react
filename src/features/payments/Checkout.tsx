import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useState } from 'react';

// 1. Fetch plans (planId) from backend.
// 2. Display plans to user (pre-selection).
// 3. User selects a plan --> send to backend --> create incomplete subscription plan.
// 4. Backend sends back 'clientSecret', frontend uses clientSecret to collect payment info (stripe elements)
// 5. If no error, send client to their profile subscription page.

const stripePromise: Promise<Stripe | null> = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em;
`;

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  const onPlanSelect = async (priceId: string) => {
    const data = await createSubscription(priceId).unwrap();
    const { clientSecret } = data;
    setClientSecret(clientSecret);
  };

  const options: StripeElementsOptions = { clientSecret };

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
          <PlanContainer>
            {plans &&
              plans.map((plan: Plan) => (
                <Card key={plan.id} className='m-2'>
                  <Card.Header>{plan.name}</Card.Header>
                  <Card.Body>
                    <Card.Text>{plan.description}</Card.Text>
                    <Card.Text>
                      {plan.prices[0].id}${(plan.prices[0].unitAmount / 100).toFixed(2)}
                      {plan.prices[0].recurring.intervalCount} per {plan.prices[0].recurring.interval}
                    </Card.Text>
                  </Card.Body>
                  <Button variant='primary' onClick={() => onPlanSelect(plan.prices[0].id)}>
                    Subscribe to {plan.name}
                  </Button>
                </Card>
              ))}
          </PlanContainer>
        </WithLoadingOverlay>
      )}
    </>
  );
};
