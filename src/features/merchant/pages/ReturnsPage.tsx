import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Eraser, Filter, Clock, ChevronDown } from "lucide-react";
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
import { TUser } from "@/interface";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

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
  current: string;
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
  merchant: string;
  pickupPoints: string;
  pickupPhone: string;
  pickupAddress: string;
  cashCollection: number;
  totalCharge: number;
  vat: number;
  netPayable: number;
  currentPayable: number;
  advance: number;
  paymentMethod?: string;
  currentStatus: TrackerStatus;
  parcelStatus: {
    title: string;
    current: string;
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
  }[];
  pickupDate: string | null;
  deliveryDate: string | null;
  Weight: number;
  customerName: string; // New field
  customerPhone: string; // New field
  customerAddress: string; // New field
};

export type Tracker = {
  id: string;
  trackingId: string;
  merchant: {
    name: string;
  };
  pickup: {
    point: string;
    phone: string;
    address: string;
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
  pickupDate: string | null;
  deliveryDate: string | null;
  address: string;
  weight: number;
  customerName: string; // New field
  customerPhone: string; // New field
};

const formatCurrency = (amount: number): string => {
  return `৳${amount.toFixed(2)}`;
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ status }: { status: TrackerStatus }) => {
  let bgColor = "";

  switch (status) {
    case "Pending":
    case "Pickup Assigned":
    case "Pickup Re-Schedule":
      bgColor = "bg-yellow-500";
      break;
    case "In Transit":
    case "Received By Pickup Man":
    case "Received By Hub":
    case "Delivery Man Assigned":
    case "Received Warehouse":
    case "Transfer to hub":
    case "Received by hub":
      bgColor = "bg-blue-500";
      break;
    case "Delivered":
    case "Partial Delivered":
      bgColor = "bg-green-500";
      break;
    case "Returned":
    case "Return to Courier":
    case "Return assigned to merchant":
    case "Return received by merchant":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-500";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${bgColor}`}
    >
      {status}
    </span>
  );
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
  phone: string;
}

const ReturnsPage = () => {
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: {
      trackerId: "",
      phone: "",
    },
  });

  const [filters, setFilters] = useState<Filters>({
    trackerId: "",
    phone: "",
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

  // Pass the email as a query parameter to the useGetAllParcelQuery hook
  const { data, isLoading, isError } = useGetAllParcelQuery([
    { name: "merchantEmail", value: email },
    { name: "currentStatus", value: "Return to Courier" },
  ]);

  console.log(data);

  useEffect(() => {
    if (data?.data) {
      const trackers = data.data.map((item: ApiResponse) => ({
        id: item._id,
        trackingId: item.TrakingId,
        merchant: {
          name: item.merchant,
        },
        pickup: {
          point: item.pickupPoints,
          phone: item.pickupPhone,
          address: item.pickupAddress,
        },
        financial: {
          codAmount: item.cashCollection,
          charges: item.totalCharge,
          vat: item.vat,
          currentPayable: item.netPayable,
        },
        payment: {
          status:
            item.currentPayable === 0 ? "Paid" : ("Pending" as PaymentStatus),
          amountPaid: item.advance,
          amountPending: item.currentPayable,
          method: item.paymentMethod,
        },
        status: item.currentStatus as TrackerStatus,
        statusUpdates: item.parcelStatus.map((status) => ({
          title: status.title,
          current: status.current,
          email: status.email,
          name: status.name,
          phone: status.phone,
          deliveryMan: status.deliveryMan,
          deliveryManPhone: status.deliveryManPhone,
          deliveryManEmail: status.deliveryManEmail,
          note: status.note,
          date: status.date,
          createdBy: status.createdBy,
        })),
        pickupDate: item.pickupDate || null,
        deliveryDate: item.deliveryDate || null,
        address: item.customerAddress,
        weight: item.Weight,
        customerName: item.customerName, // New field
        customerPhone: item.customerPhone, // New field
      }));
      setTrackers(trackers);
    }
  }, [data]);

  const onSubmit = (data: Filters) => {
    console.log("Filters applied:", data);
    setFilters(data);
    setCurrentPage(1);

    // Construct the URL with filters
    const baseUrl =
      "https://parcel-management-back-end-beta.vercel.app/api/v1/parcel";
    const url = new URL(baseUrl);

    if (data.trackerId) url.searchParams.append("TrakingId", data.trackerId);
    if (data.phone) url.searchParams.append("pickupPhone", data.phone);

    console.log("Constructed URL:", url.toString());
  };

  const onClear = () => {
    reset();
    setFilters({
      trackerId: "",
      phone: "",
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
      const matchPhone = filters.phone
        ? tracker.pickup.phone.includes(filters.phone)
        : true;

      return matchTrackerId && matchPhone;
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
    <div className="p-4">
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
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              {...register("phone")}
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
              Returnd Parcels
            </h2>
          </div>

          {/* Display error message if there is an error */}
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
                  <TableHead className="p-3 text-left">Status</TableHead>
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
                      {Array.from({ length: 7 }).map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-col-${colIndex}`}
                          className="p-3"
                        >
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : currentData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="p-6 text-center text-gray-500"
                    >
                      No trackers available.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((tracker) => (
                    <TableRow
                      key={tracker.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="p-3">
                        {startIndex + currentData.indexOf(tracker) + 1}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        <button className="text-blue-600 hover:text-blue-800">
                          {tracker.trackingId}
                        </button>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.customerName} {/* New field */}
                          </div>
                          <div className="text-gray-500">
                            {tracker.customerPhone} {/* New field */}
                          </div>
                          <div
                            className="text-gray-500 truncate max-w-[200px]"
                            title={tracker.address}
                          >
                            {tracker.address} {/* Existing field */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex items-center">
                          <StatusBadge status={tracker.status} />
                          {tracker.statusUpdates.length > 0 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                                  <Clock className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="start"
                                className="w-80 p-2 bg-white shadow-lg rounded-md"
                              >
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                  <p className="text-sm font-medium px-2 py-1.5 text-gray-500">
                                    Status History
                                  </p>
                                  {tracker.statusUpdates
                                    .sort(
                                      (a, b) =>
                                        new Date(b.date).getTime() -
                                        new Date(a.date).getTime()
                                    )
                                    .map((update, idx) => (
                                      <div
                                        key={idx}
                                        className="px-2 py-1.5 hover:bg-gray-50 rounded-md"
                                      >
                                        <div className="flex items-start space-x-2">
                                          <StatusBadge
                                            status={
                                              update.title as TrackerStatus
                                            }
                                          />
                                          <div className="flex-1">
                                            <p className="text-xs text-gray-500">
                                              {formatTimestamp(update.date)}
                                            </p>
                                            {update.deliveryMan && (
                                              <p className="text-xs text-gray-500 mt-1 font-bold">
                                                Delivery Man:{" "}
                                                {update.deliveryMan}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
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
                            className=" p-2 bg-white shadow-lg rounded-md"
                          >
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              <p className="text-sm font-medium px-2 py-1.5 text-gray-500">
                                Update Status
                              </p>
                              {[
                                "Pickup Assigned",
                                "Pickup Re-Schedule",
                                "Received By Pickup Man",
                                "Received By Hub",
                                "Delivery Man Assigned",
                                "Received Warehouse",
                                "Transfer to hub",
                                "Received by hub",
                                "Return to Courier",
                                "Partial Delivered",
                                "Delivered",
                                "Return assigned to merchant",
                                "Return received by merchant",
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
                            Total Charge Amount:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.charges)}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            Vat Amount:{" "}
                            <span className="font-medium text-gray-800">
                              {formatCurrency(tracker.financial.vat)}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            Current Payable:{" "}
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

      {/* Render the StatusUpdateModal */}
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

export default ReturnsPage;
