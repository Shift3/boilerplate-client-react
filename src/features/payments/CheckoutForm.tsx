import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const Form = styled(Container)`
  display: flex;
  justify-content: center;
`;

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (result.error) {
      // eslint-disable-next-line no-console
      console.log(result.error.message);
    }
  };

  return (
    <Form>
      <form onSubmit={() => handleSubmit()}>
        <PaymentElement id='payment-element' />
        <Button type='submit'>
          <span id='button-text'>Pay Now</span>
        </Button>
      </form>
    </Form>
  );
};
