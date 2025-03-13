import RiderDashboard from "../features/rider/pages/RiderDashboard";
import AssignedParcels from "../features/rider/pages/AssignedParcels";
import DeliverdParcels from "@/features/rider/pages/DeliverdParcels";

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
    path: "deliverd-parcels",
    element: <DeliverdParcels />,
  },
];
