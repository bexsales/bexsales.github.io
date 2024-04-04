import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function UserPage() {

  useAuth()

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
