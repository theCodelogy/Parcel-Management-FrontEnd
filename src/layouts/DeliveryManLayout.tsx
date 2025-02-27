import { Outlet } from "react-router-dom";
import MerchantSidebarMenu from "../components/layout/dashboard/MerchantSidebarMenu";
import MerchantNavbar from "../components/layout/dashboard/MerchantNavbar";

const DeliveryManLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main container */}
      <div className="flex flex-1">
        {/* Sidebar (visible on large screens) */}
        <aside className="hidden lg:block fixed  z-[999]">
          <MerchantSidebarMenu role="rider" />
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 lg:ml-64 overflow-x-auto">
          {/* Fixed Navbar */}
          <header className="fixed top-0 left-0 right-0 z-40 lg:ml-64">
            <MerchantNavbar />
          </header>
          <div className="flex-1 pt-24 p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DeliveryManLayout;
