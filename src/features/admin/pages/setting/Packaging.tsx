import { useState } from "react";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

// RTK Query hooks
import {
  useGetAllPackagingQuery,
  useAddPackagingMutation,
  useUpdatePackagingMutation,
  useDeletePackagingMutation,
} from "@/redux/features/packaging/packagingApi";

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
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import TablePagination from "@/components/ui/TablePagination";

interface Packaging {
  _id: string;
  title: string;
  price: number;
}

const PackagingComponent = () => {
  // Modal & form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPackaging, setCurrentPackaging] = useState<Packaging | null>(
    null
  );
  const [packagingToDelete, setPackagingToDelete] = useState<Packaging | null>(
    null
  );
  const [formData, setFormData] = useState({ title: "", price: 0 });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // RTK Query hooks
  const {
    data: packagingData,
    isFetching,
    refetch,
  } = useGetAllPackagingQuery([]);
  const [addPackaging, { isLoading: isAdding }] = useAddPackagingMutation();
  const [updatePackaging, { isLoading: isUpdating }] =
    useUpdatePackagingMutation();
  const [deletePackaging] = useDeletePackagingMutation();

  // Combine mutation loading states if needed
  const isLoadingMutations = isAdding || isUpdating;

  // Extract the packaging list and meta from the query response.
  const packagingArray: Packaging[] = packagingData?.data || [];
  const totalEntries = packagingData?.meta?.total || packagingArray.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  // Slice the data locally for pagination display
  const paginatedPackaging = packagingArray.slice(
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
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Create packaging submit handler using the RTK Query mutation with Sonner toast
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(addPackaging(formData).unwrap(), {
        loading: "Creating packaging...",
        success: "Packaging created successfully",
        error: "Failed to create packaging",
      });
      refetch();
      setIsCreateModalOpen(false);
      setFormData({ title: "", price: 0 });
    } catch (error) {
      // Error handling is done by toast.promise
    }
  };

  // Update packaging submit handler using the RTK Query mutation
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPackaging) return;
    try {
      await updatePackaging({
        id: currentPackaging._id,
        data: formData,
      }).unwrap();
      refetch();
      toast.success("Packaging updated successfully");
      setIsEditModalOpen(false);
      setCurrentPackaging(null);
    } catch (error) {
      toast.error("Failed to update packaging");
    }
  };

  // Open edit modal and prefill form with selected packaging data
  const openEditModal = (packaging: Packaging) => {
    setCurrentPackaging(packaging);
    setFormData({
      title: packaging.title,
      price: packaging.price,
    });
    setIsEditModalOpen(true);
  };

  // Delete packaging handler using the RTK Query mutation with Sonner toast
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await toast.promise(deletePackaging(id).unwrap(), {
        loading: "Deleting packaging...",
        success: "Packaging deleted successfully",
        error: "Failed to delete packaging",
      });
      refetch();
    } catch (error) {
      // Error handled by toast.promise
    } finally {
      setDeletingId(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (packaging: Packaging) => {
    setPackagingToDelete(packaging);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-4 bg-white w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Packaging</h2>
          <Button
            variant="default"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
            disabled={isLoadingMutations}
          >
            <Plus className="h-4 w-4" />
            <span>Add Packaging</span>
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
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
                    {Array.from({ length: 3 }).map((_, colIndex) => (
                      <TableCell
                        key={`skeleton-col-${colIndex}`}
                        className="p-3"
                      >
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedPackaging.length > 0 ? (
                paginatedPackaging.map((packaging, index) => (
                  <TableRow
                    key={packaging._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell>
                      {(currentPage - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell>{packaging.title}</TableCell>
                    <TableCell>{packaging.price}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => openEditModal(packaging)}
                        className="flex items-center gap-1"
                        disabled={isLoadingMutations}
                      >
                        {isLoadingMutations &&
                        currentPackaging?._id === packaging._id ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-1" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => openDeleteModal(packaging)}
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
                  <TableCell colSpan={4} className="text-center py-4">
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
            currentDataLength={paginatedPackaging.length}
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

      {/* Create Packaging Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Packaging</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new packaging.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Packaging Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
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

      {/* Edit Packaging Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Packaging</DialogTitle>
            <DialogDescription>
              Edit the details of the selected packaging.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Packaging Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
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
              Are you sure you want to delete the packaging "
              {packagingToDelete?.title}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="destructive"
              onClick={async () => {
                if (packagingToDelete) {
                  await handleDelete(packagingToDelete._id);
                  setIsDeleteModalOpen(false);
                  setPackagingToDelete(null);
                }
              }}
              disabled={
                isLoadingMutations && deletingId === packagingToDelete?._id
              }
            >
              {isLoadingMutations && deletingId === packagingToDelete?._id ? (
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

export default PackagingComponent;
