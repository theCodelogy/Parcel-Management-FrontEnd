import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routesGenerator";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import { adminRoutes } from "./Admin.Routes";
import { merchantRoutes } from "./Merchant.Routes";
import { riderRoutes } from "./Rider.Routes";
import MerchantDashboardLayout from "../layouts/MerchantDashboardLayout";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/merchant",
    // element: <DashboardLayout />,
    element: <MerchantDashboardLayout />,
    children: routeGenerator(merchantRoutes),
  },
  {
    path: "/rider",
    element: <DashboardLayout />,
    children: routeGenerator(riderRoutes),
  },
]);

export default router;
