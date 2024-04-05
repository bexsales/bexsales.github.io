import { Helmet } from 'react-helmet-async';

import { CustomerView } from 'src/sections/customer/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function CustomerPage() {

  useAuth()

  return (
    <>
      <Helmet>
        <title> Customer | Minimal UI </title>
      </Helmet>

      <CustomerView />
    </>
  );
}
