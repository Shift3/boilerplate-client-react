import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripePromise } from 'app/App';
import { Subscription, useAddCardToWalletMutation } from 'common/api/paymentsApi';
import { LoadingButton } from 'common/components/LoadingButton';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { useAuth } from 'features/auth/hooks';
import { FC, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const CreditCard = styled.div`
  padding: 1rem;
  margin: 0.6rem;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  border-radius: ${props => props.theme.borderRadius};
  position: relative;

  small {
    display: block;
    color: #999;
  }

  & > div > div {
    flex: 1;
  }

  span {
    display: block;
    font-family: monospace;
  }

  img {
    width: 48px;
    height: auto;
  }

  path {
    fill: ${props => props.theme.textColor};
  }
`;

const CardManagementInner: FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!stripe || !elements) return <></>;

  const onAdd = async () => {
    setLoading(true);
    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `http://localhost:4200/user/profile/${user?.id}?tab=subscription`,
      },
      redirect: 'if_required',
    });
    // TODO(justin): handle errors here.

    setLoading(false);

    if (!result.error) onSuccess();
  };

  return (
    <>
      <Modal.Body>
        <PaymentElement />
      </Modal.Body>

      <Modal.Footer>
        <LoadingButton onClick={onAdd} loading={loading}>
          <FontAwesomeIcon className='me-2' icon={faCreditCard} />
          Add
        </LoadingButton>
      </Modal.Footer>
    </>
  );
};

export const CardManagement: FC<{
  subscription: Subscription;
  onCardAdded: () => void;
}> = ({ subscription, onCardAdded }) => {
  const [addCardToWallet] = useAddCardToWalletMutation();

  const [showAddCardModal, hideAddCardModal] = useModalWithData<string>(clientSecret => {
    return ({ in: open, onExited }) => {
      const onSuccess = () => {
        hideAddCardModal();
        onCardAdded();
      };

      return (
        <Modal show={open} onHide={hideAddCardModal} onExited={onExited}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Card</Modal.Title>
          </Modal.Header>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CardManagementInner onSuccess={onSuccess} />
          </Elements>
        </Modal>
      );
    };
  }, []);

  const addCard = async () => {
    const data = await addCardToWallet().unwrap();
    showAddCardModal(data.clientSecret);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className='mb-3 d-flex align-items-center'>
            <h4 className='flex-fill m-0'>Payment Methods</h4>
            <a href='#' onClick={() => addCard()}>
              <b>Add Card</b>
            </a>
          </div>
          {subscription.paymentMethods.map(paymentMethod => (
            <CreditCard key={paymentMethod.id}>
              <div className='d-flex align-items-center'>
                <img className='me-3' width={64} src={`/cards/${paymentMethod.card.brand}.png`} alt='Credit Card' />
                <div>
                  <span>•••• •••• •••• {paymentMethod.card.last4}</span>
                  <small>
                    {paymentMethod.card.expMonth}/{paymentMethod.card.expYear.toString().slice(2)}
                  </small>
                </div>

                {/*
                    TODO(justin): Lets turn this into a dropdown, with "Make Default"
                    and "Remove". If they only have one card, don't show "Remove"

                    We currently don't have the mechanisms for "Make Default" but make
                    default should eventually be dimmed and disabled on cards which are
                    already default.
                 */}
                <Button className='ms-3' variant='link'>
                  <FontAwesomeIcon size='1x' icon='ellipsis-vertical' />
                </Button>
              </div>
            </CreditCard>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};
