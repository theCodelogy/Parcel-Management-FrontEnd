// // import React, { useState } from "react";

// // interface DeliveryCharges {
// //   cashCollection: number;
// //   deliveryCharge: number;
// //   itemPrice: number;
// //   codCharge: number;
// //   totalPayable: number;
// // }

// // const CreateParcel: React.FC = () => {
// //   const [charges, setCharges] = useState<DeliveryCharges>({
// //     cashCollection: 0,
// //     deliveryCharge: 0,
// //     itemPrice: 0,
// //     codCharge: 0,
// //     totalPayable: 0,
// //   });
// //   const [agreed, setAgreed] = useState(false);
// //   const [selectedDivision, setSelectedDivision] = useState("");
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   // Mapping divisions to their districts
// //   const districtsByDivision: { [key: string]: string[] } = {
// //     dhaka: [
// //       "Dhaka",
// //       "Faridpur",
// //       "Gazipur",
// //       "Gopalganj",
// //       "Kishoreganj",
// //       "Madaripur",
// //       "Manikganj",
// //       "Munshiganj",
// //       "Narayanganj",
// //       "Narsingdi",
// //       "Rajbari",
// //       "Shariatpur",
// //       "Tangail",
// //     ],
// //     chattogram: [
// //       "Chattogram",
// //       "Cox's Bazar",
// //       "Bandarban",
// //       "Rangamati",
// //       "Khagrachari",
// //       "Noakhali",
// //       "Feni",
// //       "Comilla",
// //       "Lakshmipur",
// //       "Brahmanbaria",
// //       "Chandpur",
// //     ],
// //     rajshahi: [
// //       "Rajshahi",
// //       "Natore",
// //       "Chapai Nawabganj",
// //       "Pabna",
// //       "Bogura",
// //       "Joypurhat",
// //       "Naogaon",
// //       "Sirajganj",
// //     ],
// //     khulna: [
// //       "Khulna",
// //       "Jessore",
// //       "Satkhira",
// //       "Bagerhat",
// //       "Narail",
// //       "Magura",
// //       "Meherpur",
// //       "Chuadanga",
// //       "Jhenaidah",
// //       "Kushtia",
// //     ],
// //     barisal: [
// //       "Barguna",
// //       "Barisal",
// //       "Bhola",
// //       "Jhalokati",
// //       "Patuakhali",
// //       "Pirojpur",
// //     ],
// //     sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
// //     rangpur: [
// //       "Rangpur",
// //       "Dinajpur",
// //       "Gaibandha",
// //       "Kurigram",
// //       "Lalmonirhat",
// //       "Nilphamari",
// //       "Panchagarh",
// //       "Thakurgaon",
// //     ],
// //     mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Handle form submission here
// //     console.log("Form submitted");
// //   };

// //   // Added handleUpload function for the Bulk Upload modal.
// //   const handleUpload = () => {
// //     // Handle file upload functionality here
// //     console.log("File upload triggered");
// //   };

// //   return (
// //     <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
// //       <div className="flex flex-col lg:flex-row gap-6">
// //         {/* Form Section */}
// //         <div className="flex-1">
// //           {/* Bulk Upload Button */}
// //           <button
// //             onClick={() => setIsModalOpen(true)}
// //             className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 mb-6 transition duration-200"
// //           >
// //             Bulk Upload
// //           </button>

// //           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
// //             Add New Parcel
// //           </h2>

// //           <form onSubmit={handleSubmit}>
// //             <div className="space-y-6">
// //               {/* Customer Info Section */}
// //               <section>
// //                 <h3 className="text-xl font-medium mb-4 text-gray-700">
// //                   Customer Info
// //                 </h3>
// //                 <div className="space-y-4">
// //                   <input
// //                     type="text"
// //                     placeholder="Customer Name"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Customer Phone Number"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   />
// //                   <textarea
// //                     placeholder="Customer Full Address"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
// //                   />
// //                 </div>
// //               </section>

// //               {/* Delivery Info Section */}
// //               <section>
// //                 <h3 className="text-xl font-medium mb-4 text-gray-700">
// //                   Delivery Info
// //                 </h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                   {/* Delivery Area */}
// //                   <select
// //                     defaultValue=""
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   >
// //                     <option value="" disabled>
// //                       Delivery Area
// //                     </option>
// //                     <option value="4">ঢাকার ভিতরে (ID- 4)</option>
// //                     <option value="3">ঢাকা সাব এরিয়া (ID- 3)</option>
// //                     <option value="2">ঢাকার বাইরে (ID- 2)</option>
// //                   </select>

// //                   {/* Delivery Service */}
// //                   <select
// //                     defaultValue="1"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   >
// //                     <option value="" disabled>
// //                       Delivery Service
// //                     </option>
// //                     <option value="1">Regular Delivery (ID- 1)</option>
// //                     <option value="2">Express Delivery (ID- 2)</option>
// //                     <option value="4">Same Day Delivery (ID- 4)</option>
// //                   </select>

// //                   {/* Product Type */}
// //                   <select
// //                     defaultValue="1"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   >
// //                     <option value="" disabled>
// //                       Product Type
// //                     </option>
// //                     <option value="1">Regular Parcel (ID- 1)</option>
// //                     <option value="8">Mango (ID- 8)</option>
// //                     <option value="9">Frozen (ID- 9)</option>
// //                     <option value="10">Glass Items (ID- 10)</option>
// //                   </select>

// //                   {/* Division (Optional) */}
// //                   <select
// //                     defaultValue=""
// //                     onChange={(e) => setSelectedDivision(e.target.value)}
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   >
// //                     <option value="">Select Division (optional)</option>
// //                     <option value="dhaka">Dhaka Division</option>
// //                     <option value="chattogram">Chattogram Division</option>
// //                     <option value="rajshahi">Rajshahi Division</option>
// //                     <option value="khulna">Khulna Division</option>
// //                     <option value="barisal">Barisal Division</option>
// //                     <option value="sylhet">Sylhet Division</option>
// //                     <option value="rangpur">Rangpur Division</option>
// //                     <option value="mymensingh">Mymensingh Division</option>
// //                   </select>

// //                   {/* District (Optional) */}
// //                   <select
// //                     defaultValue=""
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   >
// //                     <option value="">Select District (optional)</option>
// //                     {selectedDivision &&
// //                     districtsByDivision[selectedDivision] ? (
// //                       districtsByDivision[selectedDivision].map(
// //                         (district, index) => (
// //                           <option key={index} value={district.toLowerCase()}>
// //                             {district}
// //                           </option>
// //                         )
// //                       )
// //                     ) : (
// //                       <option disabled>Please select a division first</option>
// //                     )}
// //                   </select>

// //                   <input
// //                     type="text"
// //                     placeholder="Cash Collection Amount"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Invoice ID"
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   />
// //                   <input
// //                     type="text"
// //                     value="1"
// //                     readOnly
// //                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                   />
// //                 </div>
// //                 <textarea
// //                   placeholder="Note (optional)"
// //                   className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
// //                 />
// //               </section>

// //               {/* Terms & Submit Section */}
// //               <div className="space-y-4">
// //                 <label className="flex items-center gap-2 cursor-pointer">
// //                   <input
// //                     type="checkbox"
// //                     checked={agreed}
// //                     onChange={(e) => setAgreed(e.target.checked)}
// //                     className="w-4 h-4 text-purple-600"
// //                   />
// //                   <span className="text-sm text-gray-600">
// //                     I agree to the Terms & Conditions
// //                   </span>
// //                 </label>

// //                 <button
// //                   type="submit"
// //                   disabled={!agreed}
// //                   className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
// //                 >
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Delivery Charges Card */}
// //         <div className="w-full lg:w-80">
// //           <div className="bg-white rounded-lg shadow-sm">
// //             <div className="p-4 border-b border-gray-200 bg-gray-50">
// //               <h3 className="text-lg font-medium text-gray-800">
// //                 Delivery Charge Details
// //               </h3>
// //             </div>

// //             <div className="p-4">
// //               <div className="space-y-2">
// //                 <div className="flex justify-between p-3 rounded-md">
// //                   <span className="text-gray-600">Cash Collection</span>
// //                   <span className="font-medium">
// //                     {charges.cashCollection} Tk
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between p-3 rounded-md">
// //                   <span className="text-gray-600">Delivery Charge</span>
// //                   <span className="font-medium">
// //                     {charges.deliveryCharge} Tk
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between p-3 rounded-md">
// //                   <span className="text-gray-600">Item Price</span>
// //                   <span className="font-medium">{charges.itemPrice} Tk</span>
// //                 </div>

// //                 <div className="flex justify-between p-3 rounded-md">
// //                   <span className="text-gray-600">Cod Charge</span>
// //                   <span className="font-medium">{charges.codCharge} Tk</span>
// //                 </div>

// //                 <div className="pt-3 border-t border-gray-200 mt-3">
// //                   <div className="flex justify-between p-3 rounded-md bg-purple-100 font-medium">
// //                     <span className="text-gray-800">Total Payable Amount</span>
// //                     <span className="text-purple-700">
// //                       {charges.totalPayable} Tk
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 p-3 bg-gray-50 rounded-md">
// //                   <p className="text-sm text-gray-500 text-center">
// //                     Note: If you request for pick up after 5pm, it will be
// //                     collected on the next day.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal for Bulk Upload with a slightly black overlay */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center z-50">
// //           {/* Overlay with slight opacity */}
// //           <div
// //             className="absolute inset-0 bg-black opacity-30"
// //             onClick={() => setIsModalOpen(false)}
// //           ></div>

// //           {/* Modal Content */}
// //           <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl z-10">
// //             {/* Close Icon (top-right) */}
// //             <button
// //               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
// //               onClick={() => setIsModalOpen(false)}
// //             >
// //               <svg
// //                 className="h-5 w-5"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth={2}
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   d="M6 18L18 6M6 6l12 12"
// //                 />
// //               </svg>
// //             </button>

// //             {/* Heading and Sample File Link */}
// //             <h2 className="text-lg font-semibold mb-4">
// //               Excel File Column Instruction (
// //               <a
// //                 href="#"
// //                 className="text-blue-500 underline hover:text-blue-700"
// //               >
// //                 Sample file
// //               </a>
// //               )
// //             </h2>

// //             {/* Table of required columns */}
// //             <div className="overflow-x-auto mb-4">
// //               <table className="min-w-full border text-sm text-center">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="p-2 border">Customer Name</th>
// //                     <th className="p-2 border">Product Type</th>
// //                     <th className="p-2 border">Customer Phone</th>
// //                     <th className="p-2 border">Cash Collection Amount</th>
// //                     <th className="p-2 border">Customer Address</th>
// //                     <th className="p-2 border">Delivery Zone</th>
// //                     <th className="p-2 border">Weight</th>
// //                   </tr>
// //                 </thead>
// //               </table>
// //             </div>

// //             {/* Upload Section */}
// //             <p className="font-medium mb-2">Upload Excel</p>
// //             <div className="flex items-center gap-2 mb-4">
// //               <input type="file" />
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex justify-end gap-2">
// //               <button
// //                 onClick={handleUpload}
// //                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
// //               >
// //                 Upload
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CreateParcel;

// import React, { useState } from "react";

// interface DeliveryCharges {
//   cashCollection: number;
//   deliveryCharge: number;
//   itemPrice: number;
//   codCharge: number;
//   totalPayable: number;
// }

// const CreateParcel: React.FC = () => {
//   const [charges, setCharges] = useState<DeliveryCharges>({
//     cashCollection: 0,
//     deliveryCharge: 0,
//     itemPrice: 0,
//     codCharge: 0,
//     totalPayable: 0,
//   });
//   const [agreed, setAgreed] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log("Form submitted");
//   };

//   // Added handleUpload function for the Bulk Upload modal.
//   const handleUpload = () => {
//     // Handle file upload functionality here
//     console.log("File upload triggered");
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Form Section */}
//         <div className="flex-1">
//           {/* Bulk Upload Button */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 mb-6 transition duration-200"
//           >
//             Bulk Upload
//           </button>

//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//             Add New Parcel
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {/* Customer Info Section */}
//               <section>
//                 <h3 className="text-xl font-medium mb-4 text-gray-700">
//                   Customer Info
//                 </h3>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Customer Name"
//                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Customer Phone Number"
//                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
//                   />
//                   <textarea
//                     placeholder="Customer Full Address"
//                     className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
//                   />
//                 </div>
//               </section>

//               {/* Terms & Submit Section */}
//               <div className="space-y-4">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={agreed}
//                     onChange={(e) => setAgreed(e.target.checked)}
//                     className="w-4 h-4 text-purple-600"
//                   />
//                   <span className="text-sm text-gray-600">
//                     I agree to the Terms & Conditions
//                   </span>
//                 </label>

//                 <button
//                   type="submit"
//                   disabled={!agreed}
//                   className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Delivery Charges Card */}
//         <div className="w-full lg:w-80">
//           <div className="bg-white rounded-lg shadow-sm">
//             <div className="p-4 border-b border-gray-200 bg-gray-50">
//               <h3 className="text-lg font-medium text-gray-800">
//                 Delivery Charge Details
//               </h3>
//             </div>

//             <div className="p-4">
//               <div className="space-y-2">
//                 <div className="flex justify-between p-3 rounded-md">
//                   <span className="text-gray-600">Cash Collection</span>
//                   <span className="font-medium">
//                     {charges.cashCollection} Tk
//                   </span>
//                 </div>

//                 <div className="flex justify-between p-3 rounded-md">
//                   <span className="text-gray-600">Delivery Charge</span>
//                   <span className="font-medium">
//                     {charges.deliveryCharge} Tk
//                   </span>
//                 </div>

//                 <div className="flex justify-between p-3 rounded-md">
//                   <span className="text-gray-600">Item Price</span>
//                   <span className="font-medium">{charges.itemPrice} Tk</span>
//                 </div>

//                 <div className="flex justify-between p-3 rounded-md">
//                   <span className="text-gray-600">Cod Charge</span>
//                   <span className="font-medium">{charges.codCharge} Tk</span>
//                 </div>

//                 <div className="pt-3 border-t border-gray-200 mt-3">
//                   <div className="flex justify-between p-3 rounded-md bg-purple-100 font-medium">
//                     <span className="text-gray-800">Total Payable Amount</span>
//                     <span className="text-purple-700">
//                       {charges.totalPayable} Tk
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4 p-3 bg-gray-50 rounded-md">
//                   <p className="text-sm text-gray-500 text-center">
//                     Note: If you request for pick up after 5pm, it will be
//                     collected on the next day.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Bulk Upload with a slightly black overlay */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Overlay with slight opacity */}
//           <div
//             className="absolute inset-0 bg-black opacity-30"
//             onClick={() => setIsModalOpen(false)}
//           ></div>

//           {/* Modal Content */}
//           <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl z-10">
//             {/* Close Icon (top-right) */}
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <svg
//                 className="h-5 w-5"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Heading and Sample File Link */}
//             <h2 className="text-lg font-semibold mb-4">
//               Excel File Column Instruction (
//               <a
//                 href="#"
//                 className="text-blue-500 underline hover:text-blue-700"
//               >
//                 Sample file
//               </a>
//               )
//             </h2>

//             {/* Table of required columns */}
//             <div className="overflow-x-auto mb-4">
//               <table className="min-w-full border text-sm text-center">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="p-2 border">Customer Name</th>
//                     <th className="p-2 border">Product Type</th>
//                     <th className="p-2 border">Customer Phone</th>
//                     <th className="p-2 border">Cash Collection Amount</th>
//                     <th className="p-2 border">Customer Address</th>
//                     <th className="p-2 border">Delivery Zone</th>
//                     <th className="p-2 border">Weight</th>
//                   </tr>
//                 </thead>
//               </table>
//             </div>

//             {/* Upload Section */}
//             <p className="font-medium mb-2">Upload Excel</p>
//             <div className="flex items-center gap-2 mb-4">
//               <input type="file" />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={handleUpload}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateParcel;


import React, { useState } from "react";

interface DeliveryCharges {
  cashCollection: number;
  deliveryCharge: number;
  itemPrice: number;
  codCharge: number;
  totalPayable: number;
}

const CreateParcel: React.FC = () => {
  const [charges, setCharges] = useState<DeliveryCharges>({
    cashCollection: 0,
    deliveryCharge: 0,
    itemPrice: 0,
    codCharge: 0,
    totalPayable: 0,
  });

  const [formData, setFormData] = useState({
    merchant: "",
    pickupPhone: "",
    pickupAddress: "",
    invoiceNumber: "",
    cashCollection: "",
    sellingPrice: "",
    category: "",
    deliveryType: "",
    packaging: "", // New field for packaging
    note: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    location: "",
    liquidFragile: false,
    priority: false,
    paymentMethod: "COD", // default
  });

  const [agreed, setAgreed] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  const handleUpload = () => {
    console.log("File upload triggered");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Parcel
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Parcel Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Merchant */}
                  <div>
                    <label
                      htmlFor="merchant"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Merchant
                    </label>
                    <select
                      id="merchant"
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Merchant</option>
                      <option value="merchantA">Merchant A</option>
                      <option value="merchantB">Merchant B</option>
                    </select>
                  </div>

                  {/* Pickup Phone */}
                  <div>
                    <label
                      htmlFor="pickupPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Phone
                    </label>
                    <input
                      id="pickupPhone"
                      type="text"
                      name="pickupPhone"
                      placeholder="Pickup Phone"
                      value={formData.pickupPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label
                      htmlFor="pickupAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Address
                    </label>
                    <input
                      id="pickupAddress"
                      type="text"
                      name="pickupAddress"
                      placeholder="Pickup Address"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Cash Collection */}
                  <div>
                    <label
                      htmlFor="cashCollection"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Cash Collection
                    </label>
                    <input
                      id="cashCollection"
                      type="number"
                      name="cashCollection"
                      placeholder="Cash Collection Amount"
                      value={formData.cashCollection}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label
                      htmlFor="sellingPrice"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Selling Price
                    </label>
                    <input
                      id="sellingPrice"
                      type="number"
                      name="sellingPrice"
                      placeholder="Selling Price"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label
                      htmlFor="invoiceNumber"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Invoice Number
                    </label>
                    <input
                      id="invoiceNumber"
                      type="text"
                      name="invoiceNumber"
                      placeholder="Enter Invoice Number"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <label
                      htmlFor="deliveryType"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Delivery Type
                    </label>
                    <select
                      id="deliveryType"
                      name="deliveryType"
                      value={formData.deliveryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Delivery Type</option>
                      <option value="regular">Regular</option>
                      <option value="express">Express</option>
                    </select>
                  </div>

                  {/* Packaging */}
                  <div>
                    <label
                      htmlFor="packaging"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Packaging
                    </label>
                    <select
                      id="packaging"
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Packaging Type</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  {/* Note (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="note"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Note
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      placeholder="Note"
                      value={formData.note}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[80px]"
                    />
                  </div>
                </div>
              </section>

              {/* Customer Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Customer Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Name
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      name="customerName"
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Phone Number
                    </label>
                    <input
                      id="customerPhone"
                      type="text"
                      name="customerPhone"
                      placeholder="Customer Phone Number"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Customer Address (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="customerAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Full Address
                    </label>
                    <textarea
                      id="customerAddress"
                      name="customerAddress"
                      placeholder="Customer Full Address"
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
                    />
                  </div>

                  {/* Location (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="location"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Location Here"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </section>

              {/* Parcel Options Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Liquid/Fragile */}
                  <div className="flex items-center gap-2">
                    <input
                      id="liquidFragile"
                      type="checkbox"
                      name="liquidFragile"
                      checked={formData.liquidFragile}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <label htmlFor="liquidFragile" className="text-gray-700">
                      Liquid/Fragile
                    </label>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <input
                      id="priority"
                      type="checkbox"
                      name="priority"
                      checked={formData.priority}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <label htmlFor="priority" className="text-gray-700">
                      Priority
                    </label>
                  </div>

                  {/* Payment Method (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="paymentMethod"
                      className="block mb-1 text-gray-700 font-medium"
                    >
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="COD">COD</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Terms & Submit Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree to the Terms & Conditions
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Delivery Charges Card */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800">
                Delivery Charge Details
              </h3>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Cash Collection</span>
                  <span className="font-medium">
                    {charges.cashCollection} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">
                    {charges.deliveryCharge} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-medium">
                    {charges.itemPrice} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Cod Charge</span>
                  <span className="font-medium">
                    {charges.codCharge} Tk
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 mt-3">
                  <div className="flex justify-between p-3 rounded-md bg-purple-100 font-medium">
                    <span className="text-gray-800">
                      Total Payable Amount
                    </span>
                    <span className="text-purple-700">
                      {charges.totalPayable} Tk
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500 text-center">
                    Note: If you request for pick up after 5pm, it will be
                    collected on the next day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
