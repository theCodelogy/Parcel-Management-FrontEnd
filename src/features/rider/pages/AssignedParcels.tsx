import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Eraser, Filter, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TablePagination from "@/components/ui/TablePagination";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import StatusUpdateModal from "@/features/admin/pages/parcel/StatusUpdateModal";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcelApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/interface";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

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

type PaymentStatus = "Paid" | "Pending" | "Partial";

type StatusUpdate = {
  title: string;
  current?: string;
  email?: string;
  name?: string;
  phone?: string;
  deliveryMan?: string;
  deliveryManPhone?: string;
  deliveryManEmail?: string;
  note?: string;
  date: number;
  createdBy?: {
    email?: string;
    name?: string;
    phone?: string;
    role?: string;
    date: number;
  };
};

type ApiResponse = {
  _id: string;
  TrakingId: string;
  merchantEmail: string;
  merchantName: string;
  merchantAddress: string;
  merchantPhone: string;
  cashCollection: number;
  sellingPrice: number;
  invoice: string;
  deliveryType: string;
  Weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string;
  packaging: string;
  priority: string;
  paymentMethod: string;
  deliveryCharge: number;
  liquidORFragile: number;
  codCharge: number;
  totalCharge: number;
  vat: number;
  netPayable: number;
  advance: number;
  currentPayable: number;
  currentStatus: TrackerStatus;
  parcelStatus: {
    title: string;
    date: number;
    deliveryMan?: string;
    deliveryManPhone?: string;
    deliveryManEmail?: string;
    note?: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type Tracker = {
  id: string;
  trackingId: string;
  merchant: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  financial: {
    codAmount: number;
    charges: number;
    vat: number;
    currentPayable: number;
  };
  payment: {
    status: PaymentStatus;
    amountPaid: number;
    amountPending: number;
    method?: string;
  };
  status: TrackerStatus;
  statusUpdates: StatusUpdate[];
  // Not available in the new structure; can be set to null or omitted.
  pickupDate: null;
  deliveryDate: null;
  address: string;
  weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
};

const formatCurrency = (amount: number): string => {
  return `৳${amount.toFixed(2)}`;
};

const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  let bgColor = "";

  switch (status) {
    case "Paid":
      bgColor = "bg-green-500";
      break;
    case "Pending":
      bgColor = "bg-yellow-500";
      break;
    case "Partial":
      bgColor = "bg-orange-500";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${bgColor}`}
    >
      {status}
    </span>
  );
};

interface Filters {
  trackerId: string;
  recipient: string;
  merchant: string;
}

const AssignedParcels = () => {
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: {
      trackerId: "",
      recipient: "",
      merchant: "",
    },
  });

  const [filters, setFilters] = useState<Filters>({
    trackerId: "",
    recipient: "",
    merchant: "",
  });

  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // State for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TrackerStatus | null>(
    null
  );
  const [selectedTrackerId, setSelectedTrackerId] = useState<string | null>(
    null
  );

  const { email } = useAppSelector(useCurrentUser) as TUser;

  // Log the API call parameters
  console.log("API Call Parameters:", {
    deliveryManEmail: email,
    currentStatus: "Delivery Man Assigned",
  });

  const { data, isLoading, isError } = useGetAllParcelQuery([
    { name: "parcelStatus.deliveryManEmail", value: email },
    { name: "currentStatus", value: "Delivery Man Assigned" },
  ]);

  useEffect(() => {
    if (data?.data) {
      const trackers = data.data.map((item: ApiResponse) => ({
        id: item._id,
        trackingId: item.TrakingId,
        merchant: {
          name: item.merchantName,
          email: item.merchantEmail,
          address: item.merchantAddress,
          phone: item.merchantPhone,
        },
        financial: {
          codAmount: item.cashCollection,
          charges: item.totalCharge,
          vat: item.vat,
          currentPayable: item.netPayable,
        },
        payment: {
          status: item.netPayable === 0 ? "Paid" : ("Pending" as PaymentStatus),
          amountPaid: item.advance,
          amountPending: item.netPayable,
          method: item.paymentMethod,
        },
        status: item.currentStatus,
        statusUpdates: item.parcelStatus.map((status) => ({
          title: status.title,
          deliveryMan: status.deliveryMan,
          deliveryManPhone: status.deliveryManPhone,
          deliveryManEmail: status.deliveryManEmail,
          note: status.note,
          date: status.date,
        })),
        pickupDate: null,
        deliveryDate: null,
        address: item.customerAddress,
        weight: item.Weight,
        customerName: item.customerName,
        customerPhone: item.customerPhone,
        customerAddress: item.customerAddress,
      }));
      setTrackers(trackers);
    }
  }, [data]);

  const onSubmit = (data: Filters) => {
    setFilters(data);
    setCurrentPage(1);
  };

  const onClear = () => {
    reset();
    setFilters({
      trackerId: "",
      recipient: "",
      merchant: "",
    });
    setCurrentPage(1);
  };

  const filteredTrackers = useMemo(() => {
    return trackers.filter((tracker) => {
      const matchTrackerId = filters.trackerId
        ? tracker.trackingId
            .toLowerCase()
            .includes(filters.trackerId.toLowerCase())
        : true;
      const matchRecipient = filters.recipient
        ? tracker.customerName
            .toLowerCase()
            .includes(filters.recipient.toLowerCase())
        : true;
      const matchMerchant = filters.merchant
        ? tracker.merchant.name
            .toLowerCase()
            .includes(filters.merchant.toLowerCase())
        : true;

      return matchTrackerId && matchRecipient && matchMerchant;
    });
  }, [trackers, filters]);

  const totalEntries = filteredTrackers.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredTrackers.slice(startIndex, startIndex + pageSize);

  const handleStatusUpdate = (trackerId: string, status: TrackerStatus) => {
    setSelectedTrackerId(trackerId);
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Tracker ID
            </label>
            <input
              type="text"
              placeholder="Enter Tracker ID"
              {...register("trackerId")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Recipient
            </label>
            <input
              type="text"
              placeholder="Recipient Name"
              {...register("recipient")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Merchant
            </label>
            <input
              type="text"
              placeholder="Merchant Name"
              {...register("merchant")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-2 bg-[#d63384] text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
            >
              <Eraser className="text-sm" /> Clear
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#6610f2] text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              <Filter className="text-sm" /> Filter
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Assigned Parcels
            </h2>
          </div>

          {isError && (
            <div className="text-red-500 text-center mb-4">
              Failed to load parcels. Please try again later.
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-3 text-left">SL</TableHead>
                  <TableHead className="p-3 text-left">Tracker ID</TableHead>
                  <TableHead className="p-3 text-left">Recipient</TableHead>
                  <TableHead className="p-3 text-left">Merchant</TableHead>
                  <TableHead className="p-3 text-left">Status Update</TableHead>
                  <TableHead className="p-3 text-left">Amount</TableHead>
                  <TableHead className="p-3 text-left">Payment</TableHead>
                  <TableHead className="p-3 text-left">Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className="animate-pulse"
                    >
                      <TableCell className="p-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      </TableCell>
                      {Array.from({ length: 8 }).map((_, colIndex) => (
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
                ) : currentData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="p-6 text-center text-gray-500"
                    >
                      No trackers available.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((tracker, index) => (
                    <TableRow
                      key={tracker.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="p-3">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        <button className="text-blue-600 hover:text-blue-800">
                          {tracker.trackingId}
                        </button>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.customerName}
                          </div>
                          <div className="text-gray-500">
                            {tracker.customerPhone}
                          </div>
                          <div
                            className="text-gray-500 truncate max-w-[200px]"
                            title={tracker.customerAddress}
                          >
                            {tracker.customerAddress}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.merchant.name}
                          </div>
                          <div className="text-gray-500">
                            {tracker.merchant.phone}
                          </div>
                          <div
                            className="text-gray-500 truncate max-w-[200px]"
                            title={tracker.merchant.address}
                          >
                            {tracker.merchant.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="h-8 px-2 p-2 bg-gray-200 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors">
                              <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="p-2 bg-white shadow-lg rounded-md"
                          >
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              <p className="text-sm font-medium px-2 py-1.5 text-gray-500">
                                Update Status
                              </p>
                              {[
                                "Return to Courier",
                                "Partial Delivered",
                                "Delivered",
                              ].map((status) => (
                                <button
                                  key={status}
                                  className="w-full px-2 py-1.5 text-left hover:bg-gray-50 rounded-md flex items-center space-x-2"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      tracker.id,
                                      status as TrackerStatus
                                    )
                                  }
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="text-gray-500">
                            COD:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.codAmount)}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            Total Charge:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.charges)}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            Vat:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.vat)}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            Net Payable:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.currentPayable)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <PaymentStatusBadge status={tracker.payment.status} />
                      </TableCell>
                      <TableCell className="p-3">{tracker.weight} kg</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <TablePaginationInfo
              startIndex={startIndex}
              pageSize={pageSize}
              totalEntries={totalEntries}
              currentDataLength={currentData.length}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onPrevPage={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              onNextPage={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            />
          </div>
        </div>
      </div>

      {selectedStatus && selectedTrackerId && (
        <StatusUpdateModal
          parcelId={selectedTrackerId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedStatus={selectedStatus}
        />
      )}
    </div>
  );
};

export default AssignedParcels;
