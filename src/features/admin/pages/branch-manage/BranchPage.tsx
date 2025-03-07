import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Eraser,
  Filter,
  Edit,
  Trash,
  Plus,
  MoreVerticalIcon,
  Loader2,
} from "lucide-react";
import Modal from "react-modal";
import TablePagination from "../../../../components/ui/TablePagination";
import { BranchData } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

// Fetch branch data from API using Axios
export const fetchBranchApi = async (): Promise<BranchData[]> => {
  console.log("Fetching branch data from API...");
  const response = await axios.get<{ data: BranchData[] }>(
    "https://parcel-management-back-end.vercel.app/api/v1/branch"
  );
  console.log("Branch data fetched:", response.data.data);
  return response.data.data; // Access the nested data property
};

interface Filters {
  name: string;
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

const BranchPage = () => {
  // react-hook-form for filter form
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: { name: "", phone: "" },
  });

  // react-hook-form for create branch form
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    control: controlCreate,
  } = useForm({
    defaultValues: { name: "", phone: "", address: "", status: "Active" },
  });

  // react-hook-form for edit branch form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    control: controlEdit,
    setValue: setValueEdit,
  } = useForm({
    defaultValues: { name: "", phone: "", address: "", status: "Active" },
  });

  // Use react-query to fetch branch data
  const {
    data: branches = [],
    isLoading,
    error,
    refetch,
  } = useQuery<BranchData[]>({
    queryKey: ["branch"],
    queryFn: fetchBranchApi,
  });

  // Filter handlers
  const onSubmit = (data: Filters) => {
    console.log("Filter data submitted:", data);
    // Implement filtering logic here using the form data
  };

  const onClear = () => {
    console.log("Clearing filter data...");
    reset();
  };

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState<BranchData | null>(null);

  // Form submit handler for creating a new branch
  const handleCreateSubmit = async (data: any) => {
    console.log("Create branch data:", data);
    setIsLoadingForm(true);
    try {
      const response = await axios.post(
        "https://parcel-management-back-end.vercel.app/api/v1/branch",
        data
      );
      console.log("Branch created successfully:", response.data);
      refetch();
      toast.success("Branch created successfully");
      setIsCreateModalOpen(false);
      resetCreate();
    } catch (error: any) {
      console.error("Error creating branch:", error.response.data);
      toast.error("Failed to create branch");
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Form submit handler for editing a branch
  const handleEditSubmit = async (data: any) => {
    console.log("Edit branch data:", data);
    setIsLoadingForm(true);
    try {
      const response = await axios.patch(
        `https://parcel-management-back-end.vercel.app/api/v1/branch/${branchToEdit?._id}`,
        data
      );
      console.log("Branch edited successfully:", response.data);
      refetch();
      toast.success("Branch edited successfully");
      setIsEditModalOpen(false);
      resetEdit();
    } catch (error) {
      console.error("Error editing branch:", error);
      toast.error("Failed to edit branch");
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Delete handler for deleting a branch
  const handleDelete = async (branchId: string) => {
    setIsLoadingForm(true);
    try {
      const response = await axios.delete(
        `https://parcel-management-back-end.vercel.app/api/v1/branch/${branchId}`
      );
      console.log("Branch deleted successfully:", response.data);
      refetch();
      toast.success("Branch deleted successfully");
    } catch (error) {
      console.error("Error deleting branch:", error);
      toast.error("Failed to delete branch");
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalEntries = branches.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = branches.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Open edit modal and set branch data to edit
  const handleEdit = (branch: BranchData) => {
    setBranchToEdit(branch);
    setValueEdit("name", branch.name);
    setValueEdit("phone", branch.phone);
    setValueEdit("address", branch.address);
    setValueEdit("status", branch.status);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
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
              placeholder="Branch Name"
              {...register("name")}
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

      {/* Branch Table */}
      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Branch</h2>
            <Button
              variant="default"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
              disabled={isLoadingForm}
            >
              <Plus className="h-4 w-4" />
              <span>Add Branch</span>
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
                    <TableHead className="p-3 text-left">Name</TableHead>
                    <TableHead className="p-3 text-left">Phone</TableHead>
                    <TableHead className="p-3 text-left">Address</TableHead>
                    <TableHead className="p-3 text-left">Status</TableHead>
                    <TableHead className="p-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((branchItem, index) => (
                    <TableRow
                      key={branchItem._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="p-3">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="p-3">{branchItem.name}</TableCell>
                      <TableCell className="p-3">{branchItem.phone}</TableCell>
                      <TableCell className="p-3">
                        {branchItem.address}
                      </TableCell>
                      <TableCell className="p-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            branchItem.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {branchItem.status}
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
                              onClick={() => handleEdit(branchItem)}
                            >
                              <Edit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
                              // onClick={() => handleDelete(branchItem._id)}
                              onClick={() =>
                                handleDelete(String(branchItem._id))
                              }
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

      {/* Create Branch Modal using react-modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
        contentLabel="Create Branch Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Create Branch</h2>
          <p>Fill in the details to create a new branch.</p>
        </div>
        <form
          onSubmit={handleSubmitCreate(handleCreateSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...registerCreate("name")}
              placeholder="Branch Name"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              {...registerCreate("phone")}
              placeholder="Phone"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              {...registerCreate("address")}
              placeholder="Address"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <Controller
              control={controlCreate}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoadingForm}>
              {isLoadingForm && (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              )}
              Create
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isLoadingForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Branch Modal using react-modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Branch Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Edit Branch</h2>
          <p>Edit the details of the branch.</p>
        </div>
        <form
          onSubmit={handleSubmitEdit(handleEditSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...registerEdit("name")}
              placeholder="Branch Name"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              {...registerEdit("phone")}
              placeholder="Phone"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              {...registerEdit("address")}
              placeholder="Address"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <Controller
              control={controlEdit}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoadingForm}>
              {isLoadingForm && (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              )}
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isLoadingForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BranchPage;
