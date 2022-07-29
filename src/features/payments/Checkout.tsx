import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Plan, useGetPlanByIdQuery, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { CheckoutForm } from './CheckoutForm';
import { useNavigate } from 'react-router-dom';

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

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  // const getPlanById = useGetPlanByIdQuery(id);
  // const navigate = useNavigate();

  // const options = {
  //   clientSecret: '{{CLIENT_SECRET}}',
  // };

  // TODO: When the button is clicked, make a call to
  // `POST /subscriptions/` with the price_id of the plan
  // they selected.P

  // Endpoint will return a `client_secret` that you will use
  // in the `PaymentElement` stripe elements component.
  // https://stripe.com/docs/stripe-js/react

  const handleSubscribe = async () => {
    // await getPlanById;
    // navigate('/memberships/${plan_id}');

    // const result = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    //   billing_details: {},
    // });

    return (
      <>
        <CheckoutForm />
      </>
    );
  };

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      <Elements stripe={stripePromise}>
        <PlanContainer>
          {plans &&
            plans.map((plan: Plan) => (
              <Card key='id'>
                <Card.Header>{plan.name}</Card.Header>
                <Card.Body>
                  <Card.Text>{plan.description}</Card.Text>
                  <>
                    <PlanPrice>
                      {plan.prices[0].id}${(plan.prices[0].unitAmount / 100).toFixed(2)}
                    </PlanPrice>
                    per
                    <PlanInterval>
                      {plan.prices[0].recurring.intervalCount} {plan.prices[0].recurring.interval}
                    </PlanInterval>
                  </>
                  <Button variant='primary' onClick={handleSubscribe}>
                    Subscribe to {plan.name}
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </PlanContainer>
      </Elements>
    </WithLoadingOverlay>
  );
};
