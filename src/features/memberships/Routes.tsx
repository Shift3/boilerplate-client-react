import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Checkout } from 'features/payments/Checkout';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChangePayment } from './ChangePayment';
import { ChangePlan } from './ChangePlan';
import { MySubscription } from './MySubscription';

export const MembershipRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<Checkout />} />
      <Route path='/*' element={<NotFoundView />} />
      <Route path='/my-subscription' element={<MySubscription />} />
      <Route path='/change-plan' element={<ChangePlan />} />
      <Route path='/change-payment' element={<ChangePayment />} />
    </Routes>
  </Layout>
);
