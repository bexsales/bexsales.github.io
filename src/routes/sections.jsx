import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductTemplatesPage = lazy(() => import('src/pages/product-templates'));
export const OrdersPage = lazy(() => import('src/pages/orders'));
export const OrderDetailPage = lazy(() => import('src/pages/orderdetail'));
export const NewOrderPage = lazy(() => import('src/pages/neworder'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'product-templates', element: <ProductTemplatesPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'orders/:orderId', element: <OrderDetailPage /> },
        { path: 'new-order', element: <NewOrderPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
