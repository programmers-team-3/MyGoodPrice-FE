import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error/Error";
import Home from "@/pages/home/Home";
import ShopPage from "@/pages/shop/Shop";
import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login";
import MyPage from "@/pages/MyPage";
import MapPage from "@/pages/Map/Map";
import Auth from "@/pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
