import { Plan, useCreateSubscriptionMutation, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuth } from 'features/auth/hooks';
import { showErrorMessage, showSuccessMessage } from 'common/services/notification';
import { LoadingButton } from 'common/components/LoadingButton';
import { loadStripe, Stripe } from '@stripe/stripe-js';

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

export const PayForPlan: FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    // TODO: don't hardcode localhost:4200
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:4200/user/profile/${user?.id}?tab=subscription`,
      },
      redirect: 'if_required',
    });

    setIsLoading(false);

    if (result.error) {
      showErrorMessage('');
    } else {
      onComplete();
      showSuccessMessage('');
    }
  };

  return (
    <form onSubmit={() => handleSubmit()}>
      <PaymentElement id='payment-element' />
      <div className='mt-3 d-grid gap-2'>
        <LoadingButton loading={isLoading} size='lg' type='submit'>
          Pay Now
        </LoadingButton>
      </div>
    </form>
  );
};

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

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PayForPlan onComplete={onComplete} />
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
                      className='me-3'
                      readOnly
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
