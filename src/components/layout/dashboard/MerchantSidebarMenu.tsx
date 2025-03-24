// import React, { useState, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { adminRoutes, RouteItem } from "../../../routes/Admin.Routes";
// import { merchantRoutes } from "../../../routes/Merchant.Routes";
// import { riderRoutes } from "../../../routes/Rider.Routes";

// interface SidebarMenuProps {
//   role: "admin" | "merchant" | "rider";
// }

// const MerchantSidebarMenu: React.FC<SidebarMenuProps> = ({ role }) => {
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

//   // Helper function to check if any child route is active
//   const isChildActive = (children: RouteItem[]) =>
//     children.some((child) => location.pathname === child.path);

//   return (
//     <div className="w-64 bg-white  overflow-y-auto hide-scrollbar hidden lg:block pb-6 h-screen">
//       {/*
//          Only show this purple header when role = "merchant".
//          If you want it to appear for other roles as well,
//          remove or adjust the condition below.
//        */}
//       {role === "merchant" && (
//         <div className="p-4 border-b border-gray-200 text-white flex flex-col items-center">
//           {/* Enlarged and centered image */}
//           <div className="w-26 h-26 bg-gray-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
//             <img
//               src="https://i.ibb.co/bFMCnfT/me.png"
//               alt="User Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           {/* Text below image */}
//           <div className="text-center text-black">
//             <div className="font-semibold">Beargrass(FE-24)</div>
//             <div className="text-sm">Maam</div>
//           </div>
//         </div>
//       )}

//       <div className="p-4 text-gray-600 text-sm font-semibold">MENU</div>

//       <div className="space-y-1">
//         {routeItems.map((item, index) => (
//           <div key={index}>
//             {item.children ? (
//               <>
//                 {/* Parent with sub-routes */}
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
//                     className={`ml-2 transform transition-transform duration-300 ${
//                       openMenus[item.label] ? "rotate-90" : ""
//                     }`}
//                   >
//                     ▸
//                   </span>
//                 </div>

//                 {/* Child (sub-menu) items */}
//                 <div
//                   ref={(el) => {
//                     submenuRefs.current[item.label] = el;
//                   }}
//                   style={{
//                     maxHeight: openMenus[item.label]
//                       ? submenuRefs.current[item.label]?.scrollHeight
//                       : 0,
//                     transition: "max-height 0.3s ease",
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

// export default MerchantSidebarMenu;
