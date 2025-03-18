import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Eraser, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/TablePagination";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcelApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/interface";

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
  customerAddress: string;
  Weight: number;
  customerName: string; // Add this line
  customerPhone: string; // Add this line
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
  proofOfDelivery?: {
    videoUrl?: string;
    verificationCode?: string;
    timestamp?: string;
  };
  customerName: string; // Add this line
  customerPhone: string; // Add this line
  customerAddress: string; // Add this line
};

const formatCurrency = (amount: number): string => {
  return `৳${amount.toFixed(2)}`;
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
  recipient: string;
  merchant: string;
  date: string;
  status: string;
}

const DeliverdParcels = () => {
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: {
      trackerId: "",
      recipient: "",
      merchant: "",
      date: "",
      status: "",
    },
  });

  const [filters, setFilters] = useState<Filters>({
    trackerId: "",
    recipient: "",
    merchant: "",
    date: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { email } = useAppSelector(useCurrentUser) as TUser;

  const { data: apiResponse, isLoading } = useGetAllParcelQuery([
    { name: "currentStatus", value: "Delivered" },
    { name: "parcelStatus.deliveryManEmail", value: email },
  ]);

  const trackers = useMemo(() => {
    return (apiResponse?.data || []).map((item: ApiResponse) => ({
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
      customerName: item.customerName, // Add this line
      customerPhone: item.customerPhone, // Add this line
      customerAddress: item.customerAddress, // Add this line
    }));
  }, [apiResponse]);

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
      date: "",
      status: "",
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
        ? tracker.customerName // Update this line
            .toLowerCase()
            .includes(filters.recipient.toLowerCase())
        : true;
      const matchMerchant = filters.merchant
        ? tracker.merchant.name
            .toLowerCase()
            .includes(filters.merchant.toLowerCase())
        : true;
      const matchDate = filters.date
        ? tracker.pickupDate &&
          new Date(tracker.pickupDate).toISOString().startsWith(filters.date)
        : true;
      const matchStatus = filters.status
        ? tracker.status === filters.status
        : true;

      return (
        matchTrackerId &&
        matchRecipient &&
        matchMerchant &&
        matchDate &&
        matchStatus
      );
    });
  }, [trackers, filters]);

  const totalEntries = filteredTrackers.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredTrackers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="">
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
              Delivered Parcels
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-3 text-left">SL</TableHead>
                  <TableHead className="p-3 text-left">Tracker ID</TableHead>
                  <TableHead className="p-3 text-left">Recipient</TableHead>
                  <TableHead className="p-3 text-left">Merchant</TableHead>
                  <TableHead className="p-3 text-left">Status</TableHead>
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
                  currentData.map((tracker) => (
                    <TableRow
                      key={tracker.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="p-3">
                        {startIndex + currentData.indexOf(tracker) + 1}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        <button className="text-blue-600 hover:text-blue-800 hover:underline">
                          {tracker.trackingId}
                        </button>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.customerName} {/* Display customerName */}
                          </div>
                          <div className="text-gray-500">
                            {tracker.customerPhone}{" "}
                            {/* Display customerPhone */}
                          </div>
                          <div
                            className="text-gray-500 truncate max-w-[200px]"
                            title={tracker.customerAddress}
                          >
                            {tracker.customerAddress}{" "}
                            {/* Display customerAddress */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.merchant.name}
                          </div>
                          <div className="text-gray-500">
                            {tracker.pickup.phone}
                          </div>
                          <div
                            className="text-gray-500 truncate max-w-[200px]"
                            title={tracker.address}
                          >
                            {tracker.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex items-center">
                          <StatusBadge status={tracker.status} />
                        </div>
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
    </div>
  );
};

export default DeliverdParcels;
