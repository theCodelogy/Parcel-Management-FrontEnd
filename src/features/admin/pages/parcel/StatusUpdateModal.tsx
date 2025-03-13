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
import axios from "axios";
import { DeliveryManData } from "../../types";
import { useQuery } from "@tanstack/react-query";

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus: string;
  parcelId: string;
}

// Fetch delivery man data from API using Axios
export const fetchDeliveryManApi = async (): Promise<DeliveryManData[]> => {
  const response = await axios.get<{ data: DeliveryManData[] }>(
    "https://parcel-management-back-end.vercel.app/api/v1/deliveryMan"
  );
  console.log("Delivery man data fetched:", response.data.data);
  return response.data.data;
};

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  isOpen,
  onClose,
  selectedStatus,
  parcelId,
}) => {
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState<
    string | undefined
  >(undefined);

  const handleConfirm = async () => {
    console.log("selectedDeliveryMan: ", selectedDeliveryMan);
    try {
      const response = await axios.put(
        `https://parcel-management-back-end.vercel.app/api/v1/parcel/${parcelId}`,
        {
          title: selectedStatus,
          statusDetails: {
            deliveryMan: selectedDeliveryMan,
            note: `${selectedStatus} assigned.`,
          },
        }
      );

      console.log("Status updated successfully:", response.data.data);
      onClose(); // Close the modal after successful update
    } catch (error:any) {
      console.error("Error updating status:", error.response.data);
      // Handle error (e.g., show an error message to the user)
    }
  };

  // Use react-query to fetch delivery men data
  const {
    data: deliveryMen = [],
    isLoading,
    error,
  } = useQuery<DeliveryManData[]>({
    queryKey: ["deliveryMen"],
    queryFn: fetchDeliveryManApi,
  });

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
                {deliveryMen.map((deliveryMan) => (
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
