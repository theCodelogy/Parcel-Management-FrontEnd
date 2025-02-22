import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface AuthState {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  openingBalance: string;
  password: string;
  vatPercent: string;
  hub: string;
  nid: string;
  status: string;
  tradeLicense: File | null;
  image: File | null;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUserActivation: boolean;
  address: string;
  returnCharge: number;
  insideCity: string;
  subCity: string;
  outsideCity: string;
  showPassword: boolean;
  loading: boolean;
}

const CreateMerchantsPage: React.FC = () => {
  const [state, setState] = useState<AuthState>({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    openingBalance: "",
    password: "",
    vatPercent: "",
    hub: "",
    nid: "",
    status: "",
    tradeLicense: null,
    image: null,
    referenceName: "",
    referencePhone: "",
    paymentPeriod: 0,
    walletUserActivation: false,
    address: "",
    returnCharge: 100, // default value 100%
    insideCity: "",
    subCity: "",
    outsideCity: "",
    showPassword: false,
    loading: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setState({ ...state, tradeLicense: e.target.files[0] });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setState({ ...state, image: e.target.files[0] });
    }
  };

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean => password.length >= 8;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setState({ ...state, loading: true });

    // Log form values
    console.log("Business Name:", state.businessName);
    console.log("Name:", state.name);
    console.log("Email:", state.email);
    console.log("Phone:", state.phone);
    console.log("Opening Balance:", state.openingBalance);
    console.log("Password:", state.password);
    console.log("VAT (%):", state.vatPercent);
    console.log("Hub:", state.hub);
    console.log("NID:", state.nid);
    console.log("Status:", state.status);
    console.log("Trade License:", state.tradeLicense);
    console.log("Image:", state.image);
    console.log("Reference Name:", state.referenceName);
    console.log("Reference Phone:", state.referencePhone);
    console.log("Payment Period (Days):", state.paymentPeriod);
    console.log("Wallet User Activation:", state.walletUserActivation);
    console.log("Address:", state.address);
    console.log("Return Charge (%):", state.returnCharge);
    console.log("Inside City:", state.insideCity);
    console.log("Sub City:", state.subCity);
    console.log("Outside City:", state.outsideCity);

    setTimeout(() => {
      setState({ ...state, loading: false });
      alert("Registered successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        {/* Header */}
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Merchants</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
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
                Name <span className="text-red-500">*</span>
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="you@example.com"
                />
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
                Phone Number <span className="text-red-500">*</span>
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

            {/* Opening Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="text"
                name="openingBalance"
                value={state.openingBalance}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="e.g., 1000"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
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
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() =>
                    setState({ ...state, showPassword: !state.showPassword })
                  }
                >
                  {state.showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {state.password && !validatePassword(state.password) && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* VAT (%) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT (%)
              </label>
              <input
                type="text"
                name="vatPercent"
                value={state.vatPercent}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="e.g., 15"
              />
            </div>

            {/* Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hub"
                value={state.hub}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Hub Name"
              />
            </div>

            {/* NID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NID
              </label>
              <input
                type="text"
                name="nid"
                value={state.nid}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="National ID"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                name="status"
                value={state.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Status"
              />
            </div>

            {/* Trade License Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trade License Image
              </label>
              <input
                type="file"
                name="tradeLicense"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
              />
            </div>

            {/* Image Field (after Trade License) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full"
                accept="image/*"
              />
            </div>

            <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
              Reference
            </h2>

            {/* Reference Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referencing Name
              </label>
              <input
                type="text"
                name="referenceName"
                value={state.referenceName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Name"
              />
            </div>

            {/* Reference Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Phone
              </label>
              <input
                type="text"
                name="referencePhone"
                value={state.referencePhone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Phone"
              />
            </div>

            {/* Payment Period (Days) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Period (Days)
              </label>
              <input
                type="number"
                name="paymentPeriod"
                value={state.paymentPeriod}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Number of days"
              />
            </div>

            {/* Wallet User Activation */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="walletUserActivation"
                checked={state.walletUserActivation}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Wallet Use Activation
              </label>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
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

            {/* Return Charge (%) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charge (%)
              </label>
              <input
                type="number"
                name="returnCharge"
                value={state.returnCharge}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charge Percentage"
              />
            </div>

            <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
              COD Charge
            </h2>

            {/* Inside City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inside City
              </label>
              <input
                type="text"
                name="insideCity"
                value={state.insideCity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Inside City"
              />
            </div>

            {/* Sub City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub City
              </label>
              <input
                type="text"
                name="subCity"
                value={state.subCity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Sub City"
              />
            </div>

            {/* Outside City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outside City
              </label>
              <input
                type="text"
                name="outsideCity"
                value={state.outsideCity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Outside City"
              />
            </div>
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
      </div>
    </div>
  );
};

export default CreateMerchantsPage;
