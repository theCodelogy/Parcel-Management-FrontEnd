// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// interface AuthState {
//   name: string;
//   phone: string;
//   email: string;
//   deliveryCharge: number;
//   returnCharge: number;
//   pickupCharge: number;
//   openingBalance: string;
//   password: string;
//   salary: number;
//   status: string;
//   hub: string;
//   drivingLicense: File | null;
//   image: File | null;
//   address: string;
//   showPassword: boolean;
//   loading: boolean;
// }

// const CreateDeliveryManPage: React.FC = () => {
//   const [state, setState] = useState<AuthState>({
//     name: "",
//     phone: "",
//     email: "",
//     deliveryCharge: 0,
//     returnCharge: 0,
//     pickupCharge: 0,
//     openingBalance: "",
//     password: "",
//     salary: 0,
//     status: "",
//     hub: "",
//     drivingLicense: null,
//     image: null,
//     address: "",
//     showPassword: false,
//     loading: false,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ): void => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
//     setState({
//       ...state,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "number"
//           ? Number(value)
//           : value,
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     if (e.target.files && e.target.name === "drivingLicense") {
//       setState({ ...state, drivingLicense: e.target.files[0] });
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     if (e.target.files) {
//       setState({ ...state, image: e.target.files[0] });
//     }
//   };

//   const validateEmail = (email: string): boolean =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validatePassword = (password: string): boolean => password.length >= 8;

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();
//     setState({ ...state, loading: true });

//     // Create form data to send, including files
//     const formData = new FormData();
//     formData.append("name", state.name);
//     formData.append("phone", state.phone);
//     formData.append("email", state.email);
//     formData.append("deliveryCharge", state.deliveryCharge.toString());
//     formData.append("returnCharge", state.returnCharge.toString());
//     formData.append("pickupCharge", state.pickupCharge.toString());
//     formData.append("openingBalance", state.openingBalance);
//     formData.append("password", state.password);
//     formData.append("salary", state.salary.toString());
//     formData.append("status", state.status);
//     formData.append("hub", state.hub);
//     formData.append("address", state.address);

//     if (state.drivingLicense) {
//       formData.append("drivingLicense", state.drivingLicense);
//     }

//     if (state.image) {
//       formData.append("image", state.image);
//     }

//     try {
//       const response = await axios.post(
//         "https://parcel-management-back-end.vercel.app/api/v1/deliveryMan",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);
//       alert("Registered successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setState({ ...state, loading: false });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
//         {/* Header */}
//         <div className="col-span-2 mb-6 text-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Create Delivery Man
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={state.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Name"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={state.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Phone Number"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   value={state.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               {state.email && !validateEmail(state.email) && (
//                 <p className="mt-1 text-sm text-red-600">
//                   Please enter a valid email address
//                 </p>
//               )}
//             </div>

//             {/* Delivery Charge */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Delivery Charge
//               </label>
//               <input
//                 type="number"
//                 name="deliveryCharge"
//                 value={state.deliveryCharge}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Delivery Charge"
//               />
//             </div>

//             {/* Return Charge */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Return Charge
//               </label>
//               <input
//                 type="number"
//                 name="returnCharge"
//                 value={state.returnCharge}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Return Charge"
//               />
//             </div>

//             {/* Pickup Charge */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Pickup Charge
//               </label>
//               <input
//                 type="number"
//                 name="pickupCharge"
//                 value={state.pickupCharge}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Pickup Charge"
//               />
//             </div>

//             {/* Opening Balance */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Opening Balance
//               </label>
//               <input
//                 type="text"
//                 name="openingBalance"
//                 value={state.openingBalance}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Opening Balance"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={state.showPassword ? "text" : "password"}
//                   name="password"
//                   value={state.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-2 text-gray-400"
//                   onClick={() =>
//                     setState({ ...state, showPassword: !state.showPassword })
//                   }
//                 >
//                   {state.showPassword ? (
//                     <FaEyeSlash className="w-5 h-5" />
//                   ) : (
//                     <FaEye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {state.password && !validatePassword(state.password) && (
//                 <p className="mt-1 text-sm text-red-600">
//                   Password must be at least 8 characters
//                 </p>
//               )}
//             </div>

//             {/* Salary */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Salary
//               </label>
//               <input
//                 type="number"
//                 name="salary"
//                 value={state.salary}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Salary"
//               />
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <input
//                 type="text"
//                 name="status"
//                 value={state.status}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Status"
//               />
//             </div>

//             {/* Hub */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Hub
//               </label>
//               <input
//                 type="text"
//                 name="hub"
//                 value={state.hub}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Hub"
//               />
//             </div>

//             {/* Driving License */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Driving License
//               </label>
//               <label className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 text-center cursor-pointer">
//                 {state.drivingLicense
//                   ? state.drivingLicense.name
//                   : "Choose Driving License File"}
//                 <input
//                   type="file"
//                   name="drivingLicense"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="hidden"
//                   required
//                 />
//               </label>
//             </div>

//             {/* Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image
//               </label>
//               <label className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 text-center cursor-pointer">
//                 {state.image ? state.image.name : "Choose Image File"}
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                   required
//                 />
//               </label>
//             </div>

//             {/* Address */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={state.address}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Address"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               disabled={state.loading}
//               className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
//             >
//               {state.loading ? "Processing..." : "Register"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateDeliveryManPage;

import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  drivingLicence: string;
  image?: string;
  address: string;
};

const CreateDeliveryManPage: React.FC = () => {
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
    if (e.target.files && e.target.name === "drivingLicense") {
      setState({ ...state, drivingLicense: e.target.files[0] });
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setState({ ...state, loading: true });

    // Build payload that conforms to TDeliveryMan
    const payload: TDeliveryMan = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      role: "Delivery Man",
      deliveryCharge: state.deliveryCharge,
      returnCharge: state.returnCharge,
      pickupCharge: state.pickupCharge,
      openingBalance: Number(state.openingBalance),
      password: state.password,
      salary: state.salary,
      status: state.status as "Pending" | "Active" | "Disabled",
      hub: state.hub,
      drivingLicence: state.drivingLicense ? state.drivingLicense.name : "",
      image: state.image ? state.image.name : undefined,
      address: state.address,
    };

    // Log the payload to the console
    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        "https://parcel-management-back-end.vercel.app/api/v1/deliveryMan",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Registered successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setState({ ...state, loading: false });
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
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
              </div>
              {state.email && !validateEmail(state.email) && (
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
                name="deliveryCharge"
                value={state.deliveryCharge}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Delivery Charge"
              />
            </div>

            {/* Return Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charge
              </label>
              <input
                type="number"
                name="returnCharge"
                value={state.returnCharge}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charge"
              />
            </div>

            {/* Pickup Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Charge
              </label>
              <input
                type="number"
                name="pickupCharge"
                value={state.pickupCharge}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Pickup Charge"
              />
            </div>

            {/* Opening Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="number"
                name="openingBalance"
                value={state.openingBalance}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Opening Balance"
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

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={state.salary}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Salary"
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
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Pending, Active, or Disabled"
              />
            </div>

            {/* Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub
              </label>
              <input
                type="text"
                name="hub"
                value={state.hub}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Hub"
              />
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
                name="address"
                value={state.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Address"
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

export default CreateDeliveryManPage;
