import { Layout } from 'common/components/Layout';
import { NotFoundView } from 'common/components/NotFoundView';
import { Checkout } from 'features/payments/Checkout';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CancelSub } from './CancelSub';

export const MembershipRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<Checkout />} />
      <Route path='/*' element={<NotFoundView />} />
      <Route path='/cancel' element={<CancelSub />} />
    </Routes>
  </Layout>
);
