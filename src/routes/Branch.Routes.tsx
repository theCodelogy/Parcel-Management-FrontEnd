import BranchDashboard from "@/features/branch/pages/BranchDashboard";
import DeliveryManPageBranch from "@/features/branch/pages/deliveryMan/DeliveryManPageBranch";
import MerchatnListPageBranch from "@/features/branch/pages/MerchatnListPageBranch";
import ParcelPageBranch from "@/features/branch/pages/parcels/AllParcelPageBranch";
import PackagingManageBranch from "../features/branch/pages/PackagingManageBranch";
import DeliveryChargeBranch from "@/features/branch/pages/DeliveryChargeBranch";
import CreateDeliveryManBranch from "@/features/branch/pages/deliveryMan/CreateDeliveryManBranch";
import EditDeliveryManPageBranch from "@/features/branch/pages/deliveryMan/EditDeliveryManPageBranch";
import { CreateParcelBranch } from "@/features/branch/pages/parcels/CreateParcelBranch";
import BranchProflie from "@/features/branch/pages/BranchProflie";

export const branchRoutes = [
  {
    path: "dashboard",
    element: <BranchDashboard />,
  },
  {
    path: "deliveryman",
    children: [
      {
        path: "",
        element: <DeliveryManPageBranch />,
      },
      {
        path: "create",
        element: <CreateDeliveryManBranch />,
      },
      {
        path: "edit",
        element: <EditDeliveryManPageBranch />,
      },
    ],
  },
  {
    path: "merchant-manage",
    element: <MerchatnListPageBranch />,
  },
  {
    path: "parcels",
    children: [
      {
        path: "",
        element: <ParcelPageBranch />,
      },
      {
        path: "create",
        element: <CreateParcelBranch />,
      },
    ],
  },
  {
    path: "setting",
    children: [
      {
        path: "delivery-charge",
        element: <DeliveryChargeBranch />,
      },
      {
        path: "packaging",
        element: <PackagingManageBranch />,
      },
    ],
  },
  {
    path: "profile",
    element: <BranchProflie />,
  },
];
