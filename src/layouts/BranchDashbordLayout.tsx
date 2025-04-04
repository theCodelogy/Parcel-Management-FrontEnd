import React, { useState, useEffect, useRef } from "react";
import {
  User,
  LogOut,
  Menu,
  Bell,
  ChevronLeft,
  ChevronsUpDown,
  X,
  LayoutDashboard,
  Package,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const MenuToggle: React.FC<MenuToggleProps> = ({
  isOpen,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-md transition-colors hover:bg-gray-200 ${className}`}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
};

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClass = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  return (
    <div className={`font-bold ${sizeClass} ${className}`}>
      <span className="text-blue-500">ClassicCourier</span>
      <span className="text-gray-800">BD</span>
    </div>
  );
};

interface NavItemProps {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  path: string;
  children?: {
    id: string;
    label: string;
    path: string;
  }[];
  showLabel: boolean;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  path,
  children,
  showLabel,
  isCollapsed,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const childrenRef = useRef<HTMLDivElement>(null);

  // Check if the current path or any child path is active
  const isActive =
    location.pathname === path ||
    (children?.some((child) => location.pathname.startsWith(child.path)) ??
      false);

  // Expand this item if a child is active
  useEffect(() => {
    if (children?.some((child) => location.pathname.startsWith(child.path))) {
      setIsOpen(true);
    }
  }, [children, location.pathname]);

  // Update height for animation when children change or isOpen changes
  useEffect(() => {
    if (childrenRef.current) {
      setHeight(isOpen ? childrenRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  // Render a simple NavLink if there are no children
  if (!children || children.length === 0) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => {
          const base =
            "mb-2 flex items-center p-2 rounded-md transition-all duration-300 " +
            (!showLabel ? "justify-center" : "");
          const activeClass = isActive
            ? "font-semibold text-black bg-blue-50"
            : "text-gray-600 hover:bg-gray-100 ";
          return `${base} ${activeClass} group`;
        }}
        title={!showLabel ? label : undefined}
      >
        {({ isActive }) => (
          <div
            className={`flex items-center transition-all duration-300 transform ${
              showLabel ? "group-hover:translate-x-1" : ""
            }`}
          >
            <Icon
              className={`w-5 h-5 min-w-5 ${isActive ? "text-blue-500" : ""}`}
            />
            {showLabel && (
              <span className="ml-3 truncate text-sm">{label}</span>
            )}
          </div>
        )}
      </NavLink>
    );
  }

  // Render a collapsible section if there are children
  return (
    <div className="mb-2">
      <button
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={`w-full flex items-center p-2 rounded-md transition-all duration-300 ${
          isActive
            ? "font-semibold text-black bg-blue-50 "
            : "text-gray-600 hover:bg-gray-100"
        } ${!showLabel ? "justify-center" : ""} group`}
        title={!showLabel ? label : undefined}
      >
        <div
          className={`flex items-center transition-all duration-300 ${
            showLabel ? "group-hover:translate-x-1" : ""
          } ${showLabel ? "w-full justify-between" : ""}`}
        >
          <div className="flex items-center">
            <Icon
              className={`w-5 h-5 min-w-5 ${isActive ? "text-blue-500" : ""}`}
            />
            {showLabel && (
              <span className="ml-3 truncate text-sm">{label}</span>
            )}
          </div>
          {showLabel && (
            <ChevronDown
              className={`w-4 h-4 duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>

      {/* Sub-menu items with height animation */}
      {showLabel && (
        <div
          ref={childrenRef}
          style={{ height: `${height}px` }}
          className="overflow-hidden transition-all duration-300 ease-in-out ml-7 mt-1 space-y-1 border-l border-gray-200 pl-2"
        >
          <div className="pt-1 pb-1">
            {children.map((child) => (
              <NavLink
                key={child.id}
                to={child.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 mx-2 my-1 text-sm rounded-md transition-all duration-200 group
                   ${
                     isActive
                       ? "font-semibold text-blue-600 bg-blue-50 shadow-s transform"
                       : "text-gray-600 hover:bg-gray-100"
                   }`
                }
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    location.pathname === child.path
                      ? "bg-blue-500"
                      : "bg-gray-400"
                  } mr-2`}
                />
                <span className="truncate transition-transform duration-300 group-hover:translate-x-1">
                  {child.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: { name: string; email: string };
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  userProfile,
  isCollapsed,
  toggleCollapse,
  isMobile,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // On mobile/tablet, always show both icon and label.
  const showLabel = !isCollapsed || isMobile;

  // Navigation items with explicit paths
  const navItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/branch/dashboard",
    },
    {
      id: "Delivery Man",
      label: "Delivery Man",
      icon: User,
      path: "/branch/deliveryman",
    },
    {
      id: "Merchant Manage",
      label: "Merchant Manage",
      icon: FileText,
      path: "/branch/merchant-manage",
    },
    {
      id: "Parcel",
      label: "Parcel",
      icon: Package,
      path: "/branch/parcels",
    },
    {
      id: "Settings",
      label: "Settings",
      icon: FileText,
      path: "/branch/setting",
      children: [
        {
          id: "Delivery Charge",
          label: "Delivery Charge",
          path: "/branch/setting/delivery-charge",
        },
        {
          id: "Packaging",
          label: "Packaging",
          path: "/branch/setting/packaging",
        },
      ],
    },
  ];

  // logout
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/branch/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close sidebar on ESC key press on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showProfileMenu) {
          setShowProfileMenu(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, showProfileMenu]);

  const toggleProfileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-white flex flex-col border-r border-gray-200 shadow-lg z-50 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          {showLabel && <Logo />}
          <button
            onClick={onClose}
            className="lg:hidden hover:bg-gray-200 rounded-md p-1.5 transition-colors text-gray-800"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              showLabel={showLabel}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
        {/* Profile Section */}
        <div
          ref={profileRef}
          className={`mt-auto border-t border-gray-200 bg-gray-50 relative ${
            !showLabel ? "p-2 text-center" : "p-4"
          }`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`cursor-pointer rounded-md transition-all duration-200 ${
                  !showLabel
                    ? "flex justify-center"
                    : "flex items-center space-x-3 hover:bg-white p-2 hover:shadow-sm"
                }`}
                onClick={toggleProfileMenu}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 shadow-md">
                  {userProfile.name[0]}
                </div>
                {showLabel && (
                  <>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-gray-800">
                        {userProfile.name}
                      </div>
                      <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">
                        {userProfile.email}
                      </div>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-gray-600" />
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 mt-1 rounded-lg shadow-lg border border-gray-200 bg-white">
              <div className="flex items-center space-x-4 p-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 shadow-md">
                  {userProfile.name[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-gray-800">
                    {userProfile.name}
                  </div>
                  <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">
                    {userProfile.email}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                onClick={handleProfile}
                className="flex items-center py-2 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 mr-2 text-blue-500" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center py-2 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className={`absolute top-20 -right-3 hidden lg:flex items-center justify-center w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md transition-transform duration-300 ease-in-out text-blue-600 hover:text-blue-800
          ${isCollapsed ? "rotate-180" : ""}`}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </aside>
    </>
  );
};

const BranchDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const userProfile = {
    name: "Khaled Ahemed Nayeem",
    email: "khaledahmed@example.com",
  };

  // Build breadcrumb segments from the current URL path
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const checkIfMobile = () => {
      // Define mobile as any screen below 1024px.
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false);
      }
    };

    checkIfMobile();
    const handleResize = () => {
      checkIfMobile();
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header
        className={`fixed top-0 z-40 h-16 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm transition-all duration-300 text-gray-800
          ${
            isMobile
              ? "left-0 right-0"
              : isCollapsed
              ? "lg:left-16"
              : "lg:left-64"
          } right-0 px-4 md:px-6`}
      >
        <div className="flex items-center">
          <MenuToggle
            isOpen={isSidebarOpen}
            onClick={toggleSidebar}
            className="mr-2 lg:hidden"
          />
          <Logo className={`${!isMobile && !isCollapsed ? "lg:hidden" : ""}`} />
        </div>
        <div className="flex items-center gap-3 relative">
          <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full transition-colors hover:bg-gray-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userProfile={userProfile}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 ${
          isMobile ? "" : isCollapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        <div className="p-4 md:p-6">
          <div className="">
            <div className="mb-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem key="dashboard">
                    <BreadcrumbLink asChild>
                      <NavLink to="/branch/dashboard">Dashboard</NavLink>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnames.slice(1).map((value, index) => {
                    const isLast = index === pathnames.slice(1).length - 1;
                    const to = `/branch/${pathnames
                      .slice(1, index + 2)
                      .join("/")}`;
                    return (
                      <React.Fragment key={to}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{value}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <NavLink to={to}>{value}</NavLink>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BranchDashboardLayout;
