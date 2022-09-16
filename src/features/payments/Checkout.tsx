import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LoadingButton } from 'common/components/LoadingButton';
import { useAuth } from 'features/auth/hooks';
import { showErrorMessage, showSuccessMessage } from 'common/services/notification';

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

const stripePromise: Promise<Stripe | null> = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

export const Checkout: FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const { data: plans, isLoading } = useGetPlansQuery();
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

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

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    // TODO: don't hardcode localhost:4200
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:4200/user/profile/${user?.id}`,
      },
      redirect: 'if_required',
    });

    if (result.error) {
      showErrorMessage('');
    } else {
      onComplete();
      showSuccessMessage('');
    }
  };

  const options: StripeElementsOptions = { clientSecret };

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <form onSubmit={() => handleSubmit()}>
            <PaymentElement id='payment-element' />
            <div className='mt-3 d-grid gap-2'>
              <LoadingButton loading size='lg' type='submit'>
                Pay Now
              </LoadingButton>
            </div>
          </form>
        </Elements>
      ) : (
        <WithLoadingOverlay isLoading={isLoading}>
          {plans ? (
            <>
              {plans.map((plan: Plan) => (
                <PlanChoice
                  className={plan === selectedPlan ? 'active' : ''}
                  onClick={() => setSelectedPlan(plan)}
                  key={plan.id}
                >
                  <div className='d-flex align-items-center'>
                    <Form.Check
                      checked={plan === selectedPlan}
                      defaultChecked
                      className='me-3'
                      type='radio'
                      key={plan.id}
                      aria-label={`select ${plan.name}`}
                    />
                    <div className='flex-fill'>
                      <h1 className='h4 m-0' key={plan.name}>
                        {plan.name}
                      </h1>
                      <p className='m-0 text-muted' key={plan.description}>
                        {plan.description}
                      </p>
                    </div>
                    <span key={plan.prices[0].id}>
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
