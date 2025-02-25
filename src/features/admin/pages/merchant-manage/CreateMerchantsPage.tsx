// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { hostImage } from "../../../../utils/hostImageOnIMGBB";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../../../Hoocks/useAxiosSecure";

// const CreateMerchantsPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const payload = {
//       ...data,
//       vat: Number(data.vatPercent),
//       walletUseActivation: data.walletUserActivation,
//       returnCharges: Number(data.returnCharge),
//       codCharge: {
//         insideCity: Number(data.insideCity),
//         subCity: Number(data.subCity),
//         outsideCity: Number(data.outsideCity),
//       },
//       openingBalance: Number(data.openingBalance),
//       paymentPeriod: Number(data.paymentPeriod),
//     };

//     // Host tradeLicense
//     if (data.tradeLicense[0]) {
//       const tradeLicensUrl = await hostImage(data.tradeLicense[0]);
//       payload.tradeLicense = tradeLicensUrl;
//     }
//     // Host image
//     if (data.image[0]) {
//       const imageUrl = await hostImage(data.image[0]);
//       payload.image = imageUrl;
//     }

//     try {
//       const res = await axiosSecure.post("/merchant", payload);
//       const responseData = await res.data;
//       if (responseData.success) {
//         toast.success("Successfully Merchant add!");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message);
//     }

//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
//         <div className="col-span-2 mb-6 text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Create Merchants</h2>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Business Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("businessName", { required: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Business Name"
//               />
//               {errors.businessName && (
//                 <p className="mt-1 text-sm text-red-600">
//                   This field is required
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("name", { required: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Name"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">
//                   This field is required
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 {...register("email", {
//                   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="you@example.com"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">
//                   Please enter a valid email address
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("phone", { required: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Phone Number"
//               />
//               {errors.phone && (
//                 <p className="mt-1 text-sm text-red-600">
//                   This field is required
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Opening Balance
//               </label>
//               <input
//                 type="number"
//                 {...register("openingBalance", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="e.g., 1000"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", { required: true, minLength: 8 })}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-2 text-gray-400"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash className="w-5 h-5" />
//                   ) : (
//                     <FaEye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">
//                   Password must be at least 8 characters
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 VAT (%)
//               </label>
//               <input
//                 type="number"
//                 {...register("vatPercent", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="e.g., 15"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Hub <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("hub", { required: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Hub Name"
//               />
//               {errors.hub && (
//                 <p className="mt-1 text-sm text-red-600">
//                   This field is required
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 NID
//               </label>
//               <input
//                 type="text"
//                 {...register("nid")}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="National ID"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <input
//                 type="text"
//                 {...register("status")}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Status"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Trade License Image
//               </label>
//               <input
//                 type="file"
//                 {...register("tradeLicense")}
//                 className="w-full"
//                 accept="image/*"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image
//               </label>
//               <input
//                 type="file"
//                 {...register("image")}
//                 className="w-full"
//                 accept="image/*"
//               />
//             </div>

//             <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
//               Reference
//             </h2>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Referencing Name
//               </label>
//               <input
//                 type="text"
//                 {...register("referenceName")}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Reference Name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Reference Phone
//               </label>
//               <input
//                 type="text"
//                 {...register("referencePhone")}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Reference Phone"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Payment Period (Days)
//               </label>
//               <input
//                 type="number"
//                 {...register("paymentPeriod", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Number of days"
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 {...register("walletUserActivation")}
//                 className="mr-2"
//               />
//               <label className="text-sm font-medium text-gray-700">
//                 Wallet Use Activation
//               </label>
//             </div>

//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("address", { required: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Your Address"
//               />
//               {errors.address && (
//                 <p className="mt-1 text-sm text-red-600">
//                   This field is required
//                 </p>
//               )}
//             </div>

//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Return Charge (%)
//               </label>
//               <input
//                 type="number"
//                 {...register("returnCharge", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Return Charge Percentage"
//               />
//             </div>

//             <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
//               COD Charge
//             </h2>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Inside City
//               </label>
//               <input
//                 type="number"
//                 {...register("insideCity", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Inside City"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sub City
//               </label>
//               <input
//                 type="number"
//                 {...register("subCity", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Sub City"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Outside City
//               </label>
//               <input
//                 type="number"
//                 {...register("outsideCity", { valueAsNumber: true })}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
//                 placeholder="Outside City"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
//             >
//               {loading ? "Processing..." : "Register"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateMerchantsPage;

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hostImage } from "../../../../utils/hostImageOnIMGBB";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hoocks/useAxiosSecure";

// Define the form input types
interface IFormInput {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  openingBalance: number;
  password: string;
  vatPercent: number;
  hub: string;
  nid: string;
  status: string;
  tradeLicense: FileList;
  image: FileList;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUserActivation: boolean;
  address: string;
  returnCharge: number;
  insideCity: number;
  subCity: number;
  outsideCity: number;
}

const CreateMerchantsPage: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      vat: data.vatPercent,
      walletUseActivation: data.walletUserActivation,
      returnCharges: data.returnCharge,
      codCharge: {
        insideCity: data.insideCity,
        subCity: data.subCity,
        outsideCity: data.outsideCity,
      },
      openingBalance: data.openingBalance,
      paymentPeriod: data.paymentPeriod,
    };

    // Host tradeLicense
    if (data.tradeLicense.length > 0) {
      const tradeLicensUrl = await hostImage(data.tradeLicense[0]);
      payload.tradeLicense = tradeLicensUrl;
    }
    // Host image
    if (data.image.length > 0) {
      const imageUrl = await hostImage(data.image[0]);
      payload.image = imageUrl;
    }

    try {
      const res = await axiosSecure.post("/merchant", payload);
      const responseData = await res.data;
      if (responseData.success) {
        toast.success("Successfully Merchant add!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Merchants</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("businessName", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Business Name"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="number"
                {...register("openingBalance", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="e.g., 1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 8 })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT (%)
              </label>
              <input
                type="number"
                {...register("vatPercent", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="e.g., 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("hub", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Hub Name"
              />
              {errors.hub && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NID
              </label>
              <input
                type="text"
                {...register("nid")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="National ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                {...register("status")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Status"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trade License Image
              </label>
              <input
                type="file"
                {...register("tradeLicense")}
                className="w-full"
                accept="image/*"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                {...register("image")}
                className="w-full"
                accept="image/*"
              />
            </div>

            <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
              Reference
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referencing Name
              </label>
              <input
                type="text"
                {...register("referenceName")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Phone
              </label>
              <input
                type="text"
                {...register("referencePhone")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Period (Days)
              </label>
              <input
                type="number"
                {...register("paymentPeriod", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Number of days"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("walletUserActivation")}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Wallet Use Activation
              </label>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charge (%)
              </label>
              <input
                type="number"
                {...register("returnCharge", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charge Percentage"
              />
            </div>

            <h2 className="col-span-2 text-2xl font-semibold text-gray-800">
              COD Charge
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inside City
              </label>
              <input
                type="number"
                {...register("insideCity", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Inside City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub City
              </label>
              <input
                type="number"
                {...register("subCity", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Sub City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outside City
              </label>
              <input
                type="number"
                {...register("outsideCity", { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Outside City"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMerchantsPage;
