import { Helmet } from 'react-helmet-async';

import { OrderDetailView } from 'src/sections/order-detail';

import { useParams } from 'react-router-dom';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {

  useAuth()

  const { orderId } = useParams();

  return (
    <>
      <Helmet>
        <title> Order Detail | BEX Sales </title>
      </Helmet>

      <OrderDetailView orderId={orderId}/>
    </>
  );
}