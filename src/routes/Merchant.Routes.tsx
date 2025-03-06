import MerchantDashboard from "../features/merchant/pages/MerchantDashboard";
import OrderHistory from "../features/merchant/pages/OrderHistory";
import Returns from "../features/merchant/pages/Returns";
import Invoice from "../features/merchant/pages/Invoice";
import MerchantSettings from "../features/merchant/pages/Settings";
import Support from "../features/merchant/pages/Support";
import APIDocs from "../features/merchant/pages/APIDocs";
import ParcelCreate from "../features/merchant/pages/CreateParcel";

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
];
