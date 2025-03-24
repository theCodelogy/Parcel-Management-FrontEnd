import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Eraser, Filter, Plus, Clock, ChevronDown } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/TablePagination";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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
  merchantEmail: string;
  merchantName: string;
  merchantAddress: string;
  merchantPhone: string;
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
  customerName: string;
  customerPhone: string;
  customerAddress: string;
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
  customerName: string;
  customerPhone: string;
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
  date: string;
  status: string;
}

const AllParcelPageAdmin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: {
      trackerId: "",
      phone: "",
      date: "",
      status: "",
    },
  });

  const [filters, setFilters] = useState<Filters>({
    trackerId: "",
    phone: "",
    date: "",
    status: "",
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
  console.log(email);

  // Pass the email as a query parameter to the useGetAllParcelQuery hook
  const { data, isLoading, isError } = useGetAllParcelQuery([]);
  console.log(data);

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
        customerName: item.customerName,
        customerPhone: item.customerPhone,
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
    if (data.date) url.searchParams.append("date", data.date);
    if (data.status) url.searchParams.append("status", data.status);

    console.log("Constructed URL:", url.toString());
  };

  const onClear = () => {
    reset();
    setFilters({
      trackerId: "",
      phone: "",
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
      const matchPhone = filters.phone
        ? tracker.pickup.phone.includes(filters.phone)
        : true;
      const matchDate = filters.date
        ? tracker.pickupDate &&
          new Date(tracker.pickupDate).toISOString().startsWith(filters.date)
        : true;
      const matchStatus = filters.status
        ? tracker.status === filters.status
        : true;

      return matchTrackerId && matchPhone && matchDate && matchStatus;
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

  // Copy to clipboard function
  const handleCopy = async () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
      "Merchant",
      "Recipient",
      "Status",
      "Status Update",
      "Amount",
      "Payment",
      "Weight",
    ];

    const rows: string[] = [headers.join("\t")];

    currentData.forEach((row, index) => {
      const rowData: string[] = [
        String(startIndex + index + 1),
        row.trackingId,
        `${row.merchant.name} (${row.merchant.email})`,
        row.pickup.point,
        row.status,
        row.statusUpdates.map((update) => update.note).join(", "),
        `COD: ${formatCurrency(
          row.financial.codAmount
        )}, Total Charge: ${formatCurrency(
          row.financial.charges
        )}, Vat: ${formatCurrency(
          row.financial.vat
        )}, Current Payable: ${formatCurrency(row.financial.currentPayable)}`,
        row.payment.status,
        String(row.weight),
      ];
      rows.push(rowData.join("\t"));
    });

    try {
      await navigator.clipboard.writeText(rows.join("\n"));
      alert("Copied to clipboard!");
    } catch (error) {
      alert("Failed to copy to clipboard!");
    }
  };

  // Excel download function using SheetJS and file-saver
  const handleExcelDownload = () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
      "Merchant",
      "Recipient",
      "Status",
      "Status Update",
      "Amount",
      "Payment",
      "Weight",
    ];

    const rows = currentData.map((row, index) => ({
      SL: startIndex + index + 1,
      "Tracker ID": row.trackingId,
      Merchant: `${row.merchant.name} (${row.merchant.email})`,
      Recipient: row.pickup.point,
      Status: row.status,
      "Status Update": row.statusUpdates
        .map((update) => update.note)
        .join(", "),
      Amount: `COD: ${formatCurrency(
        row.financial.codAmount
      )}, Total Charge: ${formatCurrency(
        row.financial.charges
      )}, Vat: ${formatCurrency(
        row.financial.vat
      )}, Current Payable: ${formatCurrency(row.financial.currentPayable)}`,
      Payment: row.payment.status,
      Weight: row.weight,
    }));

    const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Trackers");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "tracker_management.xlsx");
  };

  // CSV download function
  const handleCsvDownload = () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
      "Merchant",
      "Recipient",
      "Status",
      "Status Update",
      "Amount",
      "Payment",
      "Weight",
    ];

    const escapeCsv = (value: string | number): string => {
      const str = String(value);
      if (str.search(/("|,|\n)/g) !== -1) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [headers.map(escapeCsv).join(",")];
    currentData.forEach((row, index) => {
      const rowArray: string[] = [
        escapeCsv(startIndex + index + 1),
        escapeCsv(row.trackingId),
        escapeCsv(`${row.merchant.name} (${row.merchant.email})`),
        escapeCsv(row.pickup.point),
        escapeCsv(row.status),
        escapeCsv(row.statusUpdates.map((update) => update.note).join(", ")),
        escapeCsv(
          `COD: ${formatCurrency(
            row.financial.codAmount
          )}, Total Charge: ${formatCurrency(
            row.financial.charges
          )}, Vat: ${formatCurrency(
            row.financial.vat
          )}, Current Payable: ${formatCurrency(row.financial.currentPayable)}`
        ),
        escapeCsv(row.payment.status),
        escapeCsv(row.weight),
      ];
      csvRows.push(rowArray.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "tracker_management.csv");
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
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              {...register("date")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
              <option value="Pickup Assigned">Pickup Assigned</option>
              <option value="Pickup Re-Schedule">Pickup Re-Schedule</option>
              <option value="Received By Pickup Man">
                Received By Pickup Man
              </option>
              <option value="Received By Hub">Received By Hub</option>
              <option value="Delivery Man Assigned">
                Delivery Man Assigned
              </option>
              <option value="Received Warehouse">Received Warehouse</option>
              <option value="Transfer to hub">Transfer to hub</option>
              <option value="Received by hub">Received by hub</option>
              <option value="Return to Courier">Return to Courier</option>
              <option value="Partial Delivered">Partial Delivered</option>
              <option value="Return assigned to merchant">
                Return assigned to merchant
              </option>
              <option value="Return received by merchant">
                Return received by merchant
              </option>
            </select>
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
            <h2 className="text-xl font-semibold text-gray-900">Parcels</h2>
            <Button
              variant="default"
              onClick={() => navigate("/admin/parcels/create")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Parcel</span>
            </Button>
          </div>

          {/* Display error message if there is an error */}
          {isError && (
            <div className="text-red-500 text-center mb-4">
              Failed to load parcels. Please try again later.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center mb-5 gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700"
            >
              Copy
            </button>
            <button
              onClick={handleExcelDownload}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700"
            >
              Excel
            </button>
            <button
              onClick={handleCsvDownload}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700"
            >
              Csv
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
              PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-3 text-left">SL</TableHead>
                  <TableHead className="p-3 text-left">Tracker ID</TableHead>
                  <TableHead className="p-3 text-left">Merchant</TableHead>
                  <TableHead className="p-3 text-left">Recipient</TableHead>
                  <TableHead className="p-3 text-left">Status</TableHead>
                  <TableHead className="p-3 text-left">Status Update</TableHead>
                  <TableHead className="p-3 text-left">Amount</TableHead>
                  <TableHead className="p-3 text-left">Payment</TableHead>
                  <TableHead className="p-3 text-left">Weight</TableHead>
                  <TableHead className="p-3 text-left">Actions</TableHead>
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
                        <button className="text-blue-600 hover:text-blue-800">
                          {tracker.trackingId}
                        </button>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.merchant.name}
                          </div>
                          <div className="text-gray-500">
                            {tracker.merchant.email}
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
                        <div className="flex flex-col space-y-1 text-sm">
                          <div className="font-medium">
                            {tracker.customerName}
                          </div>
                          <div className="text-gray-500">
                            {tracker.customerPhone}
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
                                            <p className="text-sm">
                                              {update.note}
                                            </p>
                                            {update.deliveryMan && (
                                              <p className="text-xs text-gray-500 mt-1">
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
                      <TableCell className="p-3 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
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

export default AllParcelPageAdmin;
