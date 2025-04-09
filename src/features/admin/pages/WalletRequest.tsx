import React, { useState } from "react";
import { Eraser, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Import the AlertDialog components
import {
  useGetAllWalletRequestsQuery,
  useUpdateWalletRequestMutation,
} from "@/redux/features/walletRequest/walletRequestApi";

export interface IWalletRequest {
  _id: string;
  merchantName: string;
  amount: string;
  status: "confirmed" | "pending";
  createdAt: string;
  updatedAt: string;
}

const WalletRequest: React.FC = () => {
  const [filters, setFilters] = useState({
    date: "",
    merchant: "",
  });

  const [selectedRequest, setSelectedRequest] = useState<IWalletRequest | null>(
    null
  );

  const {
    data: walletRequests,
    error,
    isLoading,
  } = useGetAllWalletRequestsQuery([{ name: "status", value: "pending" }]);

  const [updateWalletRequest] = useUpdateWalletRequestMutation();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      date: "",
      merchant: "",
    });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Filters applied:", filters);
  };

  const handleApprove = (request: IWalletRequest) => {
    setSelectedRequest(request);
  };

  const handleClose = () => {
    setSelectedRequest(null);
  };

  const handleConfirm = async () => {
    if (selectedRequest) {
      await updateWalletRequest({
        id: selectedRequest._id,
        data: { status: "confirmed" },
      });
      console.log("Request confirmed:", selectedRequest);
      handleClose();
    }
  };

  const pageSize = 5; // Number of skeleton rows to display

  if (error) {
    return <div>Error loading wallet requests</div>;
  }

  return (
    <div className="">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* Filter Container */}
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0"
        >
          {/* Date Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Merchant Dropdown */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Merchant
            </label>
            <select
              name="merchant"
              value={filters.merchant}
              onChange={handleFilterChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Merchant</option>
              <option value="merchant1">Merchant 1</option>
              <option value="merchant2">Merchant 2</option>
            </select>
          </div>

          {/* Search & Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="destructive"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <Eraser className="text-sm" /> Clear
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-[#6610f2] text-white hover:bg-blue-700 transition-colors"
            >
              <Filter className="text-sm" /> Filter
            </Button>
          </div>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Recharge", value: "৳ 0.00" },
          { title: "Total Deductions", value: "৳ 0.00" },
          { title: "Pending", value: "0" },
          { title: "Confirmed", value: "0" },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <p className="text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Wallet Request List */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Wallet Request List</h1>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {["SL", "Merchant", "Date", "Amount", "Status", "Actions"].map(
                  (header) => (
                    <TableHead key={header} className="p-2 text-left">
                      {header}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className="animate-pulse"
                    >
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
                      <TableCell className="p-3 text-right">
                        <div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div>
                      </TableCell>
                    </TableRow>
                  ))
                : walletRequests?.data?.map(
                    (request: IWalletRequest, index: number) => (
                      <TableRow key={request._id} className="hover:bg-gray-100">
                        <TableCell className="p-2">{index + 1}</TableCell>
                        <TableCell className="p-2">
                          {request.merchantName}
                        </TableCell>
                        <TableCell className="p-2">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="p-2 font-semibold text-green-600">
                          ৳{request.amount}
                        </TableCell>
                        <TableCell className="p-2">{request.status}</TableCell>
                        <TableCell className="p-2">
                          <AlertDialog
                            open={selectedRequest?._id === request._id}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="default"
                                onClick={() => handleApprove(request)}
                              >
                                Approve
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Request Details
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <div>
                                    <p>
                                      <strong>Merchant:</strong>{" "}
                                      {selectedRequest?.merchantName}
                                    </p>
                                    <p>
                                      <strong>Amount:</strong> ৳
                                      {selectedRequest?.amount}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{" "}
                                      {new Date(
                                        selectedRequest?.createdAt || ""
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      <strong>Status:</strong>{" "}
                                      {selectedRequest?.status}
                                    </p>
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleClose}>
                                  Close
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirm}>
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )
                  )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WalletRequest;
