import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { adminRoutes, RouteItem } from "../../../routes/Admin.Routes";
import { merchantRoutes } from "../../../routes/Merchant.Routes";
import { riderRoutes } from "../../../routes/Rider.Routes";

interface SidebarMenuProps {
  role: "admin" | "merchant" | "rider";
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ role }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  // Ref to store submenu container references for smooth toggling.
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Retrieve role-specific route items.
  const getRoutesForRole = (): RouteItem[] => {
    switch (role) {
      case "admin":
        return adminRoutes;
      case "merchant":
        return merchantRoutes;
      case "rider":
        return riderRoutes;
      default:
        return [];
    }
  };

  const routeItems = getRoutesForRole();

  return (
    <div
      style={{ height: "calc(100vh - 64.8px)" }} // Adjust height to match your navbar if needed.
      className="w-64 bg-white shadow-lg overflow-y-auto hide-scrollbar hidden lg:block pb-6"
    >
      <div className="p-4 text-gray-600 text-sm font-semibold">MENU</div>
      <div className="space-y-1">
        {routeItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              // Render a clickable div for items with children that toggles the submenu.
              <div
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleMenu(item.label)}
                role="button"
                tabIndex={0}
              >
                {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                <span className="flex-grow">{item.label}</span>
                <span
                  className={`ml-2 transform transition-transform duration-300 ease-out ${
                    openMenus[item.label] ? "rotate-90" : "rotate-0"
                  }`}
                >
                  ›
                </span>
              </div>
            ) : (
              // Render a Link for items without children.
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                <span className="flex-grow">{item.label}</span>
              </Link>
            )}
            {item.children && (
              <div
                ref={(el) => {
                  submenuRefs.current[item.label] = el;
                }}
                style={{
                  maxHeight: openMenus[item.label]
                    ? submenuRefs.current[item.label]?.scrollHeight
                    : 0,
                  transition: "max-height 0.3s ease-out",
                }}
                className="overflow-hidden"
              >
                <div className="ml-8 space-y-1 py-1">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      to={child.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {child.icon && <child.icon className="w-4 h-4 mr-3" />}
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;
