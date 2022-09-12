import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

export const CheckoutForm: FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  if (!user) return <></>;

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:4200/user/profile/${user.id}`,
      },
      redirect: 'if_required',
    });

    if (result.error) {
      // eslint-disable-next-line no-console
      console.log(result.error.message);
    } else {
      // TODO: fire off a toast.
      onComplete();
    }
  };

  return (
    <form onSubmit={() => handleSubmit()}>
      <PaymentElement id='payment-element' />
      <div className='mt-3 d-grid gap-2'>
        <Button size='lg' type='submit'>
          Pay Now
        </Button>
      </div>
    </form>
  );
};
