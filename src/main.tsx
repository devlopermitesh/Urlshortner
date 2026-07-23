import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import Layout from './Layout';
import { ErrorPage } from './pages/ErrorPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/Login';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/Signup';
import CategoryProductsPage from './pages/CategoryProductsPage';

const router = createBrowserRouter([
  { path: '/', Component: Layout, ErrorBoundary: ErrorPage, children: [
    { index: true, element: <Navigate to="/products" replace/> },
    { path: 'products', Component: ProductsPage },
    { path: 'cart', Component: CartPage },
    { path: 'orders', Component: OrdersPage },
    { path: 'orders/:orderId', Component: OrderDetailsPage },
    { path: 'category/:categoryId', Component: CategoryProductsPage },
  ] },
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignupPage },
  { path: '*', element: <div className="flex min-h-screen items-center justify-center"><div className="text-center"><h1 className="text-6xl font-bold text-gray-900">404</h1><p className="mt-4 text-lg text-gray-600">Page not found</p><a href="/" className="mt-6 inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Go Home</a></div></div> },
]);

createRoot(document.getElementById('root')!).render(<StrictMode><RouterProvider router={router}/></StrictMode>);
