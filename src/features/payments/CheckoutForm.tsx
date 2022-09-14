import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { showErrorMessage, showSuccessMessage } from 'common/services/notification';
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

    // TODO: don't hardcode localhost:4200
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:4200/user/profile/${user.id}`,
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
