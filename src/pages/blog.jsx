import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function BlogPage() {

  useAuth()

  return (
    <>
      <Helmet>
        <title> Blog | BEX Sales </title>
      </Helmet>

      <BlogView />
    </>
  );
}
