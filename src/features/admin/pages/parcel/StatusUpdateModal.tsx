import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetAllDeliveryManQuery } from "@/redux/features/deliveryMan/deliveryManApi";
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcelApi";
import { TDeliveryMan } from "type/deliveryManType";
import { Toaster, toast } from "sonner"; // Import Sonner

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus: string;
  parcelId: string;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  isOpen,
  onClose,
  selectedStatus,
  parcelId,
}) => {
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState<
    string | undefined
  >(undefined);
  const [isUpdating, setIsUpdating] = useState(false); // Track update loading state
  const [updateParcelStatus] = useUpdateParcelStatusMutation();

  const handleConfirm = async () => {
    setIsUpdating(true);
    const updateToast = toast.loading("Updating status..."); // Show loading toast

    try {
      await updateParcelStatus({
        id: parcelId,
        data: {
          title: selectedStatus,
          statusDetails: {
            deliveryMan: selectedDeliveryMan,
            note: `${selectedStatus} assigned.`,
          },
        },
      }).unwrap();

      toast.success("Status updated successfully", { id: updateToast }); // Update toast to success
      onClose(); // Close the modal after successful update
    } catch (error: any) {
      toast.error("Error updating status", { id: updateToast }); // Update toast to error
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const {
    data: deliveryMenResponse,
    isLoading,
    error,
  } = useGetAllDeliveryManQuery(null);
  const deliveryMen = deliveryMenResponse?.data ?? [];

  return (
    <>
      <Toaster position="top-right" /> {/* Add Toaster component */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStatus}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to update the status to{" "}
            <strong>{selectedStatus}</strong>?
          </p>
          {selectedStatus === "Delivery Man Assigned" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Delivery Man
              </label>
              {isLoading ? (
                <div className="flex justify-center items-center h-12">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              ) : error ? (
                <div className="text-red-500">
                  Error loading delivery men data. Please try again later.
                </div>
              ) : (
                <Select
                  value={selectedDeliveryMan}
                  onValueChange={setSelectedDeliveryMan}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a delivery man" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryMen.map((deliveryMan: TDeliveryMan) => (
                      <SelectItem
                        key={deliveryMan._id}
                        value={deliveryMan.email}
                      >
                        {deliveryMan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isUpdating}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirm}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusUpdateModal;
