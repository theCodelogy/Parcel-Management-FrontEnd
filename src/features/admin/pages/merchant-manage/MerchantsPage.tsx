// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   FaEllipsisV,
//   FaEdit,
//   FaTrash,
//   FaPlus,
//   FaSearch,
//   FaFileInvoice,
// } from "react-icons/fa";
// import { fetchMerchantsApi } from "../../services/merchantsApi";
// import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
// import TablePagination from "../../../../components/ui/TablePagination";

// const MerchantsPage = () => {
//   // Fetch merchants using TanStack Query
//   const {
//     data: merchants = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["merchants"],
//     queryFn: fetchMerchantsApi,
//   });

//   // State for dropdown actions, search term, and pagination (1-based page numbering)
//   const [openDropdown, setOpenDropdown] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const pageSize = 10; // Adjust the page size as needed

//   // Filter merchants based on the search term
//   const filteredMerchants = merchants.filter(
//     (merchant) =>
//       merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       merchant.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       merchant.phone.includes(searchTerm)
//   );

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
//   // Determine current page data using 1-based page numbering
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = filteredMerchants.slice(
//     startIndex,
//     startIndex + pageSize
//   );

//   const handleCreateMerchant = () => {
//     alert("Create Merchant button clicked!");
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading merchants...</div>;
//   }

//   if (isError) {
//     return <div className="p-6">Error fetching merchants data.</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       {/* Header, search and create merchant button */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-900">Merchant List</h2>
//         <div className="flex justify-center">
//           <div className="relative w-80% max-w-md">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 // Reset to first page on search change
//                 setCurrentPage(1);
//               }}
//               className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 w-full"
//             />
//             <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>
//         <button
//           onClick={handleCreateMerchant}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//         >
//           <FaPlus className="mr-2" /> Create Merchant
//         </button>
//       </div>

//       {/* Merchants table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-3 text-left">SL</th>
//               <th className="p-3 text-left">Details</th>
//               <th className="p-3 text-left">Hub</th>
//               <th className="p-3 text-left">Business Name</th>
//               <th className="p-3 text-left">Unique ID</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Current Balance</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900">
//             {currentData.map((merchant, index) => (
//               <tr key={merchant.id} className="border-t border-gray-200">
//                 <td className="p-3">{startIndex + index + 1}</td>
//                 <td className="p-3 flex items-center">
//                   <img
//                     src={merchant.avatar}
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full mr-3"
//                   />
//                   {merchant.details}
//                 </td>
//                 <td className="p-3">{merchant.hub}</td>
//                 <td className="p-3">{merchant.businessName}</td>
//                 <td className="p-3">{merchant.uniqueId}</td>
//                 <td className="p-3">{merchant.phone}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                       merchant.status === "Active"
//                         ? "bg-green-200 text-green-800"
//                         : "bg-red-200 text-red-800"
//                     }`}
//                   >
//                     {merchant.status}
//                   </span>
//                 </td>
//                 <td className="p-3">{merchant.currentBalance}</td>
//                 <td className="p-3 relative">
//                   <button
//                     className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
//                     onClick={() =>
//                       setOpenDropdown(
//                         openDropdown === merchant.id ? null : merchant.id
//                       )
//                     }
//                   >
//                     <FaEllipsisV />
//                   </button>
//                   {openDropdown === merchant.id && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                       <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
//                         <FaFileInvoice className="mr-2" /> Generate Invoice
//                       </button>
//                       <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
//                         <FaSearch className="mr-2" /> View
//                       </button>
//                       <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
//                         <FaEdit className="mr-2" /> Edit
//                       </button>
//                       <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
//                         <FaTrash className="mr-2" /> Delete
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls and information */}
//       <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
//         <TablePaginationInfo
//           startIndex={startIndex}
//           pageSize={pageSize}
//           totalEntries={filteredMerchants.length}
//           currentDataLength={currentData.length}
//         />

//         <TablePagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//           onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           onNextPage={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default MerchantsPage;
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFileInvoice,
} from "react-icons/fa";
import { fetchMerchantsApi } from "../../services/merchantsApi";
import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../../components/ui/TablePagination";

const MerchantsPage = () => {
  // Fetch merchants using TanStack Query
  const {
    data: merchants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["merchants"],
    queryFn: fetchMerchantsApi,
  });

  // State for dropdown actions, search term, and pagination (1-based page numbering)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Adjust the page size as needed

  // Filter merchants based on the search term
  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.phone.includes(searchTerm)
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
  // Determine current page data using 1-based page numbering
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredMerchants.slice(
    startIndex,
    startIndex + pageSize
  );

  if (isLoading) {
    return <div className="p-6">Loading merchants...</div>;
  }

  if (isError) {
    return <div className="p-6">Error fetching merchants data.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Header, search and create merchant link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Merchant List</h2>
        <div className="flex justify-center">
          <div className="relative w-80% max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Reset to first page on search change
                setCurrentPage(1);
              }}
              className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 w-full"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <Link
          to="/admin/create-merchant"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Create Merchant
        </Link>
      </div>

      {/* Merchants table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Hub</th>
              <th className="p-3 text-left">Business Name</th>
              <th className="p-3 text-left">Unique ID</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Current Balance</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {currentData.map((merchant, index) => (
              <tr key={merchant.id} className="border-t border-gray-200">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3 flex items-center">
                  <img
                    src={merchant.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {merchant.details}
                </td>
                <td className="p-3">{merchant.hub}</td>
                <td className="p-3">{merchant.businessName}</td>
                <td className="p-3">{merchant.uniqueId}</td>
                <td className="p-3">{merchant.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      merchant.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {merchant.status}
                  </span>
                </td>
                <td className="p-3">{merchant.currentBalance}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === merchant.id ? null : merchant.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>
                  {openDropdown === merchant.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <FaFileInvoice className="mr-2" /> Generate Invoice
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <FaSearch className="mr-2" /> View
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls and information */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
        <TablePaginationInfo
          startIndex={startIndex}
          pageSize={pageSize}
          totalEntries={filteredMerchants.length}
          currentDataLength={currentData.length}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      </div>
    </div>
  );
};

export default MerchantsPage;
