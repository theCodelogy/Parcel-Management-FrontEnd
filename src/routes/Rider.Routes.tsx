import RiderProfilePage from "@/features/rider/pages/RiderProfilePage";
import AssignedParcels from "../features/rider/pages/AssignedParcels";
import DeliverdParcels from "@/features/rider/pages/DeliverdParcels";

export const riderRoutes = [
  {
    path: "assigned-parcels",
    element: <AssignedParcels />,
  },
  {
    path: "deliverd-parcels",
    element: <DeliverdParcels />,
  },
  {
    path: "profile",
    element: <RiderProfilePage />,
  },
];
