import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Eraser,
  Filter,
  Edit,
  Trash,
  Plus,
  MoreVerticalIcon,
  Loader2,
} from "lucide-react";
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
import { toast } from "sonner";
import {
  useGetAllBranchQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} from "../../../../redux/features/branch/branchApi"; // Import the RTK Query hooks
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Import shadcn/ui Dialog components

export type TBranch = {
  _id: string; // Add the _id property
  name: string;
  branchManagerName: string;
  password: string;
  phone: string;
  email: string;
  address: string;
  status: "Active" | "Disabled";
  role: "Branch";
  createdAt: Date;
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
  const {
    register,
    handleSubmit,
    reset: resetFilterForm,
  } = useForm<Filters>({
    defaultValues: { name: "", phone: "" },
  });

  // react-hook-form for create branch form
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreateForm,
    control: controlCreate,
    formState: { errors: createErrors },
    setError: setCreateError,
  } = useForm<TBranch>({
    defaultValues: {
      name: "",
      branchManagerName: "",
      password: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
      role: "Branch",
      createdAt: new Date(),
    },
  });

  // react-hook-form for edit branch form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEditForm,
    control: controlEdit,
    setValue: setValueEdit,
    formState: { errors: editErrors },
    setError: setEditError,
  } = useForm<TBranch>({
    defaultValues: {
      name: "",
      branchManagerName: "",
      password: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
      role: "Branch",
      createdAt: new Date(),
    },
  });

  // RTK Query hooks
  const [filterParams, setFilterParams] = useState<Filters>({
    name: "",
    phone: "",
  });
  const {
    data: branchesData,
    isLoading,
    error,
    refetch,
  } = useGetAllBranchQuery([
    { name: "name", value: filterParams.name },
    { name: "phone", value: filterParams.phone },
  ]); // Initial query with empty filters

  const branches: TBranch[] = branchesData?.data || []; // Type the branches variable
  console.log("Branches data:", branches);
  const [addBranch] = useAddBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState<TBranch | null>(null);

  // New state for filter button loading state
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter handlers
  const onSubmit = async (data: Filters) => {
    console.log("Filter data submitted:", data);
    setIsFiltering(true); // Set loading state to true
    setFilterParams(data); // Update filter state
    try {
      await refetch(); // Manually trigger refetch with new filters
    } finally {
      setIsFiltering(false); // Set loading state to false
    }
  };

  const onClear = () => {
    console.log("Clearing filter data...");
    resetFilterForm();
    setFilterParams({ name: "", phone: "" });
    setIsFiltering(false);
  };

  // Form submit handler for creating a new branch
  const handleCreateSubmit = async (data: TBranch) => {
    setIsLoadingForm(true);
    const toastId = toast.loading("Creating branch...");
    try {
      const response = await addBranch(data).unwrap();
      console.log("Branch created successfully:", response);
      refetch();
      toast.success("Branch created successfully", { id: toastId });
      setIsCreateModalOpen(false);
      resetCreateForm();
    } catch (error: any) {
      console.error("Error creating branch:", error.data);
      const errorMessage = error.data?.message || "Failed to create branch";
      toast.error(errorMessage, { id: toastId });

      if (errorMessage === "This Email is Already Exist!") {
        setCreateError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage === "Duplicate Key Error") {
        error.data.errorSource.forEach(
          (error: { path: string; message: string }) => {
            setCreateError(error.path as keyof TBranch, {
              type: "manual",
              message: error.message,
            });
          }
        );
      }
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Form submit handler for editing a branch
  const handleEditSubmit = async (data: TBranch) => {
    setIsLoadingForm(true);
    const toastId = toast.loading("Updating branch...");
    try {
      if (branchToEdit?._id) {
        const response = await updateBranch({
          id: branchToEdit._id,
          data,
        }).unwrap();
        console.log("Branch edited successfully:", response);
        refetch();
        toast.success("Branch edited successfully", { id: toastId });
        setIsEditModalOpen(false);
        resetEditForm();
      }
    } catch (error: any) {
      console.error("Error editing branch:", error.data);
      const errorMessage = error.data?.message || "Failed to edit branch";
      toast.error(errorMessage, { id: toastId });

      if (errorMessage === "This Email is Already Exist!") {
        setEditError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage === "Duplicate Key Error") {
        error.data.errorSource.forEach(
          (error: { path: string; message: string }) => {
            setEditError(error.path as keyof TBranch, {
              type: "manual",
              message: error.message,
            });
          }
        );
      }
    } finally {
      setIsLoadingForm(false);
    }
  };

  // Delete handler for deleting a branch
  const handleDelete = async (branchId: string) => {
    setIsLoadingForm(true);
    const toastId = toast.loading("Deleting branch...");
    try {
      await deleteBranch(branchId).unwrap();
      refetch();
      toast.success("Branch deleted successfully", { id: toastId });
    } catch (error: any) {
      console.error("Error deleting branch:", error.data);
      const errorMessage = error.data?.message || "Failed to delete branch";
      toast.error(errorMessage, { id: toastId });
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
  const handleEdit = (branch: TBranch) => {
    setBranchToEdit(branch);
    setValueEdit("name", branch.name);
    setValueEdit("branchManagerName", branch.branchManagerName);
    setValueEdit("phone", branch.phone);
    setValueEdit("email", branch.email);
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
                  {Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className="animate-pulse"
                    >
                      <TableCell className="p-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      </TableCell>
                      {Array.from({ length: 5 }).map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-col-${colIndex}`}
                          className="p-3"
                        >
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : error ? (
              <p className="p-3 text-red-600">
                Error: {(error as any).message || "Failed to load data"}
              </p>
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
                              onClick={() => handleDelete(branchItem._id)}
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

      {/* Create Branch Modal using shadcn/ui Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Branch</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new branch.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmitCreate(handleCreateSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("name", { required: "Name is required" })}
                placeholder="Branch Name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.name && (
                <p className="text-red-500 text-sm">
                  {createErrors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Branch Manager Name <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("branchManagerName", {
                  required: "Branch Manager Name is required",
                })}
                placeholder="Branch Manager Name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.branchManagerName && (
                <p className="text-red-500 text-sm">
                  {createErrors.branchManagerName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("phone", { required: "Phone is required" })}
                placeholder="Phone"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.phone && (
                <p className="text-red-500 text-sm">
                  {createErrors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("email", { required: "Email is required" })}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.email && (
                <p className="text-red-500 text-sm">
                  {createErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("address", {
                  required: "Address is required",
                })}
                placeholder="Address"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.address && (
                <p className="text-red-500 text-sm">
                  {createErrors.address.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                {...registerCreate("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                type="password"
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {createErrors.password && (
                <p className="text-red-500 text-sm">
                  {createErrors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <Controller
                control={controlCreate}
                name="status"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {createErrors.status && (
                <p className="text-red-500 text-sm">
                  {createErrors.status.message}
                </p>
              )}
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
        </DialogContent>
      </Dialog>

      {/* Edit Branch Modal using shadcn/ui Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>
              Edit the details of the branch.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmitEdit(handleEditSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...registerEdit("name", { required: "Name is required" })}
                placeholder="Branch Name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {editErrors.name && (
                <p className="text-red-500 text-sm">
                  {editErrors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Branch Manager Name <span className="text-red-500">*</span>
              </label>
              <input
                {...registerEdit("branchManagerName", {
                  required: "Branch Manager Name is required",
                })}
                placeholder="Branch Manager Name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {editErrors.branchManagerName && (
                <p className="text-red-500 text-sm">
                  {editErrors.branchManagerName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                {...registerEdit("phone", { required: "Phone is required" })}
                placeholder="Phone"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {editErrors.phone && (
                <p className="text-red-500 text-sm">
                  {editErrors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...registerEdit("email", { required: "Email is required" })}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {editErrors.email && (
                <p className="text-red-500 text-sm">
                  {editErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                {...registerEdit("address", {
                  required: "Address is required",
                })}
                placeholder="Address"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {editErrors.address && (
                <p className="text-red-500 text-sm">
                  {editErrors.address.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <Controller
                control={controlEdit}
                name="status"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {editErrors.status && (
                <p className="text-red-500 text-sm">
                  {editErrors.status.message}
                </p>
              )}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BranchPage;
