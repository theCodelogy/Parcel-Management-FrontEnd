import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/HomePage";
import { adminRoutes } from "./Admin.Routes";
import Login from "../pages/auth/LoginPage";
import Registration from "../pages/auth/Registration";
import DeliveryManLayout from "../layouts/DeliveryManLayout";
import ContactUs from "../pages/contect-us/ConteactUs";
import About from "../pages/about-us/AboutUs";
import MerchantDashboardLayout from "@/layouts/MerchantDashboardLayout";
import { merchantRoutes } from "./Merchant.Routes";
import { riderRoutes } from "./Rider.Routes";
import ProtectedRoute from "@/private/ProtectedRoute";
import TrackingPage from "@/pages/tracking/TrackingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tracking",
        element: <TrackingPage />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "about-us",
        element: <About />,
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
    element: (
      <ProtectedRoute role="Super Admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: adminRoutes.map((route) => ({
      path: route.path,
      element: route.element,
      children: route.children?.map((child) => ({
        path: child.path,
        element: child.element,
      })),
    })),
  },
  {
    path: "/merchant",
    element: (
      <ProtectedRoute role="Merchant">
        <MerchantDashboardLayout />
      </ProtectedRoute>
    ),
    children: merchantRoutes,
  },
  {
    path: "/rider",
    element: (
      <ProtectedRoute role="Delivery Man">
        <DeliveryManLayout />
      </ProtectedRoute>
    ),
    children: riderRoutes,
  },
]);

export default router;
