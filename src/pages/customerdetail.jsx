import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CustomerDetailView } from 'src/sections/customer-detail/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function CustomerDetailPage() {

  useAuth()

  const { customerId } = useParams();

  return (
    <>
      <Helmet>
        <title> Customer Detail | BEX Sales </title>
      </Helmet>

      <CustomerDetailView customerId={customerId}/>
    </>
  );
}