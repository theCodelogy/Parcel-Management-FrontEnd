// import React, { useState, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { adminRoutes, RouteItem } from "../../../routes/Admin.Routes";
// import { merchantRoutes } from "../../../routes/Merchant.Routes";
// import { riderRoutes } from "../../../routes/Rider.Routes";

// interface SidebarMenuProps {
//   role: "admin" | "merchant" | "rider";
// }

// const SidebarMenu: React.FC<SidebarMenuProps> = ({ role }) => {
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
//   const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

//   const toggleMenu = (label: string) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   const getRoutesForRole = (): RouteItem[] => {
//     switch (role) {
//       case "admin":
//         return adminRoutes;
//       case "merchant":
//         return merchantRoutes;
//       case "rider":
//         return riderRoutes;
//       default:
//         return [];
//     }
//   };

//   const routeItems = getRoutesForRole();

//   // Helper function to determine if any child route is active
//   const isChildActive = (children: RouteItem[]) =>
//     children.some((child) => location.pathname === child.path);

//   return (
//     <div
//       style={{ height: "calc(100vh - 64.8px)" }}
//       className="w-64 bg-white shadow-lg overflow-y-auto hide-scrollbar hidden lg:block pb-6"
//     >
//       <div className="p-4 text-gray-600 text-sm font-semibold">MENU</div>
//       <div className="space-y-1">
//         {routeItems.map((item, index) => (
//           <div key={index}>
//             {item.children ? (
//               <>
//                 {/* Parent item with children */}
//                 <div
//                   className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
//                     isChildActive(item.children) ? "bg-gray-200" : ""
//                   }`}
//                   onClick={() => toggleMenu(item.label)}
//                   role="button"
//                   tabIndex={0}
//                 >
//                   {item.icon && <item.icon className="w-5 h-5 mr-3" />}
//                   <span className="flex-grow">{item.label}</span>
//                   <span
//                     className={`ml-2 transform transition-transform duration-300 ease-out ${
//                       openMenus[item.label] ? "rotate-90" : "rotate-0"
//                     }`}
//                   >
//                     ›
//                   </span>
//                 </div>
//                 {/* Child items */}
//                 <div
//                   ref={(el) => {
//                     submenuRefs.current[item.label] = el;
//                   }}
//                   style={{
//                     maxHeight: openMenus[item.label]
//                       ? submenuRefs.current[item.label]?.scrollHeight
//                       : 0,
//                     transition: "max-height 0.3s ease-out",
//                   }}
//                   className="overflow-hidden"
//                 >
//                   <div className="ml-8 space-y-1 py-1">
//                     {item.children.map((child, childIndex) => (
//                       <NavLink
//                         key={childIndex}
//                         to={child.path}
//                         className={({ isActive }) =>
//                           "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" +
//                           (isActive ? " bg-gray-200" : "")
//                         }
//                       >
//                         {child.icon && <child.icon className="w-4 h-4 mr-3" />}
//                         <span>{child.label}</span>
//                       </NavLink>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               // Single-level menu item
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" +
//                   (isActive ? " bg-gray-200" : "")
//                 }
//               >
//                 {item.icon && <item.icon className="w-5 h-5 mr-3" />}
//                 <span className="flex-grow">{item.label}</span>
//               </NavLink>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SidebarMenu;
