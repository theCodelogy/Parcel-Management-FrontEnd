import React, { useState } from "react";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useAddDeliveryChargeMutation,
  useDeleteDeliveryChargeMutation,
  useGetAllDeliveryChargeQuery,
  useUpdateDeliveryChargeMutation,
} from "@/redux/features/deliveryCharge/deliveryChargeApi";

interface DeliveryCharge {
  _id?: string;
  category: string;
  weight: number;
  position: number;
  status: "Active" | "Inactive";
  sameDay: number;
  nextDay: number;
  subCity: number;
  outsideCity: number;
}

const DeliveryChargeBranch: React.FC = () => {
  // Modal & form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCharge, setCurrentCharge] = useState<DeliveryCharge | null>(
    null
  );
  const [formData, setFormData] = useState<DeliveryCharge>({
    category: "",
    weight: 0,
    position: 0,
    status: "Active",
    sameDay: 0,
    nextDay: 0,
    subCity: 0,
    outsideCity: 0,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // RTK Query hooks
  const {
    data: chargesData,
    isLoading: isFetching,
    isError: fetchError,
    error: fetchErrorData,
  } = useGetAllDeliveryChargeQuery([]);

  const [addDeliveryCharge, { isLoading: isCreating }] =
    useAddDeliveryChargeMutation();
  const [updateDeliveryCharge, { isLoading: isUpdating }] =
    useUpdateDeliveryChargeMutation();
  const [deleteDeliveryCharge, { isLoading: isDeleting }] =
    useDeleteDeliveryChargeMutation();

  const charges: DeliveryCharge[] | undefined = chargesData?.data;

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "position" ||
        name === "weight" ||
        name === "sameDay" ||
        name === "nextDay" ||
        name === "subCity" ||
        name === "outsideCity"
          ? Number(value)
          : value,
    }));
  };

  // Form submit handlers
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addDeliveryCharge(formData).unwrap();
      toast.success(response.message || "Charge created successfully");
      setIsCreateModalOpen(false);
      setFormData({
        category: "",
        weight: 0,
        position: 0,
        status: "Active",
        sameDay: 0,
        nextDay: 0,
        subCity: 0,
        outsideCity: 0,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create charge");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCharge?._id) return;
    try {
      const response = await updateDeliveryCharge({
        id: currentCharge._id,
        data: formData,
      }).unwrap();
      toast.success(response.message || "Charge updated successfully");
      setIsEditModalOpen(false);
      setCurrentCharge(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update charge");
    }
  };

  // Open edit modal
  const openEditModal = (charge: DeliveryCharge) => {
    setCurrentCharge(charge);
    setFormData({
      category: charge.category,
      weight: charge.weight,
      position: charge.position,
      status: charge.status,
      sameDay: charge.sameDay,
      nextDay: charge.nextDay,
      subCity: charge.subCity,
      outsideCity: charge.outsideCity,
    });
    setIsEditModalOpen(true);
  };

  // Delete handler with per-row loading indicator
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await deleteDeliveryCharge(id).unwrap();
      toast.success(response.message || "Charge deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete charge");
    } finally {
      setDeletingId(null);
    }
  };

  if (fetchError) {
    toast.error((fetchErrorData as any).message || "Failed to fetch data");
  }

  return (
    <div className="container mx-auto p-4">
      {/* React Hot Toast */}
      <Toaster />

      {/* Spinner when fetching data */}
      {isFetching ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-white w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Delivery Charge</h2>
            <Button
              variant="default"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
              disabled={isCreating}
            >
              <Plus className="h-4 w-4" />
              <span>Add Charge</span>
            </Button>
          </div>
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Same Day</TableHead>
                  <TableHead>Next Day</TableHead>
                  <TableHead>Sub City</TableHead>
                  <TableHead>Outside City</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      <Loader2 className="animate-spin h-4 w-4 mr-1" />
                      Data is coming...
                    </TableCell>
                  </TableRow>
                )}
                {!isFetching && charges && charges.length > 0
                  ? charges.map((charge, index) => (
                      <TableRow
                        key={charge._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{charge.category}</TableCell>
                        <TableCell>{charge.weight}</TableCell>
                        <TableCell>{charge.position}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              charge.status === "Active"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {charge.status}
                          </span>
                        </TableCell>
                        <TableCell>৳{charge.sameDay.toFixed(2)}</TableCell>
                        <TableCell>৳{charge.nextDay.toFixed(2)}</TableCell>
                        <TableCell>৳{charge.subCity.toFixed(2)}</TableCell>
                        <TableCell>৳{charge.outsideCity.toFixed(2)}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => openEditModal(charge)}
                            className="flex items-center gap-1"
                            disabled={isUpdating}
                          >
                            {isUpdating && currentCharge?._id === charge._id ? (
                              <Loader2 className="animate-spin h-4 w-4 mr-1" />
                            ) : (
                              <Edit className="h-4 w-4" />
                            )}
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              charge._id && handleDelete(charge._id)
                            }
                            className="flex items-center gap-1"
                            disabled={isDeleting && deletingId === charge._id}
                          >
                            {isDeleting && deletingId === charge._id ? (
                              <Loader2 className="animate-spin h-4 w-4 mr-1" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <span>Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : !isFetching && (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-4">
                          No data found
                        </TableCell>
                      </TableRow>
                    )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Create Charge Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Charge</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Weight</label>
              <Input
                type="number"
                name="weight"
                placeholder="Weight"
                value={formData.weight}
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
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Same Day</label>
              <Input
                type="number"
                name="sameDay"
                placeholder="Same Day"
                value={formData.sameDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Next Day</label>
              <Input
                type="number"
                name="nextDay"
                placeholder="Next Day"
                value={formData.nextDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Sub City</label>
              <Input
                type="number"
                name="subCity"
                placeholder="Sub City"
                value={formData.subCity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Outside City</label>
              <Input
                type="number"
                name="outsideCity"
                placeholder="Outside City"
                value={formData.outsideCity}
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button type="submit" disabled={isCreating}>
                {isCreating && (
                  <Loader2 className="animate-spin h-4 w-4 mr-1" />
                )}
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Charge Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Charge</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Weight</label>
              <Input
                type="number"
                name="weight"
                placeholder="Weight"
                value={formData.weight}
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
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Same Day</label>
              <Input
                type="number"
                name="sameDay"
                placeholder="Same Day"
                value={formData.sameDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Next Day</label>
              <Input
                type="number"
                name="nextDay"
                placeholder="Next Day"
                value={formData.nextDay}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Sub City</label>
              <Input
                type="number"
                name="subCity"
                placeholder="Sub City"
                value={formData.subCity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Outside City</label>
              <Input
                type="number"
                name="outsideCity"
                placeholder="Outside City"
                value={formData.outsideCity}
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
    </div>
  );
};

export default DeliveryChargeBranch;
