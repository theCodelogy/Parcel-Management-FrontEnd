import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import logo from "../../../assets/logo.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Consistent set of navigation links
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Tracking", to: "/tracking" },
    { name: "About Us", to: "/about-us" },
    { name: "Contact Us", to: "/contact-us" },
  ];

  return (
    <nav className="bg-white shadow fixed w-full z-10 top-0 font-bold text-black">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link className="flex items-center gap-1" to="/">
              <img className="w-14 h-14" src={logo} alt="Logo" />
              <span className="text-2xl">ClassicCourierBD</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 font-normal">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-[#A31621] hover:underline transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons for Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200"
              >
                Logout
              </button>
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? (
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden bg-gray-100 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#A31621] hover:bg-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-2 px-3">
              {token ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#A31621] text-[#FCF7F8] hover:bg-[#8e141a] transition-colors duration-200"
                >
                  Logout
                </button>
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
