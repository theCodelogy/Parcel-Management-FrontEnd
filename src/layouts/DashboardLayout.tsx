// import { Outlet } from "react-router-dom";
// import { DashboardNavbar, SidebarMenu } from "../components/layout";

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Sticky header */}
//       <header className="sticky top-0 z-10 bg-white shadow-sm">
//         <DashboardNavbar />
//       </header>

//       {/* Main container */}
//       <div className="flex flex-1">
//         {/* Sidebar (visible on large screens) */}

//         <aside className="hidden lg:block fixed top-[64.8px] left-0 h-[calc(100vh-64.8px)] z-[999]">
//           <SidebarMenu role="merchant" />
//         </aside>

//         {/* Main content area */}
//         <main className="flex-1 p-4 ml-64">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Outlet } from "react-router-dom";
import { DashboardNavbar, SidebarMenu } from "../components/layout";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <DashboardNavbar />
      </header>

      {/* Main container */}
      <div className="flex flex-1">
        {/* Sidebar (visible on large screens) */}
        <aside className="hidden lg:block fixed top-[64.8px] left-0 h-[calc(100vh-64.8px)] z-[999]">
          <SidebarMenu role="merchant" />
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 lg:ml-64 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
