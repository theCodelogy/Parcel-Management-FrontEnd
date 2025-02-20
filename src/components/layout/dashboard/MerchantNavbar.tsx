import React from "react";
import logo from "../../../assets/logo.png";

const MerchantNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center pr-3">
          <img
            src={logo}
            alt="Company Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Search and Avatar Section */}
        <div className="flex items-center space-x-4">
          {/* Search Form */}
          <form className="flex items-center bg-gray-100 rounded-full px-3 py-1 shadow-sm transition-all focus-within:shadow-md">
            <label htmlFor="orderTracking" className="sr-only">
              Track your order
            </label>
            <input
              id="orderTracking"
              type="text"
              placeholder="Track your order..."
              className="bg-transparent outline-none text-sm px-2 py-1 w-full"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-1 rounded-full transition-colors duration-200 hover:bg-purple-700"
            >
              Track
            </button>
          </form>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src="https://i.ibb.co/bFMCnfT/me.png"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MerchantNavbar;
