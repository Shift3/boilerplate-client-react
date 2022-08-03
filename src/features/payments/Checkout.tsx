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
  justify-content: center;
  align-items: center;
  margin: 1em; ;
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
          <PlanContainer className='border border-primary'>
            {plans &&
              plans.map((plan: Plan) => (
                <Card key={plan.id} className='m-3 w-25 mx-5 w-100'>
                  <Card.Header className='d-flex justify-content-center'>{plan.name}</Card.Header>
                  <Card.Body className='d-flex-col justify-content-center'>
                    <Card.Text className=''>{plan.description}</Card.Text>
                    <Card.Text className=''>
                      {plan.prices[0].id}${(plan.prices[0].unitAmount / 100).toFixed(2)}
                      {plan.prices[0].recurring.intervalCount} per {plan.prices[0].recurring.interval}
                    </Card.Text>
                  </Card.Body>
                  <Button className='m-2 w-80' variant='primary' onClick={() => onPlanSelect(plan.prices[0].id)}>
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
