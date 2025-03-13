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
import { useNavigate } from "react-router-dom";

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
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const deleteMerchantApi = async (merchantId: string) => {
  try {
    const response = await axios.delete(
      `https://parcel-management-back-end.vercel.app/api/v1/merchant/${merchantId}`
    );
    return response.data;
  } catch (error) {
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
  const [isLoadingForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [merchantToDelete, setMerchantToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 10;

  const navigate = useNavigate();

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
    setMerchantToDelete(merchantId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (merchantToDelete) {
      setIsDeleting(true);
      try {
        await deleteMerchantApi(merchantToDelete);
        toast.success("Merchant deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete merchant");
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

  const handleGenerateInvoice = (merchant: Merchant) => {
    toast.success(`Invoice generated for ${merchant.businessName}`);
  };

  const handleView = (merchant: Merchant) => {
    console.log("View Details for:", merchant.businessName);
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
            onClick={() => navigate("/admin/merchant-manage/create")}
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
                          disabled={isDeleting}
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this merchant?</p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantsPage;
