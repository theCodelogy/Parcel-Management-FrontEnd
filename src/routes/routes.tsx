import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/AdminDashboardLayout";
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
import BranchDashbordLayout from "@/layouts/BranchDashbordLayout";
import { branchRoutes } from "./Branch.Routes";
import ServiceOne from "@/pages/service/ServiceOne";
import ServiceTow from "@/pages/service/ServiceTow";
import ServiceThree from "@/pages/service/ServiceThree";

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
      {
        path: "service-details/1",
        element: <ServiceOne />,
      },
      {
        path: "service-details/2",
        element: <ServiceTow />,
      },
      {
        path: "service-details/3",
        element: <ServiceThree />,
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
    path: "/branch",
    element: (
      <ProtectedRoute role="Branch">
        <BranchDashbordLayout />
      </ProtectedRoute>
    ),
    children: branchRoutes,
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
