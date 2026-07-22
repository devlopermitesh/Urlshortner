import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ErrorPage } from './pages/ErrorPage.tsx';
import Layout from './Layout.tsx';
import Analysis from './pages/Analysic.tsx';
import { SubmitAction } from './component/ShortnerForm.tsx';
import ShortUrlPage from './pages/ShortUrlPage.tsx';
import SignupPage from './pages/Signup.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    handle: {
      title: 'Url shortner',
    },
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: '/',
        index: true,
        action: SubmitAction,
        Component: App,
      },
      {
        path: '/u/:shortcode',
        Component: ShortUrlPage,
      },
      {
        path: 'url-visitor/',
        Component: Analysis,
      },
      {
        path: '/signup',
        Component: SignupPage,
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
