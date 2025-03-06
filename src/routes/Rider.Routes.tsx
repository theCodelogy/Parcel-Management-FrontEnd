import RiderDashboard from "../features/rider/pages/RiderDashboard";
import AssignedParcels from "../features/rider/pages/AssignedParcels";
import DeliveryLogs from "../features/rider/pages/DeliveryLogs";
import DeliverSchedule from "../features/rider/pages/DeliverSchedule";

export const riderRoutes = [
  {
    path: "dashboard",
    element: <RiderDashboard />,
  },
  {
    path: "assigned-parcels",
    element: <AssignedParcels />,
  },
  {
    path: "delivery-logs",
    element: <DeliveryLogs />,
  },
  {
    path: "delivery-schedule",
    element: <DeliverSchedule />,
  },
];
