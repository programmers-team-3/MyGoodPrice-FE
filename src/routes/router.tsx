import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error/index";
import HomePage from "@/pages/home";
import ShopPage from "@/pages/shop";
import SlangPage from "@/pages/slang";
import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/slang",
        element: <SlangPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
