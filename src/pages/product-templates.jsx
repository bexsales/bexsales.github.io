import { Helmet } from 'react-helmet-async';

import { ProductTemplateView } from 'src/sections/product-templates/view';

import { useAuth } from '../routes/hooks/use-auth';

// ----------------------------------------------------------------------

export default function ProductTemplatesPage() {

  useAuth()

  return (
    <>
      <Helmet>
        <title> Products | BEX Sales </title>
      </Helmet>

      <ProductTemplateView showTitle/>
    </>
  );
}
