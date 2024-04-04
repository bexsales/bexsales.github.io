import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function AppPage() {

  useAuth()
  
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <AppView />
    </>
  );
}
