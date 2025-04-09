// // // import { useState } from "react";
// // // import { FaEdit, FaPlus, FaSearch, FaEye } from "react-icons/fa";
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableHeader,
// // //   TableRow,
// // // } from "@/components/ui/table";
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuTrigger,
// // // } from "@/components/ui/dropdown-menu";
// // // import { Button } from "@/components/ui/button";
// // // import { toast } from "sonner";
// // // import { MoreVerticalIcon, Trash } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";
// // // import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
// // // import TablePagination from "../../../../components/ui/TablePagination";
// // // import {
// // //   useGetAllMerchantQuery,
// // //   useDeleteMerchantMutation,
// // // } from "../../../../redux/features/merchant/merchantApi";
// // // import {
// // //   AlertDialog,
// // //   AlertDialogAction,
// // //   AlertDialogCancel,
// // //   AlertDialogContent,
// // //   AlertDialogDescription,
// // //   AlertDialogFooter,
// // //   AlertDialogHeader,
// // //   AlertDialogTitle,
// // // } from "@/components/ui/alert-dialog";

// // // interface Merchant {
// // //   _id: string;
// // //   businessName: string;
// // //   name: string;
// // //   email: string;
// // //   phone: string;
// // //   status: string;
// // //   hub: string;
// // //   image: string;
// // //   deliveryCharge: {
// // //     chargeList: {
// // //       sameDay: number;
// // //       nextDay: number;
// // //       subCity: number;
// // //       outsideCity: number;
// // //     };
// // //     increasePerKG: {
// // //       sameDay: number;
// // //       nextDay: number;
// // //       subCity: number;
// // //       outsideCity: number;
// // //     };
// // //     isDefault: boolean;
// // //   };
// // //   openingBalance: number;
// // //   vat: number;
// // //   nid: string;
// // //   tradeLicense: string;
// // //   referenceName: string;
// // //   referencePhone: string;
// // //   paymentPeriod: number;
// // //   walletUseActivation: boolean;
// // //   address: string;
// // //   returnCharges: number;
// // //   createdAt: string;
// // //   updatedAt: string;
// // // }

// // // const MerchantsPage = () => {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // //   const [merchantToDelete, setMerchantToDelete] = useState<string | null>(null);
// // //   const [isDeleting, setIsDeleting] = useState(false);
// // //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// // //   const [merchantToView, setMerchantToView] = useState<Merchant | null>(null);
// // //   const pageSize = 10;
// // //   const navigate = useNavigate();

// // //   const {
// // //     data: merchantsData,
// // //     isLoading,
// // //     isError,
// // //     refetch,
// // //   } = useGetAllMerchantQuery([{ name: "searchTerm", value: searchTerm }]);

// // //   const merchants: Merchant[] = (merchantsData?.data || []).map((m: any) => ({
// // //     ...m,
// // //     deliveryCharge: m.deliveryCharge || {
// // //       chargeList: { sameDay: 0, nextDay: 0, subCity: 0, outsideCity: 0 },
// // //       increasePerKG: { sameDay: 0, nextDay: 0, subCity: 0, outsideCity: 0 },
// // //       isDefault: false,
// // //     },
// // //     openingBalance: m.openingBalance || 0,
// // //     vat: m.vat || 0,
// // //     nid: m.nid || "",
// // //     tradeLicense: m.tradeLicense || "",
// // //     referenceName: m.referenceName || "",
// // //     referencePhone: m.referencePhone || "",
// // //     paymentPeriod: m.paymentPeriod || 0,
// // //     walletUseActivation: m.walletUseActivation || false,
// // //     address: m.address || "",
// // //     returnCharges: m.returnCharges || 0,
// // //     createdAt: m.createdAt || "",
// // //     updatedAt: m.updatedAt || "",
// // //   }));

// // //   const filteredMerchants = merchants.filter(
// // //     (merchant: Merchant) =>
// // //       merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       merchant.phone.includes(searchTerm)
// // //   );

// // //   const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
// // //   const startIndex = (currentPage - 1) * pageSize;
// // //   const currentData = filteredMerchants.slice(
// // //     startIndex,
// // //     startIndex + pageSize
// // //   );

// // //   const [deleteMerchant] = useDeleteMerchantMutation();

// // //   const handleDelete = async (merchantId: string) => {
// // //     setMerchantToDelete(merchantId);
// // //     setIsDeleteModalOpen(true);
// // //   };

// // //   const confirmDelete = async () => {
// // //     if (merchantToDelete) {
// // //       setIsDeleting(true);
// // //       const loadingToastId = toast.loading("Deleting merchant...");
// // //       try {
// // //         await deleteMerchant(merchantToDelete).unwrap();
// // //         toast.success("Merchant deleted successfully", {
// // //           id: loadingToastId,
// // //         });
// // //         refetch();
// // //       } catch (error) {
// // //         toast.error("Failed to delete merchant", {
// // //           id: loadingToastId,
// // //         });
// // //       } finally {
// // //         setIsDeleting(false);
// // //         setIsDeleteModalOpen(false);
// // //         setMerchantToDelete(null);
// // //       }
// // //     }
// // //   };

// // //   const cancelDelete = () => {
// // //     setIsDeleteModalOpen(false);
// // //     setMerchantToDelete(null);
// // //   };

// // //   const handleEdit = (merchant: Merchant) => {
// // //     navigate("/admin/merchant-manage/edit", { state: { merchant } });
// // //   };

// // //   const handleView = (merchant: Merchant) => {
// // //     setMerchantToView(merchant);
// // //     setIsViewModalOpen(true);
// // //   };

// // //   const closeViewModal = () => {
// // //     setIsViewModalOpen(false);
// // //     setMerchantToView(null);
// // //   };

// // //   if (isError) {
// // //     return <div className="p-6">Error fetching merchants data.</div>;
// // //   }

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <div className="bg-white p-6 rounded-lg shadow-md">
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h2 className="text-xl font-semibold text-gray-900">Merchant List</h2>
// // //           <div className="relative w-80% max-w-md">
// // //             <input
// // //               type="text"
// // //               placeholder="Search..."
// // //               value={searchTerm}
// // //               onChange={(e) => {
// // //                 setSearchTerm(e.target.value);
// // //                 setCurrentPage(1);
// // //               }}
// // //               className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 w-full"
// // //             />
// // //             <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
// // //           </div>
// // //           <Button
// // //             variant="default"
// // //             onClick={() => navigate("/admin/merchant-manage/create")}
// // //             className="flex items-center gap-2"
// // //           >
// // //             <FaPlus className="h-4 w-4" />
// // //             <span>Create Merchant</span>
// // //           </Button>
// // //         </div>

// // //         <div className="overflow-x-auto">
// // //           <Table>
// // //             <TableHeader>
// // //               <TableRow>
// // //                 <TableHead className="p-3 text-left">SL</TableHead>
// // //                 <TableHead className="p-3 text-left">Details</TableHead>
// // //                 <TableHead className="p-3 text-left">Hub</TableHead>
// // //                 <TableHead className="p-3 text-left">Business Name</TableHead>
// // //                 <TableHead className="p-3 text-left">Phone</TableHead>
// // //                 <TableHead className="p-3 text-left">Status</TableHead>
// // //                 <TableHead className="p-3 text-left">Opening Balance</TableHead>
// // //                 <TableHead className="p-3 text-left">VAT</TableHead>
// // //                 <TableHead className="p-3 text-left">NID</TableHead>
// // //                 <TableHead className="p-3 text-left">Actions</TableHead>
// // //               </TableRow>
// // //             </TableHeader>
// // //             <TableBody>
// // //               {isLoading
// // //                 ? Array.from({ length: pageSize }).map((_, index) => (
// // //                     <TableRow
// // //                       key={`skeleton-${index}`}
// // //                       className="animate-pulse"
// // //                     >
// // //                       <TableCell className="p-3">
// // //                         <div className="h-4 w-4 bg-gray-200 rounded"></div>
// // //                       </TableCell>
// // //                       {Array.from({ length: 8 }).map((_, colIndex) => (
// // //                         <TableCell
// // //                           key={`skeleton-col-${colIndex}`}
// // //                           className="p-3"
// // //                         >
// // //                           <div className="h-4 bg-gray-200 rounded w-24"></div>
// // //                         </TableCell>
// // //                       ))}
// // //                       <TableCell className="p-3 relative">
// // //                         <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   ))
// // //                 : currentData.map((merchant, index) => (
// // //                     <TableRow
// // //                       key={merchant._id}
// // //                       className="border-t border-gray-200"
// // //                     >
// // //                       <TableCell className="p-3">
// // //                         {startIndex + index + 1}
// // //                       </TableCell>
// // //                       <TableCell className="p-3 flex items-center">
// // //                         <div>
// // //                           <img
// // //                             src={merchant.image}
// // //                             alt="Avatar"
// // //                             className="w-8 h-8 rounded-full mr-3"
// // //                           />
// // //                           <p className="font-semibold text-xs">
// // //                             {merchant.name}
// // //                           </p>
// // //                           <p className="text-xs">{merchant.email}</p>
// // //                         </div>
// // //                       </TableCell>
// // //                       <TableCell className="p-3">{merchant.hub}</TableCell>
// // //                       <TableCell className="p-3">
// // //                         {merchant.businessName}
// // //                       </TableCell>
// // //                       <TableCell className="p-3">{merchant.phone}</TableCell>
// // //                       <TableCell className="p-3">
// // //                         <span
// // //                           className={`px-3 py-1 text-xs font-semibold rounded-full ${
// // //                             merchant.status === "Active"
// // //                               ? "bg-green-200 text-green-800"
// // //                               : "bg-red-200 text-red-800"
// // //                           }`}
// // //                         >
// // //                           {merchant.status}
// // //                         </span>
// // //                       </TableCell>
// // //                       <TableCell className="p-3">
// // //                         {merchant.openingBalance}
// // //                       </TableCell>
// // //                       <TableCell className="p-3">{merchant.vat}</TableCell>
// // //                       <TableCell className="p-3">{merchant.nid}</TableCell>
// // //                       <TableCell className="p-3 relative">
// // //                         <DropdownMenu>
// // //                           <DropdownMenuTrigger asChild>
// // //                             <button className="p-1 bg-gray-200 text-white rounded-full">
// // //                               <MoreVerticalIcon className="h-4 w-4 text-gray-800" />
// // //                             </button>
// // //                           </DropdownMenuTrigger>
// // //                           <DropdownMenuContent className="w-32">
// // //                             <DropdownMenuItem
// // //                               className="flex items-center text-sm hover:bg-gray-100"
// // //                               onClick={() => handleView(merchant)}
// // //                             >
// // //                               <FaEye className="mr-2" /> View
// // //                             </DropdownMenuItem>
// // //                             <DropdownMenuItem
// // //                               className="flex items-center text-sm hover:bg-gray-100"
// // //                               onClick={() => handleEdit(merchant)}
// // //                             >
// // //                               <FaEdit className="mr-2" /> Edit
// // //                             </DropdownMenuItem>
// // //                             <DropdownMenuItem
// // //                               className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
// // //                               onClick={() => handleDelete(merchant._id)}
// // //                               disabled={isDeleting}
// // //                             >
// // //                               <Trash className="mr-2 focus:text-red-500" />{" "}
// // //                               Delete
// // //                             </DropdownMenuItem>
// // //                           </DropdownMenuContent>
// // //                         </DropdownMenu>
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   ))}
// // //             </TableBody>
// // //           </Table>
// // //         </div>

// // //         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
// // //           <TablePaginationInfo
// // //             startIndex={startIndex}
// // //             pageSize={pageSize}
// // //             totalEntries={filteredMerchants.length}
// // //             currentDataLength={currentData.length}
// // //           />
// // //           <TablePagination
// // //             currentPage={currentPage}
// // //             totalPages={totalPages}
// // //             onPageChange={(page) => setCurrentPage(page)}
// // //             onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// // //             onNextPage={() =>
// // //               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
// // //             }
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Delete Confirmation Modal */}
// // //       <AlertDialog open={isDeleteModalOpen}>
// // //         <AlertDialogContent className="max-w-md w-full mx-4 overflow-y-auto max-h-[80vh]">
// // //           <AlertDialogHeader>
// // //             <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
// // //             <AlertDialogDescription>
// // //               Are you sure you want to delete this merchant?
// // //             </AlertDialogDescription>
// // //           </AlertDialogHeader>
// // //           <AlertDialogFooter>
// // //             <AlertDialogCancel onClick={cancelDelete} disabled={isDeleting}>
// // //               Cancel
// // //             </AlertDialogCancel>
// // //             <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
// // //               {isDeleting ? "Deleting..." : "Delete"}
// // //             </AlertDialogAction>
// // //           </AlertDialogFooter>
// // //         </AlertDialogContent>
// // //       </AlertDialog>

// // //       {/* View Merchant Details Modal */}
// // //       <AlertDialog open={isViewModalOpen}>
// // //         <AlertDialogContent className="max-w-lg w-full mx-4 overflow-y-auto max-h-[80vh]">
// // //           <AlertDialogHeader>
// // //             <AlertDialogTitle>Merchant Details</AlertDialogTitle>
// // //           </AlertDialogHeader>
// // //           <div className="p-4">
// // //             {merchantToView && (
// // //               <div>
// // //                 <div className="flex items-center mb-4">
// // //                   <img
// // //                     src={merchantToView.image}
// // //                     alt="Avatar"
// // //                     className="w-12 h-12 rounded-full mr-4"
// // //                   />
// // //                   <div>
// // //                     <p className="font-semibold">{merchantToView.name}</p>
// // //                     <p className="text-gray-600">{merchantToView.email}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   <div>
// // //                     <p className="font-semibold">Business Name:</p>
// // //                     <p>{merchantToView.businessName}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Phone:</p>
// // //                     <p>{merchantToView.phone}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Status:</p>
// // //                     <p
// // //                       className={`px-3 py-1 text-xs font-semibold rounded-full ${
// // //                         merchantToView.status === "Active"
// // //                           ? "bg-green-200 text-green-800"
// // //                           : "bg-red-200 text-red-800"
// // //                       }`}
// // //                     >
// // //                       {merchantToView.status}
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Hub:</p>
// // //                     <p>{merchantToView.hub}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Opening Balance:</p>
// // //                     <p>{merchantToView.openingBalance}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">VAT:</p>
// // //                     <p>{merchantToView.vat}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">NID:</p>
// // //                     <p>{merchantToView.nid}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Trade License:</p>
// // //                     {merchantToView.tradeLicense ? (
// // //                       <img
// // //                         src={merchantToView.tradeLicense}
// // //                         alt="Trade License"
// // //                         className="w-32 h-auto border rounded"
// // //                       />
// // //                     ) : (
// // //                       <p>No license image available.</p>
// // //                     )}
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Reference Name:</p>
// // //                     <p>{merchantToView.referenceName}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Reference Phone:</p>
// // //                     <p>{merchantToView.referencePhone}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Payment Period:</p>
// // //                     <p>{merchantToView.paymentPeriod}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Wallet Use Activation:</p>
// // //                     <p>{merchantToView.walletUseActivation ? "Yes" : "No"}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Address:</p>
// // //                     <p>{merchantToView.address}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Return Charges:</p>
// // //                     <p>{merchantToView.returnCharges}</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Created At:</p>
// // //                     <p>
// // //                       {new Date(merchantToView.createdAt).toLocaleDateString(
// // //                         "en-US",
// // //                         {
// // //                           year: "numeric",
// // //                           month: "long",
// // //                           day: "numeric",
// // //                         }
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold">Updated At:</p>
// // //                     <p>
// // //                       {new Date(merchantToView.updatedAt).toLocaleDateString(
// // //                         "en-US",
// // //                         {
// // //                           year: "numeric",
// // //                           month: "long",
// // //                           day: "numeric",
// // //                         }
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                   <div className="col-span-2">
// // //                     <p className="font-semibold">Delivery Charges:</p>
// // //                     <div className="grid grid-cols-2 gap-2">
// // //                       <div>
// // //                         <p className="font-semibold">Same Day:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.chargeList.sameDay}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Next Day:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.chargeList.nextDay}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Sub City:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.chargeList.subCity}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Outside City:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.chargeList.outsideCity}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="col-span-2">
// // //                     <p className="font-semibold">Increase Per KG:</p>
// // //                     <div className="grid grid-cols-2 gap-2">
// // //                       <div>
// // //                         <p className="font-semibold">Same Day:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.increasePerKG.sameDay}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Next Day:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.increasePerKG.nextDay}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Sub City:</p>
// // //                         <p>
// // //                           {merchantToView.deliveryCharge.increasePerKG.subCity}
// // //                         </p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="font-semibold">Outside City:</p>
// // //                         <p>
// // //                           {
// // //                             merchantToView.deliveryCharge.increasePerKG
// // //                               .outsideCity
// // //                           }
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //           <AlertDialogFooter>
// // //             <AlertDialogCancel onClick={closeViewModal}>
// // //               Close
// // //             </AlertDialogCancel>
// // //           </AlertDialogFooter>
// // //         </AlertDialogContent>
// // //       </AlertDialog>
// // //     </div>
// // //   );
// // // };

// // // export default MerchantsPage;

import { useState } from "react";
import { FaEdit, FaPlus, FaSearch, FaEye } from "react-icons/fa";
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
import { toast } from "sonner";
import { MoreVerticalIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TablePaginationInfo from "../../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../../components/ui/TablePagination";
import {
  useGetAllMerchantQuery,
  useDeleteMerchantMutation,
} from "../../../../redux/features/merchant/merchantApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Merchant {
  _id: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  hub: string;
  image: string;
  deliveryCharge: {
    chargeList: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
    increasePerKG: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
    isDefault: boolean;
  };
  openingBalance: number;
  vat: number;
  nid: string;
  tradeLicense: string;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUseActivation: boolean;
  address: string;
  returnCharges: number;
  createdAt: string;
  updatedAt: string;
}

const MerchantsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [merchantToDelete, setMerchantToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [merchantToView, setMerchantToView] = useState<Merchant | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const pageSize = 10;
  const navigate = useNavigate();

  const {
    data: merchantsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllMerchantQuery([{ name: "searchTerm", value: searchTerm }]);

  const merchants: Merchant[] = (merchantsData?.data || []).map((m: any) => ({
    ...m,
    deliveryCharge: m.deliveryCharge || {
      chargeList: { sameDay: 0, nextDay: 0, subCity: 0, outsideCity: 0 },
      increasePerKG: { sameDay: 0, nextDay: 0, subCity: 0, outsideCity: 0 },
      isDefault: false,
    },
    openingBalance: m.openingBalance || 0,
    vat: m.vat || 0,
    nid: m.nid || "",
    tradeLicense: m.tradeLicense || "",
    referenceName: m.referenceName || "",
    referencePhone: m.referencePhone || "",
    paymentPeriod: m.paymentPeriod || 0,
    walletUseActivation: m.walletUseActivation || false,
    address: m.address || "",
    returnCharges: m.returnCharges || 0,
    createdAt: m.createdAt || "",
    updatedAt: m.updatedAt || "",
  }));

  const filteredMerchants = merchants.filter(
    (merchant: Merchant) =>
      (activeTab === "All" || merchant.status === activeTab) &&
      (merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.phone.includes(searchTerm))
  );

  const pendingMerchantsCount = merchants.filter(
    (merchant: Merchant) => merchant.status === "Pending"
  ).length;

  const totalPages = Math.ceil(filteredMerchants.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredMerchants.slice(
    startIndex,
    startIndex + pageSize
  );

  const [deleteMerchant] = useDeleteMerchantMutation();

  const handleDelete = async (merchantId: string) => {
    setMerchantToDelete(merchantId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (merchantToDelete) {
      setIsDeleting(true);
      const loadingToastId = toast.loading("Deleting merchant...");
      try {
        await deleteMerchant(merchantToDelete).unwrap();
        toast.success("Merchant deleted successfully", {
          id: loadingToastId,
        });
        refetch();
      } catch (error) {
        toast.error("Failed to delete merchant", {
          id: loadingToastId,
        });
      } finally {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setMerchantToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setMerchantToDelete(null);
  };

  const handleEdit = (merchant: Merchant) => {
    navigate("/admin/merchant-manage/edit", { state: { merchant } });
  };

  const handleView = (merchant: Merchant) => {
    setMerchantToView(merchant);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setMerchantToView(null);
  };

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
            onClick={() => navigate("/admin/merchant-manage/create")}
            className="flex items-center gap-2"
          >
            <FaPlus className="h-4 w-4" />
            <span>Create Merchant</span>
          </Button>
        </div>

        <Tabs defaultValue="All" className="mb-4">
          <TabsList>
            <TabsTrigger value="All" onClick={() => setActiveTab("All")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="Pending"
              onClick={() => setActiveTab("Pending")}
            >
              Pending ({pendingMerchantsCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3 text-left">SL</TableHead>
                <TableHead className="p-3 text-left">Details</TableHead>
                <TableHead className="p-3 text-left">Hub</TableHead>
                <TableHead className="p-3 text-left">Business Name</TableHead>
                <TableHead className="p-3 text-left">Phone</TableHead>
                <TableHead className="p-3 text-left">Status</TableHead>
                <TableHead className="p-3 text-left">Opening Balance</TableHead>
                <TableHead className="p-3 text-left">VAT</TableHead>
                <TableHead className="p-3 text-left">NID</TableHead>
                <TableHead className="p-3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className="animate-pulse"
                    >
                      <TableCell className="p-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      </TableCell>
                      {Array.from({ length: 8 }).map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-col-${colIndex}`}
                          className="p-3"
                        >
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                      ))}
                      <TableCell className="p-3 relative">
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      </TableCell>
                    </TableRow>
                  ))
                : currentData.map((merchant, index) => (
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
                          <p className="font-semibold text-xs">
                            {merchant.name}
                          </p>
                          <p className="text-xs">{merchant.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{merchant.hub}</TableCell>
                      <TableCell className="p-3">
                        {merchant.businessName}
                      </TableCell>
                      <TableCell className="p-3">{merchant.phone}</TableCell>
                      <TableCell className="p-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            merchant.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {merchant.status}
                        </span>
                      </TableCell>
                      <TableCell className="p-3">
                        {merchant.openingBalance}
                      </TableCell>
                      <TableCell className="p-3">{merchant.vat}</TableCell>
                      <TableCell className="p-3">{merchant.nid}</TableCell>
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
                              disabled={isDeleting}
                            >
                              <Trash className="mr-2 focus:text-red-500" />{" "}
                              Delete
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

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen}>
        <AlertDialogContent className="max-w-md w-full mx-4 overflow-y-auto max-h-[80vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this merchant?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Merchant Details Modal */}
      <AlertDialog open={isViewModalOpen}>
        <AlertDialogContent className="max-w-lg w-full mx-4 overflow-y-auto max-h-[80vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Merchant Details</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            {merchantToView && (
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={merchantToView.image}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{merchantToView.name}</p>
                    <p className="text-gray-600">{merchantToView.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Business Name:</p>
                    <p>{merchantToView.businessName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{merchantToView.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status:</p>
                    <p
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        merchantToView.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {merchantToView.status}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Hub:</p>
                    <p>{merchantToView.hub}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Opening Balance:</p>
                    <p>{merchantToView.openingBalance}</p>
                  </div>
                  <div>
                    <p className="font-semibold">VAT:</p>
                    <p>{merchantToView.vat}</p>
                  </div>
                  <div>
                    <p className="font-semibold">NID:</p>
                    <p>{merchantToView.nid}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Trade License:</p>
                    {merchantToView.tradeLicense ? (
                      <img
                        src={merchantToView.tradeLicense}
                        alt="Trade License"
                        className="w-32 h-auto border rounded"
                      />
                    ) : (
                      <p>No license image available.</p>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">Reference Name:</p>
                    <p>{merchantToView.referenceName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reference Phone:</p>
                    <p>{merchantToView.referencePhone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Payment Period:</p>
                    <p>{merchantToView.paymentPeriod}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Wallet Use Activation:</p>
                    <p>{merchantToView.walletUseActivation ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>{merchantToView.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Return Charges:</p>
                    <p>{merchantToView.returnCharges}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Created At:</p>
                    <p>
                      {new Date(merchantToView.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Updated At:</p>
                    <p>
                      {new Date(merchantToView.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Delivery Charges:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">Same Day:</p>
                        <p>
                          {merchantToView.deliveryCharge.chargeList.sameDay}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Next Day:</p>
                        <p>
                          {merchantToView.deliveryCharge.chargeList.nextDay}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Sub City:</p>
                        <p>
                          {merchantToView.deliveryCharge.chargeList.subCity}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Outside City:</p>
                        <p>
                          {merchantToView.deliveryCharge.chargeList.outsideCity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Increase Per KG:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">Same Day:</p>
                        <p>
                          {merchantToView.deliveryCharge.increasePerKG.sameDay}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Next Day:</p>
                        <p>
                          {merchantToView.deliveryCharge.increasePerKG.nextDay}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Sub City:</p>
                        <p>
                          {merchantToView.deliveryCharge.increasePerKG.subCity}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Outside City:</p>
                        <p>
                          {
                            merchantToView.deliveryCharge.increasePerKG
                              .outsideCity
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeViewModal}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MerchantsPage;
