import {
  Home,
  History,
  Repeat,
  FileText,
  Settings as SettingsIcon,
  Headphones,
  BookOpen,
} from "lucide-react";

import MerchantDashboard from "../features/merchant/pages/MerchantDashboard";
import OrderHistory from "../features/merchant/pages/OrderHistory";
import Returns from "../features/merchant/pages/Returns";
import Invoice from "../features/merchant/pages/Invoice";
import MerchantSettings from "../features/merchant/pages/Settings"; // New merchant settings page
import Support from "../features/merchant/pages/Support";
import APIDocs from "../features/merchant/pages/APIDocs";
import { RouteItem } from "./Admin.Routes";

export const merchantRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <MerchantDashboard />,
    icon: Home,
  },
  {
    label: "Order History",
    path: "order-history",
    element: <OrderHistory />,
    icon: History,
  },
  {
    label: "Returns",
    path: "returns",
    element: <Returns />,
    icon: Repeat,
  },
  {
    label: "Invoice",
    path: "invoice",
    element: <Invoice />,
    icon: FileText,
  },
  {
    label: "Settings",
    path: "settings",
    element: <MerchantSettings />,
    icon: SettingsIcon,
  },
  {
    label: "Support",
    path: "support",
    element: <Support />,
    icon: Headphones,
  },
  {
    label: "API Docs",
    path: "api-docs",
    element: <APIDocs />,
    icon: BookOpen,
  },
];
