// import { createBrowserRouter } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../pages/home/Home";
// import { adminRoutes } from "./Admin.Routes";
// import Login from "../pages/auth/LoginPage";
// import Registration from "../pages/auth/Registration";
// import DeliveryManLayout from "../layouts/DeliveryManLayout";
// import ContactUs from "../pages/contect-us/ConteactUs";
// import About from "../pages/about-us/AboutUs";
// import MerchantDashboardLayout from "@/layouts/MerchantDashboardLayout";
// import { merchantRoutes } from "./Merchant.Routes";
// import { riderRoutes } from "./Rider.Routes";
// import { routeGenerator } from "@/utils/routesGenerator";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "contact-us",
//         element: <ContactUs />,
//       },
//       {
//         path: "about-us",
//         element: <About />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/registration",
//     element: <Registration />,
//   },
//   {
//     path: "/admin",
//     element: <DashboardLayout />,
//     children: routeGenerator(adminRoutes),
//   },
//   {
//     path: "/merchant",
//     element: <MerchantDashboardLayout />,
//     children: merchantRoutes,
//   },
//   {
//     path: "/rider",
//     element: <DeliveryManLayout />,
//     children: riderRoutes,
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import { adminRoutes } from "./Admin.Routes";
import Login from "../pages/auth/LoginPage";
import Registration from "../pages/auth/Registration";
import DeliveryManLayout from "../layouts/DeliveryManLayout";
import ContactUs from "../pages/contect-us/ConteactUs";
import About from "../pages/about-us/AboutUs";
import MerchantDashboardLayout from "@/layouts/MerchantDashboardLayout";
import { merchantRoutes } from "./Merchant.Routes";
import { riderRoutes } from "./Rider.Routes";

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
    element: <DashboardLayout />,
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
    element: <MerchantDashboardLayout />,
    children: merchantRoutes,
  },
  {
    path: "/rider",
    element: <DeliveryManLayout />,
    children: riderRoutes,
  },
]);

export default router;
