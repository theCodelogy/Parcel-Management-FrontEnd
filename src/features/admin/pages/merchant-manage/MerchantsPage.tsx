// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaEdit, FaPlus, FaSearch, FaFileInvoice, FaEye } from "react-icons/fa";
// import axios from "axios";
// import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
// import TablePagination from "../../../../components/ui/TablePagination";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-hot-toast";
// import { MoreVerticalIcon, Trash } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// interface Merchant {
//   _id: string;
//   businessName: string;
//   details: string;
//   phone: string;
//   status: string;
//   currentBalance: number;
//   image: string;
//   name: string;
//   email: string;
//   hub: string;
// }

// const fetchMerchantsApi = async () => {
//   try {
//     const response = await axios.get(
//       "https://parcel-management-back-end.vercel.app/api/v1/merchant"
//     );
//     console.log("API Response:", response.data); // Debugging: Log API response
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching merchants:", error); // Debugging: Log API error
//     throw error;
//   }
// };

// const deleteMerchantApi = async (merchantId: string) => {
//   try {
//     const response = await axios.delete(
//       `https://parcel-management-back-end.vercel.app/api/v1/merchant/${merchantId}`
//     );
//     console.log("Delete API Response:", response.data); // Debugging: Log delete API response
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting merchant:", error); // Debugging: Log delete API error
//     throw error;
//   }
// };

// const MerchantsPage = () => {
//   const {
//     data: merchants = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["merchants"],
//     queryFn: fetchMerchantsApi,
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoadingForm, setIsLoadingForm] = useState(false);
//   const pageSize = 10;

//   const navigate = useNavigate(); // Get the navigate function

//   const filteredMerchants = merchants.filter(
//     (merchant: Merchant) =>
//       merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       merchant.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       merchant.phone.includes(searchTerm)
//   );

//   const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = filteredMerchants.slice(
//     startIndex,
//     startIndex + pageSize
//   );

//   const handleDelete = async (merchantId: string) => {
//     setIsLoadingForm(true);
//     try {
//       await deleteMerchantApi(merchantId);
//       toast.success("Merchant deleted successfully");
//       refetch();
//     } catch (error) {
//       console.error("Delete Merchant Error:", error); // Debugging: Log delete error
//       toast.error("Failed to delete merchant");
//     } finally {
//       setIsLoadingForm(false);
//     }
//   };

//   const handleEdit = (merchant) => {
//     navigate("/admin/create-merchants", { state: { merchant } });
//   };

//   const handleGenerateInvoice = (merchant) => {
//     // Implement generate invoice logic here
//     console.log("Generate Invoice for:", merchant.businessName); // Debugging: Log invoice generation
//     toast.success(`Invoice generated for ${merchant.businessName}`);
//   };

//   const handleView = (merchant) => {
//     // Implement view logic here
//     console.log("View Details for:", merchant.businessName); // Debugging: Log view details
//     toast.info(`Viewing details for ${merchant.businessName}`);
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading merchants...</div>;
//   }

//   if (isError) {
//     return <div className="p-6">Error fetching merchants data.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900">Merchant List</h2>
//           <div className="relative w-80% max-w-md">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 w-full"
//             />
//             <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//           <Button
//             variant="default"
//             onClick={() => navigate("/admin/create-merchants")} // Navigate to the create merchant page
//             className="flex items-center gap-2"
//             disabled={isLoadingForm}
//           >
//             <FaPlus className="h-4 w-4" />
//             <span>Create Merchant</span>
//           </Button>
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="p-3 text-left">SL</TableHead>
//                 <TableHead className="p-3 text-left">Details</TableHead>
//                 <TableHead className="p-3 text-left">Hub</TableHead>
//                 <TableHead className="p-3 text-left">Business Name</TableHead>
//                 <TableHead className="p-3 text-left">Unique ID</TableHead>
//                 <TableHead className="p-3 text-left">Phone</TableHead>
//                 <TableHead className="p-3 text-left">Status</TableHead>
//                 <TableHead className="p-3 text-left">Current Balance</TableHead>
//                 <TableHead className="p-3 text-left">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentData.map((merchant, index) => (
//                 <TableRow
//                   key={merchant._id}
//                   className="border-t border-gray-200"
//                 >
//                   <TableCell className="p-3">
//                     {startIndex + index + 1}
//                   </TableCell>
//                   <TableCell className="p-3 flex items-center">
//                     <div>
//                       <img
//                         src={merchant.image}
//                         alt="Avatar"
//                         className="w-8 h-8 rounded-full mr-3"
//                       />
//                       <p className="font-semibold text-xs">{merchant.name}</p>
//                       <p className="text-xs">{merchant.email}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell className="p-3">{merchant.hub}</TableCell>
//                   <TableCell className="p-3">{merchant.businessName}</TableCell>
//                   <TableCell className="p-3">{merchant._id}</TableCell>
//                   <TableCell className="p-3">{merchant.phone}</TableCell>
//                   <TableCell className="p-3">
//                     <span
//                       className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                         merchant.status === "Active"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-red-200 text-red-800"
//                       }`}
//                     >
//                       {merchant.status}
//                     </span>
//                   </TableCell>
//                   <TableCell className="p-3">
//                     {merchant.currentBalance}
//                   </TableCell>
//                   <TableCell className="p-3 relative">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button className="p-1 bg-gray-200 text-white rounded-full">
//                           <MoreVerticalIcon className="h-4 w-4 text-gray-800" />
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-32">
//                         <DropdownMenuItem
//                           className="flex items-center text-sm hover:bg-gray-100"
//                           onClick={() => handleGenerateInvoice(merchant)}
//                         >
//                           <FaFileInvoice className="mr-2" /> Generate Invoice
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="flex items-center text-sm hover:bg-gray-100"
//                           onClick={() => handleView(merchant)}
//                         >
//                           <FaEye className="mr-2" /> View
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="flex items-center text-sm hover:bg-gray-100"
//                           onClick={() => handleEdit(merchant)}
//                         >
//                           <FaEdit className="mr-2" /> Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
//                           onClick={() => handleDelete(merchant._id)}
//                         >
//                           <Trash className="mr-2 focus:text-red-500" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
//           <TablePaginationInfo
//             startIndex={startIndex}
//             pageSize={pageSize}
//             totalEntries={filteredMerchants.length}
//             currentDataLength={currentData.length}
//           />
//           <TablePagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//             onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             onNextPage={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MerchantsPage;
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaPlus, FaSearch, FaFileInvoice, FaEye } from "react-icons/fa";
import axios from "axios";
import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../../components/ui/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { MoreVerticalIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Merchant {
  _id: string;
  businessName: string;
  details: string;
  phone: string;
  status: string;
  currentBalance: number;
  image: string;
  name: string;
  email: string;
  hub: string;
}

const fetchMerchantsApi = async (): Promise<Merchant[]> => {
  try {
    const response = await axios.get(
      "https://parcel-management-back-end.vercel.app/api/v1/merchant"
    );
    console.log("API Response:", response.data); // Debugging: Log API response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching merchants:", error); // Debugging: Log API error
    throw error;
  }
};

const deleteMerchantApi = async (merchantId: string) => {
  try {
    const response = await axios.delete(
      `https://parcel-management-back-end.vercel.app/api/v1/merchant/${merchantId}`
    );
    console.log("Delete API Response:", response.data); // Debugging: Log delete API response
    return response.data;
  } catch (error) {
    console.error("Error deleting merchant:", error); // Debugging: Log delete API error
    throw error;
  }
};

const MerchantsPage = () => {
  const {
    data: merchants = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Merchant[]>({
    queryKey: ["merchants"],
    queryFn: fetchMerchantsApi,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const pageSize = 10;

  const navigate = useNavigate(); // Get the navigate function

  const filteredMerchants = merchants.filter(
    (merchant: Merchant) =>
      merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredMerchants.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleDelete = async (merchantId: string) => {
    setIsLoadingForm(true);
    try {
      await deleteMerchantApi(merchantId);
      toast.success("Merchant deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete Merchant Error:", error); // Debugging: Log delete error
      toast.error("Failed to delete merchant");
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (merchant: Merchant) => {
    navigate("/admin/create-merchants", { state: { merchant } });
  };

  const handleGenerateInvoice = (merchant: Merchant) => {
    // Implement generate invoice logic here
    console.log("Generate Invoice for:", merchant.businessName); // Debugging: Log invoice generation
    toast.success(`Invoice generated for ${merchant.businessName}`);
  };

  const handleView = (merchant: Merchant) => {
    // Implement view logic here
    console.log("View Details for:", merchant.businessName); // Debugging: Log view details
    // toast.info(`Viewing details for ${merchant.businessName}`);
  };

  if (isLoading) {
    return <div className="p-6">Loading merchants...</div>;
  }

  if (isError) {
    return <div className="p-6">Error fetching merchants data.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Merchant List</h2>
          <div className="relative w-80% max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 w-full"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Button
            variant="default"
            onClick={() => navigate("/admin/create-merchants")} // Navigate to the create merchant page
            className="flex items-center gap-2"
            disabled={isLoadingForm}
          >
            <FaPlus className="h-4 w-4" />
            <span>Create Merchant</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3 text-left">SL</TableHead>
                <TableHead className="p-3 text-left">Details</TableHead>
                <TableHead className="p-3 text-left">Hub</TableHead>
                <TableHead className="p-3 text-left">Business Name</TableHead>
                <TableHead className="p-3 text-left">Unique ID</TableHead>
                <TableHead className="p-3 text-left">Phone</TableHead>
                <TableHead className="p-3 text-left">Status</TableHead>
                <TableHead className="p-3 text-left">Current Balance</TableHead>
                <TableHead className="p-3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((merchant, index) => (
                <TableRow
                  key={merchant._id}
                  className="border-t border-gray-200"
                >
                  <TableCell className="p-3">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell className="p-3 flex items-center">
                    <div>
                      <img
                        src={merchant.image}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <p className="font-semibold text-xs">{merchant.name}</p>
                      <p className="text-xs">{merchant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="p-3">{merchant.hub}</TableCell>
                  <TableCell className="p-3">{merchant.businessName}</TableCell>
                  <TableCell className="p-3">{merchant._id}</TableCell>
                  <TableCell className="p-3">{merchant.phone}</TableCell>
                  <TableCell className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        merchant.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {merchant.status}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    {merchant.currentBalance}
                  </TableCell>
                  <TableCell className="p-3 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 bg-gray-200 text-white rounded-full">
                          <MoreVerticalIcon className="h-4 w-4 text-gray-800" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuItem
                          className="flex items-center text-sm hover:bg-gray-100"
                          onClick={() => handleGenerateInvoice(merchant)}
                        >
                          <FaFileInvoice className="mr-2" /> Generate Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-sm hover:bg-gray-100"
                          onClick={() => handleView(merchant)}
                        >
                          <FaEye className="mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-sm hover:bg-gray-100"
                          onClick={() => handleEdit(merchant)}
                        >
                          <FaEdit className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(merchant._id)}
                        >
                          <Trash className="mr-2 focus:text-red-500" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
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
    </div>
  );
};

export default MerchantsPage;
