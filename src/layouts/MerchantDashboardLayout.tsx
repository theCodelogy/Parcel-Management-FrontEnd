import React from "react";
import { Outlet } from "react-router-dom";
import MerchantSidebarMenu from "../components/layout/dashboard/MerchantSidebarMenu";
import MerchantNavbar from "../components/layout/dashboard/MerchantNavbar";

const MerchantDashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar (visible on large screens) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-50">
        <MerchantSidebarMenu role="merchant" />
      </aside>

      {/* Main container with adjusted margin for sidebar */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Fixed Navbar */}
        <header className="fixed top-0 left-0 right-0 z-40 lg:ml-64">
          <MerchantNavbar />
        </header>

        {/* Main content area with top padding to avoid overlap */}
        <main className="flex-1 pt-24 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MerchantDashboardLayout;
