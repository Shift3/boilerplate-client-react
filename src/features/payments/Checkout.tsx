import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { FC, useEffect, useState } from 'react';

const stripePromise: Promise<Stripe | null> = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

const PlanChoice = styled.div`
  background: #efefef;
  border-radius: 24px;
  padding: 1rem;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }

  &.active {
    outline: 2px solid ${props => props.theme.buttons.primaryBackgroundColor};
  }

  span {
    font-weight: 500;
  }
`;

export const Checkout: FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (plans) {
      setSelectedPlan(plans[0]);
    }
  }, [plans]);

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
          <CheckoutForm onComplete={onComplete} />
        </Elements>
      ) : (
        <WithLoadingOverlay isLoading={isLoading}>
          {plans ? (
            <>
              {plans.map((plan: Plan) => (
                <PlanChoice className={plan === selectedPlan ? 'active' : ''} onClick={() => setSelectedPlan(plan)}>
                  <div className='d-flex align-items-center'>
                    <Form.Check
                      checked={plan === selectedPlan}
                      className='me-3'
                      type='radio'
                      aria-label={`select ${plan.name}`}
                    />
                    <div className='flex-fill'>
                      <h1 className='h4 m-0'>{plan.name}</h1>
                      <p className='m-0 text-muted'>{plan.description}</p>
                    </div>
                    <span>
                      {(plan.prices[0].unitAmount / 100).toFixed(2)} / {plan.prices[0].recurring.interval}
                    </span>
                  </div>
                </PlanChoice>
              ))}

              {selectedPlan ? (
                <div className='d-grid gap-2'>
                  <Button size='lg' className='btn-block' onClick={() => onPlanSelect(selectedPlan.prices[0].id)}>
                    Continue
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
        </WithLoadingOverlay>
      )}
    </>
  );
};
