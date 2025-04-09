import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import logo from "../../../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, X, AlignJustify } from "lucide-react";

// Define User interface
interface IUser {
  name?: string;
  email?: string;
  role?: "Super Admin" | "Merchant" | "Branch" | "Delivery Man";
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  // 👇 Cast user to expected type
  const user = useAppSelector((state) => state.auth.user) as IUser | null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDashboardClick = () => {
    if (user?.role === "Super Admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "Merchant") {
      navigate("/merchant/dashboard");
    } else if (user?.role === "Branch") {
      navigate("/branch/dashboard");
    } else if (user?.role === "Delivery Man") {
      navigate("/rider/assigned-parcels");
    }
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Tracking", to: "/tracking" },
    { name: "About Us", to: "/about-us" },
    { name: "Contact Us", to: "/contact-us" },
  ];

  return (
    <nav className="bg-white shadow fixed w-full z-10 top-0 font-bold text-black">
      <div className="max-w-7xl mx-auto sm:px-0">
        <div className="flex justify-between h-16 px-2 sm:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Link className="flex items-center gap-1" to="/">
              <img
                className="w-12 h-12 md:w-14 md:h-14"
                src={logo}
                alt="Logo"
              />
              <span className="text-xl md:text-2xl">ClassicCourierBD</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6 font-normal">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`hover:text-[#A31621] hover:underline transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-[#A31621] underline"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center px-4 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200">
                    <User className="w-6 h-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={handleDashboardClick}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-[#A31621] rounded-xl text-[#A31621] hover:bg-[#A31621] hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="px-4 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none px-2"
              aria-label="Toggle Menu"
            >
              {open ? (
                <X className="w-8 h-8" />
              ) : (
                <AlignJustify className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:text-[#A31621] hover:bg-white transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-[#A31621] underline"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-2 px-3">
              {token ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center px-3 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200">
                      <User className="w-6 h-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={handleDashboardClick}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block text-center px-3 py-2 border border-[#A31621] rounded-xl text-[#A31621] hover:bg-[#A31621] hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    onClick={() => setOpen(false)}
                    className="block text-center px-3 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
