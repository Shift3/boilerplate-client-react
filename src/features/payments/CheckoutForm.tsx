import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button>Submit</Button>
    </form>
  );
};
