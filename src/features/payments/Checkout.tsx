import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Plan, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PlanPrice = styled.div``;

const PlanInterval = styled.div``;

const stripePromise: Promise<Stripe | null> = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

export const Checkout: FC = () => {
  const navigate = useNavigate();
  const { data: plans, isLoading } = useGetPlansQuery();

  const options = {
    clientSecret: '{{client_secret}}',
  };

  // TODO: When the button is clicked, make a call to
  // `POST /subscriptions/` with the price_id of the plan
  // they selected.P

  // Endpoint will return a `client_secret` that you will use
  // in the `PaymentElement` stripe elements component.
  // https://stripe.com/docs/stripe-js/react

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
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
                    <Button variant='primary' type='submit'>
                      Subscribe to {plan.name}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            ))}
        </PlanContainer>
      </Elements>
    </WithLoadingOverlay>
  );
};
