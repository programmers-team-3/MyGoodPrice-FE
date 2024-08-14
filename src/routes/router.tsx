import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/error/index";
import HomePage from "@/pages/home";
import ShopPage from "@/pages/shop";
import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import MyPage from "@/pages/MyPage/MyPage";
import MapPage from "@/pages/Map/Map";

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
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
