import { Helmet } from 'react-helmet-async';

import { SearchView } from 'src/sections/search/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function SearchPage() {
  useAuth();

  return (
    <>
      <Helmet>
        <title> Search | BEX Sales </title>
      </Helmet>

      <SearchView />
    </>
  );
}
