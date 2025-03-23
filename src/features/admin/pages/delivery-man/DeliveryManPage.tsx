import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import TablePagination from "@/components/ui/TablePagination";
import { toast } from "sonner";
import {
  useDeleteDeliveryManMutation,
  useGetAllDeliveryManQuery,
} from "@/redux/features/deliveryMan/deliveryManApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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

interface Filters {
  name: string;
  email: string;
  phone: string;
}

interface TQueryParam {
  name: string;
  value: string;
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

  // State to store filters for the query parameters.
  const [queryFilters, setQueryFilters] = useState<TQueryParam[]>([]);

  // RTK Query hook that fetches data using queryFilters.
  const {
    data: deliveryManResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllDeliveryManQuery(queryFilters);

  // Map the fetched data to include a default currentBalance if it's missing.
  const deliveryMen: DeliveryManData[] = (deliveryManResponse?.data || []).map(
    (man: any) => ({
      ...man,
      currentBalance:
        man.currentBalance !== undefined
          ? man.currentBalance
          : man.openingBalance,
    })
  );

  console.log("deliveryMen: ", deliveryMen);

  const [deleteDeliveryMan, { isLoading: isDeleting }] =
    useDeleteDeliveryManMutation();

  // New state for filter button loading state
  const [isFiltering, setIsFiltering] = useState(false);

  // When filter form is submitted, convert the data to query parameters.
  const onSubmit = async (data: Filters) => {
    console.log("Filter data submitted:", data);
    setIsFiltering(true); // Set loading state to true
    const filters: TQueryParam[] = [];
    if (data.name) {
      filters.push({ name: "name", value: data.name });
    }
    if (data.email) {
      filters.push({ name: "email", value: data.email });
    }
    if (data.phone) {
      filters.push({ name: "phone", value: data.phone });
    }
    setQueryFilters(filters);
    try {
      await refetch(); // Manually trigger refetch with new filters
    } finally {
      setIsFiltering(false); // Set loading state to false
    }
  };

  const onClear = () => {
    console.log("Clearing filter data...");
    reset();
    setQueryFilters([]);
    setIsFiltering(false);
    refetch();
  };

  // State for delete modal.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deliveryManToDelete, setDeliveryManToDelete] = useState<string | null>(
    null
  );

  // Handler for editing a delivery man.
  const handleEdit = (deliveryMan: DeliveryManData) => {
    navigate("/admin/deliveryman/edit", { state: { deliveryMan } });
  };

  // Opens confirmation modal for delete.
  const handleDelete = (deliveryManId: string) => {
    setDeliveryManToDelete(deliveryManId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deliveryManToDelete) {
      // Display a loading toast.
      const toastId = toast.loading("Deleting delivery man...");
      try {
        await deleteDeliveryMan(deliveryManToDelete).unwrap();
        toast.success("Delivery man deleted successfully", { id: toastId });
      } catch (error) {
        console.error("Error deleting delivery man:", error);
        toast.error("Failed to delete delivery man", { id: toastId });
      } finally {
        setIsDeleteModalOpen(false);
        setDeliveryManToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeliveryManToDelete(null);
  };

  // Pagination logic.
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
              disabled={isFiltering} // Disable button when filtering
            >
              {isFiltering ? ( // Show loader if filtering
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Filtering...
                </>
              ) : (
                <>
                  <Filter className="text-sm" /> Filter
                </>
              )}
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
            >
              <Plus className="h-4 w-4" />
              <span>Add Delivery Man</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-3 text-center">Loading...</div>
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
                      <TableCell className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={man.image}
                            alt={man.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{man.name}</p>
                            <p className="text-xs text-gray-500">{man.email}</p>
                            <p className="text-xs text-gray-500">{man.phone}</p>
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
                                <span className="mr-2">Deleting...</span>
                              ) : (
                                <>
                                  <Trash className="mr-2" /> Delete
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

      {/* Confirmation Modal using ShadCN Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this delivery man?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryManPage;
