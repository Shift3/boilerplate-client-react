import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';

export const CheckoutForm = () => {
  return (
    <form id='payment-form'>
      <PaymentElement id='payment-element' />
      <Button id='submit'>
        <span id='button-text'>Pay Now</span>
      </Button>
    </form>
  );
};
