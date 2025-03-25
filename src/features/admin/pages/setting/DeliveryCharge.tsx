import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  useGetAllDeliveryChargeQuery,
  useUpdateDeliveryChargeMutation,
} from "@/redux/features/deliveryCharge/deliveryChargeApi";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type TDeliveryCharge = {
  _id?: string;
  chargeList?: {
    sameDay: number;
    nextDay: number;
    subCity: number;
    outsideCity: number;
  };
  increasePerKG?: {
    sameDay: number;
    nextDay: number;
    subCity: number;
    outsideCity: number;
  };
};

const DeliveryChargePage: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetAllDeliveryChargeQuery([]);
  const [updateDeliveryCharge, { isLoading: isUpdating }] =
    useUpdateDeliveryChargeMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<TDeliveryCharge>({
    chargeList: {
      sameDay: 0,
      nextDay: 0,
      subCity: 0,
      outsideCity: 0,
    },
    increasePerKG: {
      sameDay: 0,
      nextDay: 0,
      subCity: 0,
      outsideCity: 0,
    },
  });

  console.log("Fetched Data:", data);

  if (error) {
    return <div>Error loading data</div>;
  }

  const deliveryData: TDeliveryCharge | undefined = (
    data?.data as TDeliveryCharge[]
  )?.[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TDeliveryCharge,
    subField: keyof TDeliveryCharge["chargeList"]
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      // Ensure prev[field] is treated as an object
      const fieldData = prev[field] as Record<string, number> | undefined;

      return {
        ...prev,
        [field]: {
          ...(fieldData || {}),
          [subField]: Number(value),
        },
      };
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(
        updateDeliveryCharge({
          id: deliveryData?._id,
          data: formData,
        }).unwrap(),
        {
          loading: "Updating charges...",
          success: "Charges updated successfully",
          error: "Failed to update charges",
        }
      );
      refetch();
      setIsEditModalOpen(false);
    } catch (error) {
      // Error handling is done by toast.promise
    }
  };

  const openEditModal = () => {
    if (deliveryData) {
      setFormData(deliveryData);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Delivery Charge Details
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Delivery Charges and Increase Per KG
        </h3>
        <div>
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={openEditModal}
          >
            <Edit className="h-4 w-4" />
            <span>Edit Charge</span>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-black">
                Delivery Type
              </TableHead>
              <TableHead className="bg-gray-200 text-black">
                Charge (BDT)
              </TableHead>
              <TableHead className="bg-gray-200 text-black">
                Increase Per KG (BDT)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`} className="animate-pulse">
                    <TableCell className="p-3">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </TableCell>
                    <TableCell className="p-3">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </TableCell>
                    <TableCell className="p-3">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </TableCell>
                  </TableRow>
                ))
              : deliveryData?.chargeList &&
                Object.entries(deliveryData.chargeList).map(
                  ([key, chargeValue]) => {
                    const increaseValue =
                      deliveryData.increasePerKG?.[
                        key as keyof typeof deliveryData.increasePerKG
                      ] || 0;
                    return (
                      <TableRow key={key}>
                        <TableCell className="capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </TableCell>
                        <TableCell>{chargeValue}</TableCell>
                        <TableCell>{increaseValue}</TableCell>
                      </TableRow>
                    );
                  }
                )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Charge Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Charges</DialogTitle>
            <DialogDescription>
              Edit the delivery charges and increase per KG.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {Object.keys(formData.chargeList || {}).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")} Charge (BDT)
                </label>
                <Input
                  type="number"
                  value={
                    formData.chargeList?.[
                      key as keyof typeof formData.chargeList
                    ] || 0
                  }
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "chargeList",
                      key as keyof typeof formData.chargeList
                    )
                  }
                />
                <label className="block text-sm font-medium capitalize mt-2">
                  {key.replace(/([A-Z])/g, " $1")} Increase Per KG (BDT)
                </label>
                <Input
                  type="number"
                  value={
                    formData.increasePerKG?.[
                      key as keyof typeof formData.increasePerKG
                    ] || 0
                  }
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "increasePerKG",
                      key as keyof typeof formData.increasePerKG
                    )
                  }
                />
              </div>
            ))}
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

export default DeliveryChargePage;
