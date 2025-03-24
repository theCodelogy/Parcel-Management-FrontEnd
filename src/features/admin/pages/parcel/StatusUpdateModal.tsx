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
import { useGetAllDeliveryManQuery } from "@/redux/features/deliveryMan/deliveryManApi"; // Import the RTK Query hook
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcelApi";
import { TDeliveryMan } from "type/deliveryManType";

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

  const [updateParcelStatus] = useUpdateParcelStatusMutation(); // Use the RTK Query hook

  const handleConfirm = async () => {
    console.log("selectedDeliveryMan: ", selectedDeliveryMan);
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

      console.log("Status updated successfully");
      onClose(); // Close the modal after successful update
    } catch (error: any) {
      console.error("Error updating status:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  // Use RTK Query to fetch delivery men data
  const {
    data: deliveryMenResponse,
    isLoading,
    error,
  } = useGetAllDeliveryManQuery(null);

  const deliveryMen = deliveryMenResponse?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading delivery men data</div>;
  }

  return (
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
            <Select
              value={selectedDeliveryMan}
              onValueChange={setSelectedDeliveryMan}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a delivery man" />
              </SelectTrigger>
              <SelectContent>
                {deliveryMen.map((deliveryMan: TDeliveryMan) => (
                  <SelectItem key={deliveryMan._id} value={deliveryMan.email}>
                    {deliveryMan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateModal;
