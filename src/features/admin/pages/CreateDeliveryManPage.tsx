import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hostImage } from "../../../utils/hostImageOnIMGBB";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hoocks/useAxiosSecure";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface AuthState {
  name: string;
  phone: string;
  email: string;
  deliveryCharge: number;
  returnCharge: number;
  pickupCharge: number;
  openingBalance: string;
  password: string;
  salary: number;
  status: string;
  hub: string;
  drivingLicense: File | null;
  image: File | null;
  address: string;
  showPassword: boolean;
  loading: boolean;
}

export type TDeliveryMan = {
  name: string;
  phone: string;
  email: string;
  role: "Delivery Man";
  deliveryCharge: number;
  returnCharge: number;
  pickupCharge: number;
  openingBalance: number;
  password: string;
  salary: number;
  status: "Pending" | "Active" | "Disabled";
  hub: string;
  drivingLicence?: string;
  image?: string;
  address: string;
};

const CreateDeliveryManPage: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthState>();
  const [state, setState] = useState<AuthState>({
    name: "",
    phone: "",
    email: "",
    deliveryCharge: 0,
    returnCharge: 0,
    pickupCharge: 0,
    openingBalance: "",
    password: "",
    salary: 0,
    status: "Pending",
    hub: "",
    drivingLicense: null,
    image: null,
    address: "",
    showPassword: false,
    loading: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0 && e.target.name === "drivingLicense") {
      setState((prevState) => ({
        ...prevState,
        drivingLicense: files[0],
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setState((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    }
  };

  const onSubmit = async (data: AuthState): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const payload: TDeliveryMan = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: "Delivery Man",
      deliveryCharge: Number(data.deliveryCharge),
      returnCharge: Number(data.returnCharge),
      pickupCharge: Number(data.pickupCharge),
      openingBalance: Number(data.openingBalance),
      password: data.password,
      salary: Number(data.salary),
      status: "Active",
      hub: data.hub,
      address: data.address,
    };

    if (state.drivingLicense) {
      const drivinglicenceUrl = await hostImage(state.drivingLicense);
      payload.drivingLicence = drivinglicenceUrl;
    }

    if (state.image) {
      const imageUrl = await hostImage(state.image);
      payload.image = imageUrl;
    }

    try {
      const res = await axiosSecure.post("/deliveryMan", payload);
      const responseData = res.data;
      if (responseData.success) {
        console.log(responseData);
        toast.success("Successfully Delivery Man added!");
        navigate("/admin/delivery-man"); // Redirect to the delivery man page
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding Delivery Man");
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Delivery Man
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">Name is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">Phone is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Delivery Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Charge
              </label>
              <input
                type="number"
                {...register("deliveryCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Delivery Charge"
              />
              {errors.deliveryCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Delivery Charge is required
                </p>
              )}
            </div>

            {/* Return Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charge
              </label>
              <input
                type="number"
                {...register("returnCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charge"
              />
              {errors.returnCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Return Charge is required
                </p>
              )}
            </div>

            {/* Pickup Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Charge
              </label>
              <input
                type="number"
                {...register("pickupCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Pickup Charge"
              />
              {errors.pickupCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Pickup Charge is required
                </p>
              )}
            </div>

            {/* Opening Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="number"
                {...register("openingBalance", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Opening Balance"
              />
              {errors.openingBalance && (
                <p className="mt-1 text-sm text-red-600">
                  Opening Balance is required
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      showPassword: !prevState.showPassword,
                    }))
                  }
                >
                  {state.showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                {...register("salary", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Salary"
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-600">Salary is required</p>
              )}
            </div>

            {/* Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub
              </label>
              <input
                type="text"
                {...register("hub", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Hub"
              />
              {errors.hub && (
                <p className="mt-1 text-sm text-red-600">Hub is required</p>
              )}
            </div>

            {/* Driving License */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driving License
              </label>
              <label className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 text-center cursor-pointer">
                {state.drivingLicense
                  ? state.drivingLicense.name
                  : "Choose Driving License File"}
                <input
                  type="file"
                  name="drivingLicense"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <label className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 text-center cursor-pointer">
                {state.image ? state.image.name : "Choose Image File"}
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">Address is required</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
              disabled={state.loading}
            >
              {state.loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeliveryManPage;
