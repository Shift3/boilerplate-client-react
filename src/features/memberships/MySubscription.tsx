/* eslint-disable no-nested-ternary */
import { useGetMySubscriptionQuery } from 'common/api/paymentsApi';
import { Container } from 'react-bootstrap';
import { IsActive } from './IsActive';
import { IsCancelled } from './IsCancelled';

export const MySubscription = () => {
  const { data } = useGetMySubscriptionQuery();

  return (
    <Container>
      {data?.activeSubscription.canceledAt === null ? (
        <IsActive />
      ) : data?.activeSubscription.canceledAt ? (
        <IsCancelled />
      ) : data === null ? (
        <h2>No Active Subscription</h2>
      ) : null}
    </Container>
  );
};
