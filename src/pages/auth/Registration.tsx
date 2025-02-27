import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

interface AuthState {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  address: string;
  showPassword: boolean;
  loading: boolean;
  termsAccepted: boolean;
}

const Registration: React.FC = () => {
  const [state, setState] = useState<AuthState>({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "",
    address: "",
    showPassword: false,
    loading: false,
    termsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean => password.length >= 8;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!state.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
    setState({ ...state, loading: true });

    console.log("Business Name:", state.businessName);
    console.log("Name:", state.name);
    console.log("Email:", state.email);
    console.log("Phone:", state.phone);
    console.log("Status:", state.status);
    console.log("Address:", state.address);

    setTimeout(() => {
      setState({ ...state, loading: false });
      alert("Registered successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-auto p-8">
        {/* Header */}
        <div className="col-span-2 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <FaUserPlus className="text-red-600 text-lg" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Get started with your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={state.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Business Name"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="you@example.com"
                />
                <FaEnvelope className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              {state.email && !validateEmail(state.email) && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() =>
                    setState({ ...state, showPassword: !state.showPassword })
                  }
                >
                  {state.showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              {state.password && !validatePassword(state.password) && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={state.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Address"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={state.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm">
              I agree to City & Town Express Privacy Policy & Terms.
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={state.loading}
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              {state.loading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link to="/login" className="text-[#d63384] font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
