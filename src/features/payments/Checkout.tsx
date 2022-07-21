import { useState, useEffect } from 'react';

import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Plan, useGetPlansQuery } from 'common/api/paymentsApi';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Button } from 'react-bootstrap';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51LKnI7LBoYuqAVlJCiBaRj3JGO7ud4yqqxSwwaG94okOq4jB3hUQkEwR9eFJYIEvSWewbK9eZhN95gxiuy7bujHA00c47wfziI',
);

const ProductDisplay = () => (
  <section>
    <div className='product'>
      <img src='https://i.imgur.com/EHyR2nP.png' alt='The cover of Stubborn Attachments' />
      <div className='description'>
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action='/create-checkout-session' method='POST'>
      <button type='submit'>Checkout</button>
    </form>
  </section>
);

const Message = ({ message }: any) => (
  <section>
    <p>{message}</p>
  </section>
);

export const Checkout = () => {
  const { data: plans, isLoading } = useGetPlansQuery();
  // TODO: When the button is clicked, make a call to
  // `POST /subscriptions/` with the price_id of the plan
  // they selected.

  // Endpoint will return a `client_secret` that you will use
  // in the `PaymentElement` stripe elements component.
  // https://stripe.com/docs/stripe-js/react

  return (
    <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
      <ul>
        {plans &&
          plans.map((plan: Plan) => (
            <>
              <li>{plan.name}</li>
              <li>{plan.description}</li>
              <li>{plan.prices[0].id}</li>
              <li>${(plan.prices[0].unitAmount / 100).toFixed(2)}</li>
              <li>
                per {plan.prices[0].recurring.intervalCount} {plan.prices[0].recurring.interval}
              </li>
              <Button>Subscribe to {plan.name}</Button>
              <br />
            </>
          ))}
      </ul>
    </WithLoadingOverlay>
  );
  /* const [message, setMessage] = useState('');

   * useEffect(() => {
   *   // Check to see if this is a redirect back from Checkout
   *   const query = new URLSearchParams(window.location.search);

   *   if (query.get('success')) {
   *     setMessage('Order placed! You will receive an email confirmation.');
   *   }

   *   if (query.get('canceled')) {
   *     setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
   *   }
   * }, []);

   * return message ? <Message message={message} /> : <ProductDisplay />; */
};
