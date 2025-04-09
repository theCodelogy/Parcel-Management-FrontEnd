import { useState } from "react";
import { Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Import the new RTK Query hooks
import {
  useGetAllLiquidFragileQuery,
  useAddLiquidFragileMutation,
  useUpdateLiquidFragileMutation,
} from "@/redux/features/liquidFragile/liquidFragileApi";

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

interface DeliveryCategory {
  _id: string;
  title: string;
  charge: number;
  status: "Active" | "Inactive";
}

const LiquidFragile = () => {
  // Modal & form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<DeliveryCategory | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    charge: 0,
    status: "Active",
  });

  // Pagination state
  const [currentPage] = useState(1);
  const pageSize = 1;

  // RTK Query hooks
  const {
    data: categoriesData,
    isFetching,
    refetch,
  } = useGetAllLiquidFragileQuery([]);
  const [addLiquidFragile, { isLoading: isAdding }] =
    useAddLiquidFragileMutation();
  const [updateLiquidFragile, { isLoading: isUpdating }] =
    useUpdateLiquidFragileMutation();

  // Combine mutation loading states if needed
  const isLoadingMutations = isAdding || isUpdating;

  // Extract the category list and meta from the query response.
  // Assuming the transform returns an object with a "data" array and a "meta" object.
  const categories: DeliveryCategory[] = categoriesData?.data || [];

  // Slice the data locally for pagination display
  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "charge" ? Number(value) : value,
    }));
  };

  // Create category submit handler using the RTK Query mutation with Sonner toast
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(addLiquidFragile(formData).unwrap(), {
        loading: "Creating category...",
        success: "Category created successfully",
        error: "Failed to create category",
      });
      refetch();
      setIsCreateModalOpen(false);
      setFormData({ title: "", charge: 0, status: "Active" });
    } catch (error) {
      // Error handling is done by toast.promise
    }
  };

  // Update category submit handler using the RTK Query mutation
  // Note: The title is not updated since editing of the title is not allowed.
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory) return;
    try {
      // Only charge and status are updated.
      await updateLiquidFragile({
        id: currentCategory._id,
        data: { charge: formData.charge, status: formData.status },
      }).unwrap();
      refetch();
      toast.success("Category updated successfully");
      setIsEditModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  // Open edit modal and prefill form with selected category data.
  // The title is set in formData but will not be editable.
  const openEditModal = (category: DeliveryCategory) => {
    setCurrentCategory(category);
    setFormData({
      title: category.title,
      charge: category.charge,
      status: category.status,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="shadow-lg rounded-lg p-4 bg-white w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Liquid Fragile</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Charge</TableHead>
                <TableHead>Status</TableHead>
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
                    {Array.from({ length: 4 }).map((_, colIndex) => (
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
                    <TableCell>{category.charge}</TableCell>
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
              <label className="block text-sm font-medium">Charge</label>
              <Input
                type="number"
                name="charge"
                placeholder="Charge"
                value={formData.charge}
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
            <DialogTitle>Edit Liquid Fragile</DialogTitle>
            <DialogDescription>
              Edit the charge and status of the selected delivery category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {/* Title is displayed but not editable */}
            <div>
              <label className="block text-sm font-medium">Title</label>
              <div className="p-2 border rounded bg-gray-100">
                {currentCategory?.title}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Charge</label>
              <Input
                type="number"
                name="charge"
                placeholder="Charge"
                value={formData.charge}
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
    </div>
  );
};

export default LiquidFragile;
