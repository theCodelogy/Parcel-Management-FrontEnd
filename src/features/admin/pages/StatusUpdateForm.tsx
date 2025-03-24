import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

type TrackerStatus =
  | "Pending"
  | "In Transit"
  | "Delivered"
  | "Returned"
  | "Pickup Assigned"
  | "Pickup Re-Schedule"
  | "Received By Pickup Man"
  | "Received By Hub"
  | "Delivery Man Assigned"
  | "Received Warehouse"
  | "Transfer to hub"
  | "Received by hub"
  | "Return to Courier"
  | "Partial Delivered"
  | "Return assigned to merchant"
  | "Return received by merchant";

interface StatusUpdateFormProps {
  currentStatus: TrackerStatus;
  onUpdate: (newStatus: TrackerStatus) => void;
}

const StatusUpdateForm = ({ currentStatus, onUpdate }: StatusUpdateFormProps) => {
  const [newStatus, setNewStatus] = useState<TrackerStatus>(currentStatus);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdate(newStatus);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as TrackerStatus)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
              <option value="Pickup Assigned">Pickup Assigned</option>
              <option value="Pickup Re-Schedule">Pickup Re-Schedule</option>
              <option value="Received By Pickup Man">Received By Pickup Man</option>
              <option value="Received By Hub">Received By Hub</option>
              <option value="Delivery Man Assigned">Delivery Man Assigned</option>
              <option value="Received Warehouse">Received Warehouse</option>
              <option value="Transfer to hub">Transfer to hub</option>
              <option value="Received by hub">Received by hub</option>
              <option value="Return to Courier">Return to Courier</option>
              <option value="Partial Delivered">Partial Delivered</option>
              <option value="Return assigned to merchant">Return assigned to merchant</option>
              <option value="Return received by merchant">Return received by merchant</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Update Status
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateForm;
