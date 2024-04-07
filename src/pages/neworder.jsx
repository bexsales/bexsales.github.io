import { Helmet } from 'react-helmet-async';

import { NewOrderView } from 'src/sections/new-order/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {

  useAuth()

  return (
    <>
      <Helmet>
        <title> New Order | BEX Sales </title>
      </Helmet>

      <NewOrderView />
    </>
  );
}