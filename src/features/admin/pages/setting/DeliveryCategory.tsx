import { useState } from "react";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";
// Import Sonner toast instead of react-hot-toast
import { toast } from "sonner";

// Import RTK Query hooks (adjust the import path as needed)
import {
  useGetAllDeliveryCategoryQuery,
  useAddDeliveryCategoryMutation,
  useUpdateDeliveryCategoryMutation,
  useDeleteDeliveryCategoryMutation,
} from "@/redux/features/deliveryCategory/deliveryCategoryApi";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import TablePagination from "@/components/ui/TablePagination";

interface DeliveryCategory {
  _id: string;
  title: string;
  status: "Active" | "Inactive";
  position: number;
}

const DeliveryCategoryComponent = () => {
  // Modal & form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<DeliveryCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<DeliveryCategory | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    status: "Active",
    position: 0,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // RTK Query hooks
  const {
    data: categoriesData,
    isFetching,
    refetch,
  } = useGetAllDeliveryCategoryQuery([]);
  const [addDeliveryCategory, { isLoading: isAdding }] =
    useAddDeliveryCategoryMutation();
  const [updateDeliveryCategory, { isLoading: isUpdating }] =
    useUpdateDeliveryCategoryMutation();
  const [deleteDeliveryCategory] = useDeleteDeliveryCategoryMutation();

  // Combine mutation loading states if needed
  const isLoadingMutations = isAdding || isUpdating;

  // Extract the category list and meta from the query response.
  // Assuming the transform returns an object with a "data" array and a "meta" object.
  const categories: DeliveryCategory[] = categoriesData?.data || [];
  const totalEntries = categoriesData?.meta?.total || categories.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  // Slice the data locally for pagination display
  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "position" ? Number(value) : value,
    }));
  };

  // Create category submit handler using the RTK Query mutation with Sonner toast
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(addDeliveryCategory(formData).unwrap(), {
        loading: "Creating category...",
        success: "Category created successfully",
        error: "Failed to create category",
      });
      refetch();
      setIsCreateModalOpen(false);
      setFormData({ title: "", status: "Active", position: 0 });
    } catch (error) {
      // Error handling is done by toast.promise
    }
  };

  // Update category submit handler using the RTK Query mutation
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory) return;
    try {
      await updateDeliveryCategory({
        id: currentCategory._id,
        data: formData,
      }).unwrap();
      refetch();
      toast.success("Category updated successfully");
      setIsEditModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  // Open edit modal and prefill form with selected category data
  const openEditModal = (category: DeliveryCategory) => {
    setCurrentCategory(category);
    setFormData({
      title: category.title,
      status: category.status,
      position: category.position,
    });
    setIsEditModalOpen(true);
  };

  // Delete category handler using the RTK Query mutation with Sonner toast
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await toast.promise(deleteDeliveryCategory(id).unwrap(), {
        loading: "Deleting category...",
        success: "Category deleted successfully",
        error: "Failed to delete category",
      });
      refetch();
    } catch (error) {
      // Error handled by toast.promise
    } finally {
      setDeletingId(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (category: DeliveryCategory) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-4 bg-white w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Delivery Category</h2>
          <Button
            variant="default"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
            disabled={isLoadingMutations}
          >
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`} className="animate-pulse">
                    <TableCell className="p-3">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    </TableCell>
                    {Array.from({ length: 7 }).map((_, colIndex) => (
                      <TableCell
                        key={`skeleton-col-${colIndex}`}
                        className="p-3"
                      >
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedCategories.length > 0 ? (
                paginatedCategories.map((category, index) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell>
                      {(currentPage - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell>{category.title}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          category.status === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {category.status}
                      </span>
                    </TableCell>
                    <TableCell>{category.position}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => openEditModal(category)}
                        className="flex items-center gap-1"
                        disabled={isLoadingMutations}
                      >
                        {isLoadingMutations &&
                        currentCategory?._id === category._id ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-1" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => openDeleteModal(category)}
                        className="flex items-center gap-1"
                        disabled={isLoadingMutations}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <TablePaginationInfo
            startIndex={(currentPage - 1) * pageSize + 1}
            pageSize={pageSize}
            totalEntries={totalEntries}
            currentDataLength={paginatedCategories.length}
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

      {/* Create Category Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new delivery category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Category Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Position</label>
              <Input
                type="number"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button type="submit" disabled={isAdding}>
                {isAdding && <Loader2 className="animate-spin h-4 w-4 mr-1" />}
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Edit the details of the selected delivery category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Category Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Position</label>
              <Input
                type="number"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating && (
                  <Loader2 className="animate-spin h-4 w-4 mr-1" />
                )}
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category "
              {categoryToDelete?.title}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="destructive"
              onClick={async () => {
                if (categoryToDelete) {
                  await handleDelete(categoryToDelete._id);
                  setIsDeleteModalOpen(false);
                  setCategoryToDelete(null);
                }
              }}
              disabled={
                isLoadingMutations && deletingId === categoryToDelete?._id
              }
            >
              {isLoadingMutations && deletingId === categoryToDelete?._id ? (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              ) : (
                "Confirm"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryCategoryComponent;
