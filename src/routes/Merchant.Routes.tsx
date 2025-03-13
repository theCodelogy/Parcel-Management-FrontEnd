import MerchantDashboard from "../features/merchant/pages/MerchantDashboard";
import OrderHistory from "../features/merchant/pages/AllParcels";
import Returns from "../features/merchant/pages/ReturnsPage";
import Invoice from "../features/merchant/pages/Invoice";
import MerchantSettings from "../features/merchant/pages/Settings";
import Support from "../features/merchant/pages/Support";
import APIDocs from "../features/merchant/pages/APIDocs";
import ParcelCreate from "../features/merchant/pages/CreateParcel";
import InvoiceGenerate from "@/features/merchant/pages/InvoiceGenerate";
import MerchantProfilePage from "@/features/merchant/pages/MerchantProfilePage";

export const merchantRoutes = [
  {
    path: "dashboard",
    element: <MerchantDashboard />,
  },
  {
    path: "all-orders",
    element: <OrderHistory />,
  },
  {
    path: "returns",
    element: <Returns />,
  },
  {
    path: "invoice",
    element: <Invoice />,
  },
  {
    path: "invoice/1",
    element: <InvoiceGenerate />,
  },
  {
    path: "settings",
    element: <MerchantSettings />,
  },
  {
    path: "support",
    element: <Support />,
  },
  {
    path: "api-docs",
    element: <APIDocs />,
  },
  {
    path: "create-parcel",
    element: <ParcelCreate />,
  },
  {
    path: "profile",
    element: <MerchantProfilePage />,
  },
];
