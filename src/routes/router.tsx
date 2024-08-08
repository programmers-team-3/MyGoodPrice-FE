import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/error';
import HomePage from '@/pages/home';
import ShopPage from '@/pages/shop';
import SlangPage from '@/pages/slang';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/slang',
    element: <SlangPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
