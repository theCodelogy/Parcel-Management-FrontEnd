import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  ChevronRight,
  ChevronLeft,
  ChevronsUpDown,
  X,
  Truck,
  Wallet,
  FileText,
  PackagePlus,
  LayoutDashboard,
} from "lucide-react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Navigation items with explicit paths.
  const navItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/merchant/dashboard",
      active: true,
    },
    {
      id: "All Orders",
      label: "All Orders",
      icon: Truck,
      path: "/merchant/all-orders",
    },
    {
      id: "Returns",
      label: "Returns",
      icon: Wallet,
      path: "/merchant/returns",
    },
    {
      id: "Invoice",
      label: "Invoice",
      icon: FileText,
      path: "/merchant/invoice",
    },
    {
      id: "Settings",
      label: "Settings",
      icon: Settings,
      path: "/merchant/settings",
    },
    {
      id: "Support",
      label: "Support",
      icon: HelpCircle,
      path: "/merchant/support",
    },
    {
      id: "Create Parcel",
      label: "Create Parcel",
      icon: PackagePlus,
      path: "/merchant/create-parcel",
    },
  ];

  // logout
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-white/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-white flex flex-col border-r border-gray-200 z-50 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          {showLabel && <Logo />}
          <button
            onClick={onClose}
            className="lg:hidden hover:bg-gray-200 rounded-md p-1 transition-colors text-gray-800"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => {
                const base =
                  "mb-2 flex items-center p-2 rounded-md transition-colors " +
                  (!showLabel ? "justify-center" : "");
                const activeClass = isActive
                  ? "font-semibold text-black bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100";
                return `${base} ${activeClass} group`;
              }}
              title={!showLabel ? item.label : undefined}
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center transition-all duration-300 transform ${
                    showLabel ? "group-hover:translate-x-1" : ""
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 min-w-5 ${
                      isActive ? "text-blue-500" : ""
                    }`}
                  />
                  {showLabel && (
                    <span className="ml-3 truncate text-sm">{item.label}</span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile section - Always at bottom */}
        <div
          ref={profileRef}
          className={`mt-auto border-t border-gray-200 relative ${
            !showLabel ? "p-2 text-center" : "p-4"
          }`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`cursor-pointer rounded-md transition-colors ${
                  !showLabel
                    ? "flex justify-center"
                    : "flex items-center space-x-3 hover:bg-gray-100 p-1"
                }`}
                onClick={toggleProfileMenu}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
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
            {showProfileMenu && (
              <DropdownMenuContent className="w-full p-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
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
                <DropdownMenuSeparator className="my-4" />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="absolute top-20 -right-3 hidden lg:flex items-center justify-center w-6 h-6 bg-gray-200 border border-gray-300 rounded-full shadow-md transition-colors hover:bg-gray-300 text-gray-600"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>
    </>
  );
};

const MerchantDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userProfile = {
    name: "Khaled Ahemed Nayeem",
    email: "khaledahmed@example.com",
  };

  useEffect(() => {
    const checkIfMobile = () => {
      // Define mobile as any screen below 1024px.
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, disable collapse.
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
        className={`fixed top-0 z-40 h-16 flex items-center justify-between bg-white border-b border-gray-200 transition-all duration-300 text-gray-800
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
          <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full transition-colors hover:bg-gray-200">
            <Bell className="w-5 h-5" />
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
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-1">
                Welcome back, Merchant
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Here's your Merchant dashboard overview
              </p>
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MerchantDashboardLayout;
