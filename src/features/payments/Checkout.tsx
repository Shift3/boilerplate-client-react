import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
// import { Elements } from '@stripe/react-stripe-js';
// import { CheckoutForm } from './CheckoutForm';

// const stripePromise: Promise<Stripe | null> = loadStripe(`${process.env.STRIPE_TEST_KEY}`);

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em;
`;

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [createSubscription] = useCreateSubscriptionMutation();

  const onPlanSelect = async (priceId: string) => {
    const data = await createSubscription(priceId).unwrap();
    console.log(data);
    const { clientSecret } = data;
  };

  // const appearance = {
  //   theme: 'stripe',
  // };

  // const options: any | undefined = {
  //   clientSecret: setClientSecret,
  //   appearance,
  // };

  // const handleSubscribe = () => {
  //   return <CheckoutForm />;
  // };

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      {/* <Elements options={options} stripe={stripePromise}> */}
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
      {/* </Elements> */}
    </WithLoadingOverlay>
  );
};
