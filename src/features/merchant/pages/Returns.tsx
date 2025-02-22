// import { useState } from "react";

// interface TableData {
//   trackingId: string;
//   invoiceNo: string;
//   date: string;
//   customer: string;
//   phone: string;
//   addressDetails: string;
//   collectionAmount: number;
//   charge: number;
//   payableAmount: number;
//   createdDate: string;
//   status: string;
//   paymentStatus: string;
// }

// const demoData: TableData[] = [
//   {
//     trackingId: "FE03012531795564",
//     invoiceNo: "INV2001",
//     date: "05-Jan-25, 07:30 PM",
//     customer: "Karim",
//     phone: "01811223344",
//     addressDetails: "Area: Banani, Address: Sector-3, House-17, Banani",
//     collectionAmount: 2800,
//     charge: 90,
//     payableAmount: 2710,
//     createdDate: "January 05, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795568",
//     invoiceNo: "INV2002",
//     date: "09-Jan-25, 06:50 PM",
//     customer: "Nusrat",
//     phone: "01799887766",
//     addressDetails: "Area: Tejgaon, Address: Road-7, House-5, Tejgaon",
//     collectionAmount: 2900,
//     charge: 95,
//     payableAmount: 2805,
//     createdDate: "January 09, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795572",
//     invoiceNo: "INV2003",
//     date: "13-Jan-25, 07:15 AM",
//     customer: "Imran",
//     phone: "01855667788",
//     addressDetails: "Area: Dhanmondi, Address: Road-11, House-21, Dhanmondi",
//     collectionAmount: 2400,
//     charge: 75,
//     payableAmount: 2325,
//     createdDate: "January 13, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795575",
//     invoiceNo: "INV2004",
//     date: "15-Jan-25, 10:05 AM",
//     customer: "Rafiq",
//     phone: "01788990011",
//     addressDetails: "Area: Banani, Address: Sector-5, House-9, Banani",
//     collectionAmount: 2800,
//     charge: 90,
//     payableAmount: 2710,
//     createdDate: "January 15, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795579",
//     invoiceNo: "INV2005",
//     date: "20-Jan-25, 08:50 AM",
//     customer: "Farhana",
//     phone: "01522334455",
//     addressDetails: "Area: Gulshan, Address: Block-B, Road-12, Gulshan",
//     collectionAmount: 3300,
//     charge: 120,
//     payableAmount: 3180,
//     createdDate: "January 20, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795582",
//     invoiceNo: "INV2006",
//     date: "23-Jan-25, 09:30 AM",
//     customer: "Mita",
//     phone: "01812345678",
//     addressDetails: "Area: Uttara, Address: Road-5, House-15, Uttara",
//     collectionAmount: 3100,
//     charge: 115,
//     payableAmount: 2985,
//     createdDate: "January 23, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795583",
//     invoiceNo: "INV2007",
//     date: "24-Jan-25, 10:45 AM",
//     customer: "Javed",
//     phone: "01998765432",
//     addressDetails: "Area: Mirpur, Address: Road-9, House-11, Mirpur",
//     collectionAmount: 2750,
//     charge: 85,
//     payableAmount: 2665,
//     createdDate: "January 24, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795584",
//     invoiceNo: "INV2008",
//     date: "25-Jan-25, 11:20 AM",
//     customer: "Razia",
//     phone: "01776543210",
//     addressDetails: "Area: Dhanmondi, Address: Road-12, House-20, Dhanmondi",
//     collectionAmount: 2950,
//     charge: 105,
//     payableAmount: 2845,
//     createdDate: "January 25, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795585",
//     invoiceNo: "INV2009",
//     date: "26-Jan-25, 12:00 PM",
//     customer: "Faisal",
//     phone: "01687654321",
//     addressDetails: "Area: Bashundhara, Address: Block-E, Road-14, Bashundhara",
//     collectionAmount: 3200,
//     charge: 110,
//     payableAmount: 3090,
//     createdDate: "January 26, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795586",
//     invoiceNo: "INV2010",
//     date: "27-Jan-25, 01:15 PM",
//     customer: "Selina",
//     phone: "01855667799",
//     addressDetails: "Area: Gulshan, Address: Road-15, House-5, Gulshan",
//     collectionAmount: 3050,
//     charge: 100,
//     payableAmount: 2950,
//     createdDate: "January 27, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795587",
//     invoiceNo: "INV2011",
//     date: "28-Jan-25, 02:40 PM",
//     customer: "Arif",
//     phone: "01933445577",
//     addressDetails: "Area: Tejgaon, Address: Road-18, House-3, Tejgaon",
//     collectionAmount: 3300,
//     charge: 125,
//     payableAmount: 3175,
//     createdDate: "January 28, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
//   {
//     trackingId: "FE03012531795588",
//     invoiceNo: "INV2012",
//     date: "29-Jan-25, 03:50 PM",
//     customer: "Shirin",
//     phone: "01722334455",
//     addressDetails: "Area: Banani, Address: Sector-8, House-7, Banani",
//     collectionAmount: 3100,
//     charge: 115,
//     payableAmount: 2985,
//     createdDate: "January 29, 2025",
//     status: "Returned",
//     paymentStatus: "Unpaid",
//   },
// ];

// function generatePageNumbers(
//   currentPage: number,
//   totalPages: number
// ): (number | string)[] {
//   const pages: (number | string)[] = [];

//   if (totalPages <= 5) {
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else {
//     pages.push(1);

//     if (currentPage <= 3) {
//       pages.push(2, 3, 4);
//       pages.push("...");
//     } else if (currentPage < totalPages - 2) {
//       pages.push("...");
//       pages.push(currentPage - 1, currentPage, currentPage + 1);
//       pages.push("...");
//     } else {
//       pages.push("...");
//       pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
//     }

//     pages.push(totalPages);
//   }

//   return pages;
// }

// // Helper function to return badge classes based on status
// const getStatusBadgeClass = (status: string) => {
//   switch (status) {
//     case "Delivered":
//       return "bg-green-100 text-green-800";
//     case "Pending":
//       return "bg-yellow-100 text-yellow-800";
//     case "Returned":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// const Returns = () => {
//   // Set how many rows per page (adjust as needed)
//   const pageSize: number = 10;
//   // Track the current page
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   // Calculate total pages based on your data
//   const totalPages: number = Math.ceil(demoData.length / pageSize);

//   // Get the slice of data for the current page
//   const startIndex: number = (currentPage - 1) * pageSize;
//   const currentData = demoData.slice(startIndex, startIndex + pageSize);

//   // Handlers for previous/next buttons
//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg">
//       {/* Search Filters */}
//       <div className="flex flex-wrap gap-4 mb-5">
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           placeholder="Track Id"
//         />
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           placeholder="Phone Number"
//         />
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           placeholder="Invoice No"
//         />
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           type="date"
//           placeholder="Date From"
//         />
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           type="date"
//           placeholder="Date To"
//         />
//         <select className="p-2 border border-gray-300 rounded text-sm">
//           <option value="all">All</option>
//         </select>
//         <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
//           Submit
//         </button>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center mb-5 gap-2">
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Copy
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Excel
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Csv
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           PDF
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Print
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Print all
//         </button>
//         <button className="ml-auto relative pr-8 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
//           Column visibility
//         </button>
//         <input
//           className="p-2 border border-gray-300 rounded text-sm"
//           placeholder="Search"
//         />
//       </div>

//       {/* Table with x-axis scrolling */}
//       <div className="overflow-x-scroll rounded-lg">
//         <table className="w-max table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 SL
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Tracking ID
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Invoice No
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Date
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Customer
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Phone
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Address Details
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Collection Amount
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Charge
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Payable Amount
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Created Date
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Status
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 Payment Status
//               </th>
//               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                 More
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length === 0 ? (
//               <tr>
//                 <td colSpan={14} className="p-4 text-center text-gray-500">
//                   No data available in table
//                 </td>
//               </tr>
//             ) : (
//               currentData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-gray-50 transition duration-300"
//                 >
//                   <td className="p-4">{startIndex + index + 1}</td>
//                   <td className="p-4">{row.trackingId}</td>
//                   <td className="p-4">{row.invoiceNo}</td>
//                   <td className="p-4">{row.date}</td>
//                   <td className="p-4">{row.customer}</td>
//                   <td className="p-4">{row.phone}</td>
//                   <td className="p-4">{row.addressDetails}</td>
//                   <td className="p-4">{row.collectionAmount}</td>
//                   <td className="p-4">{row.charge}</td>
//                   <td className="p-4">{row.payableAmount}</td>
//                   <td className="p-4">{row.createdDate}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
//                         row.status
//                       )}`}
//                     >
//                       {row.status}
//                     </span>
//                   </td>
//                   <td className="p-4">{row.paymentStatus}</td>
//                   <td className="p-4">...</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
//         <p className="text-gray-600">
//           Showing{" "}
//           {currentData.length > 0
//             ? `${startIndex + 1} to ${Math.min(
//                 startIndex + pageSize,
//                 demoData.length
//               )}`
//             : "0 to 0"}{" "}
//           of {demoData.length} entries
//         </p>
//         <div className="flex items-center space-x-1">
//           {/* Previous Button */}
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className={`px-3 py-1 border rounded-md transition ${
//               currentPage === 1
//                 ? "cursor-not-allowed text-gray-400 border-gray-300"
//                 : "hover:bg-gray-200 text-gray-700"
//             }`}
//           >
//             &lt;
//           </button>

//           {/* Page Numbers with Ellipses */}
//           {generatePageNumbers(currentPage, totalPages).map((page, index) =>
//             page === "..." ? (
//               <span key={index} className="px-3 py-1 text-gray-500 select-none">
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(page as number)}
//                 className={`px-3 py-1 border rounded-md transition ${
//                   page === currentPage
//                     ? "bg-indigo-600 text-white border-indigo-600"
//                     : "hover:bg-gray-200 text-gray-700 border-gray-300"
//                 }`}
//               >
//                 {page}
//               </button>
//             )
//           )}

//           {/* Next Button */}
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-3 py-1 border rounded-md transition ${
//               currentPage === totalPages
//                 ? "cursor-not-allowed text-gray-400 border-gray-300"
//                 : "hover:bg-gray-200 text-gray-700"
//             }`}
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Returns;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReturns } from "../services/returnsApi";
import { TableData } from "../types";

// Helper function for pagination page numbers
function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("...");
    } else if (currentPage < totalPages - 2) {
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    } else {
      pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1);
    }
    pages.push(totalPages);
  }
  return pages;
}

const Returns = () => {
  // Use TanStack Query to fetch data using Axios
  const { data, isLoading, error } = useQuery<TableData[]>({
    queryKey: ["returns"],
    queryFn: fetchReturns,
  });

  // State for pagination
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize: number = 10;

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error || !data) {
    return <div>Error fetching data.</div>;
  }

  const totalPages: number = Math.ceil(data.length / pageSize);
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  // Helper to determine status badge classes
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Returned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      {/* Search Filters */}
      <div className="flex flex-wrap gap-4 mb-5">
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Track Id"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Phone Number"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Invoice No"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          type="date"
          placeholder="Date From"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          type="date"
          placeholder="Date To"
        />
        <select className="p-2 border border-gray-300 rounded text-sm">
          <option value="all">All</option>
        </select>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
          Submit
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center mb-5 gap-2">
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Copy
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Excel
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Csv
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          PDF
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Print
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Print all
        </button>
        <button className="ml-auto relative pr-8 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Column visibility
        </button>
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Search"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-scroll rounded-lg">
        <table className="w-max table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                SL
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Tracking ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Invoice No
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Address Details
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Collection Amount
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Charge
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Payable Amount
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Created Date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Payment Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={14} className="p-4 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-300"
                >
                  <td className="p-4">{startIndex + index + 1}</td>
                  <td className="p-4">{row.trackingId}</td>
                  <td className="p-4">{row.invoiceNo}</td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4">{row.customer}</td>
                  <td className="p-4">{row.phone}</td>
                  <td className="p-4">{row.addressDetails}</td>
                  <td className="p-4">{row.collectionAmount}</td>
                  <td className="p-4">{row.charge}</td>
                  <td className="p-4">{row.payableAmount}</td>
                  <td className="p-4">{row.createdDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">{row.paymentStatus}</td>
                  <td className="p-4">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <p className="text-gray-600">
          Showing{" "}
          {currentData.length > 0
            ? `${startIndex + 1} to ${Math.min(
                startIndex + pageSize,
                data.length
              )}`
            : "0 to 0"}{" "}
          of {data.length} entries
        </p>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-400 border-gray-300"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            &lt;
          </button>
          {generatePageNumbers(currentPage, totalPages).map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-1 text-gray-500 select-none">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 border rounded-md transition ${
                  page === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "hover:bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400 border-gray-300"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Returns;
