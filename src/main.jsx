import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router} from "react-router-dom";

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Router>
      <Suspense>
        <App />
      </Suspense>
    </Router>
  </HelmetProvider>
);
