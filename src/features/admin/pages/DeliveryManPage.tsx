import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Eraser,
  Filter,
  Edit,
  Trash,
  Plus,
  MoreVerticalIcon,
} from "lucide-react";
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
import TablePagination from "@/components/ui/TablePagination";
import { useNavigate } from "react-router-dom";

interface DeliveryManData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  hub: string;
  deliveryCharge: number;
  pickupCharge: number;
  returnCharge: number;
  openingBalance: number;
  currentBalance: number;
  status: string;
}

// Fetch delivery man data from API using Axios
export const fetchDeliveryManApi = async (): Promise<DeliveryManData[]> => {
  const response = await axios.get<{ data: DeliveryManData[] }>(
    // "https://parcel-management-back-end.vercel.app/api/v1/deliveryMan"
    "https://parcel-management-back-end-peach.vercel.app/api/v1/deliveryMan"
  );
  return response.data.data;
};

interface Filters {
  name: string;
  email: string;
  phone: string;
}

interface TablePaginationInfoProps {
  startIndex: number;
  pageSize: number;
  totalEntries: number;
  currentDataLength: number;
}

const TablePaginationInfo: React.FC<TablePaginationInfoProps> = ({
  startIndex,
  totalEntries,
  currentDataLength,
}) => {
  return (
    <div className="text-sm text-gray-600">
      {totalEntries === 0
        ? "No entries"
        : `Showing ${startIndex + 1} to ${
            startIndex + currentDataLength
          } of ${totalEntries} entries`}
    </div>
  );
};

const DeliveryManPage = () => {
  const navigate = useNavigate();

  // react-hook-form for filter form
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  // Use react-query to fetch delivery men data
  const {
    data: deliveryMen = [],
    isLoading,
    error,
    refetch,
  } = useQuery<DeliveryManData[]>({
    queryKey: ["deliveryMen"],
    queryFn: fetchDeliveryManApi,
  });

  // Filter handlers
  const onSubmit = async (data: Filters) => {
    setIsLoadingForm(true);
    try {
      console.log("Filter data submitted:", data);
      // Implement filtering logic here using the form data
    } finally {
      setIsLoadingForm(false);
    }
  };

  const onClear = () => {
    console.log("Clearing filter data...");
    reset();
  };

  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deliveryManToDelete, setDeliveryManToDelete] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Form submit handler for editing a delivery man
  const handleEdit = (deliveryMan: DeliveryManData) => {
    navigate("/admin/deliveryman/edit", { state: { deliveryMan } });
  };

  // Delete handler for deleting a delivery man
  const handleDelete = async (deliveryManId: string) => {
    setDeliveryManToDelete(deliveryManId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deliveryManToDelete) {
      setIsDeleting(true);
      try {
        const response = await axios.delete(
          `https://parcel-management-back-end.vercel.app/api/v1/deliveryMan/${deliveryManToDelete}`
        );
        console.log("Delivery man deleted successfully:", response.data);
        refetch();
        toast.success("Delivery man deleted successfully");
      } catch (error) {
        console.error("Error deleting delivery man:", error);
        toast.error("Failed to delete delivery man");
      } finally {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setDeliveryManToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeliveryManToDelete(null);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalEntries = deliveryMen.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = deliveryMen.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      {/* Filter Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0"
        >
          {/* Name Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="User Name"
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Email Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="User Email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Phone Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-2 bg-[#d63384] text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
            >
              <Eraser className="text-sm" /> Clear
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#6610f2] text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              <Filter className="text-sm" /> Filter
            </button>
          </div>
        </form>
      </div>

      {/* Delivery Man Table */}
      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Delivery Man
            </h2>
            <Button
              variant="default"
              onClick={() => navigate("/admin/deliveryman/create")}
              className="flex items-center gap-2"
              disabled={isLoadingForm}
            >
              <Plus className="h-4 w-4" />
              <span>Add Delivery Man</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <p className="p-3">Loading...</p>
            ) : error ? (
              <p className="p-3 text-red-600">Error loading data</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-3 text-left">SL</TableHead>
                    <TableHead className="p-3 text-left">User</TableHead>
                    <TableHead className="p-3 text-left">Hub</TableHead>
                    <TableHead className="p-3 text-left">
                      Delivery Charge
                    </TableHead>
                    <TableHead className="p-3 text-left">
                      Pickup Charge
                    </TableHead>
                    <TableHead className="p-3 text-left">
                      Return Charge
                    </TableHead>
                    <TableHead className="p-3 text-left">
                      Opening Balance
                    </TableHead>
                    <TableHead className="p-3 text-left">
                      Current Balance
                    </TableHead>
                    <TableHead className="p-3 text-left">Status</TableHead>
                    <TableHead className="p-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((man, index) => (
                    <TableRow
                      key={man._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="p-3">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="p-3 flex items-center space-x-2">
                        <div className="flex gap-2">
                          <img
                            src={man.image}
                            alt={man.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{man.name}</p>
                            <p className="text-xs text-gray-500">{man.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{man.hub}</TableCell>
                      <TableCell className="p-3">
                        {man.deliveryCharge}
                      </TableCell>
                      <TableCell className="p-3">{man.pickupCharge}</TableCell>
                      <TableCell className="p-3">{man.returnCharge}</TableCell>
                      <TableCell className="p-3">
                        {man.openingBalance}
                      </TableCell>
                      <TableCell className="p-3">
                        {man.currentBalance}
                      </TableCell>
                      <TableCell className="p-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            man.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {man.status}
                        </span>
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
                              onClick={() => handleEdit(man)}
                            >
                              <Edit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(String(man._id))}
                              disabled={isDeleting}
                            >
                              {isDeleting ? (
                                <>
                                  <span className="mr-2">Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <Trash className="mr-2 focus:text-red-500" />{" "}
                                  Delete
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <TablePaginationInfo
              startIndex={startIndex}
              pageSize={pageSize}
              totalEntries={totalEntries}
              currentDataLength={currentData.length}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this delivery man?</p>
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

export default DeliveryManPage;
