import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';

const CreditCard = styled.div`
  padding: 1rem;
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
    width: auto;
    height: 32px;
  }

  path {
    fill: ${props => props.theme.textColor};
  }
`;

export const IsCancelled = () => {
  const { data, isLoading } = useGetMySubscriptionQuery();

  return (
    <>
      <WithLoadingOverlay isLoading={isLoading} containerHasRoundedCorners containerBorderRadius='6px'>
        {data && !isLoading ? (
          <Row>
            <Col className='mb-3' md={12} xl={6}>
              <Card>
                <Card.Body>
                  <div className='mb-3 d-flex align-items-center'>
                    <h4 className='flex-fill m-0'>Cancelled Plan</h4>
                  </div>
                  <div className='mb-2'>
                    Your Plan: {data.activeSubscription.plan.product}
                    <br />
                    <Link to='/memberships/resubscribe'>Resubscribe</Link>
                  </div>
                  <div>Amount: ${data.activeSubscription.plan.amount}</div>
                  <p>
                    Expires: <Moment format='MMM D, YYYY'>{data.activeSubscription.currentPeriodEnd}</Moment>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col className='mb-3' md={12} xl={6}>
              <Card>
                {/* TODO: Will need to fetch the credit cards on file, and then map through to display.
              Also check that at least one card is on file before allowing user to delete card/s. */}
                <Card.Body>
                  <h4>Payment Methods</h4>
                  <CreditCard>
                    <div className='d-flex align-items-center'>
                      <img
                        className='me-3'
                        src='https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png'
                        alt='Credit Card'
                      />
                      <div>
                        <span>•••• •••• •••• 4242</span>
                        <small>4/27</small>
                      </div>
                      {/* TODO: Add `edit credit card` functionality */}
                      <Button className='ms-3' variant='link'>
                        <FontAwesomeIcon size='1x' icon='ellipsis-vertical' />
                      </Button>
                    </div>
                  </CreditCard>
                </Card.Body>
              </Card>
            </Col>

            <Col className='mt-3'>
              <h4>Billing History</h4>

              <table className='table'>
                <tbody>
                  {data.billingHistory.map(({ amount, date, description }, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <tr key={i}>
                      <td key={date}>
                        <Moment format='MMM D, YYYY'>{date}</Moment>
                      </td>
                      <td key={description}>{description}</td>
                      <td key={amount}>{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        ) : null}
      </WithLoadingOverlay>
    </>
  );
};
