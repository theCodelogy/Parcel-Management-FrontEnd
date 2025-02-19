import { Home, Package, FileText, Calendar } from "lucide-react";

import RiderDashboard from "../features/rider/pages/RiderDashboard";
import AssignedParcels from "../features/rider/pages/AssignedParcels";
import DeliveryLogs from "../features/rider/pages/DeliveryLogs";
import DeliverSchedule from "../features/rider/pages/DeliverSchedule";
import { RouteItem } from "./Admin.Routes";

export const riderRoutes: RouteItem[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <RiderDashboard />,
    icon: Home,
  },
  {
    label: "Assigned Parcels",
    path: "assigned-parcels",
    element: <AssignedParcels />,
    icon: Package,
  },
  {
    label: "Delivery Logs",
    path: "delivery-logs",
    element: <DeliveryLogs />,
    icon: FileText,
  },
  {
    label: "Delivery Schedule",
    path: "delivery-schedule",
    element: <DeliverSchedule />,
    icon: Calendar,
  },
];
