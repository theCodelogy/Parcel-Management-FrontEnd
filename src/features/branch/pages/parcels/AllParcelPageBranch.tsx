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
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import StatusUpdateModal from "@/features/admin/pages/parcel/StatusUpdateModal";
import {
  useGetAllParcelQuery,
  useDeleteParcelMutation,
} from "@/redux/features/parcel/parcelApi";
import { TUser } from "@/interface";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
  | "Return received by merchant"
  | "Parcel Create";

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
  deliveryType: string;
  Weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string;
  packaging: string;
  priority: string;
  paymentMethod?: string;
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
    current?: string;
    email?: string;
    name?: string;
    phone?: string;
    deliveryMan?: string;
    deliveryManPhone?: string;
    deliveryManEmail?: string;
    note?: string;
    createdBy?: {
      email?: string;
      name?: string;
      phone?: string;
      role?: string;
      date: number;
    };
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
  weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
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
    case "Parcel Create":
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

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this parcel? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AllParcelPageBranch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: {
      trackerId: "",
      phone: "",
      date: "",
      status: new URLSearchParams(location.search).get("status") || "",
    },
  });

  const [filters, setFilters] = useState<Filters>({
    trackerId: "",
    phone: "",
    date: "",
    status: new URLSearchParams(location.search).get("status") || "",
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { name } = useAppSelector(useCurrentUser) as TUser;

  // Pass the email as a query parameter to the useGetAllParcelQuery hook
  const { data, isLoading, isError } = useGetAllParcelQuery([
    { name: "branchname", value: name },
    ...(filters.status
      ? [{ name: "currentStatus", value: filters.status }]
      : []),
  ]);

  // Delete parcel mutation
  const [deleteParcel] = useDeleteParcelMutation();

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
        ? tracker.customerPhone.includes(filters.phone)
        : true;
      const matchDate = filters.date
        ? tracker.statusUpdates.some((update) =>
            new Date(update.date).toISOString().startsWith(filters.date)
          )
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

  const handleDeleteParcel = (id: string) => {
    setParcelToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteParcel = async () => {
    if (parcelToDelete) {
      setIsDeleting(true);
      const loadingToastId = toast.loading("Deleting parcel...");

      try {
        await deleteParcel(parcelToDelete);
        setTrackers(
          trackers.filter((tracker) => tracker.id !== parcelToDelete)
        );
        toast.success("Parcel deleted successfully!", {
          id: loadingToastId,
        });
      } catch (error) {
        toast.error("Failed to delete parcel.", {
          id: loadingToastId,
        });
      } finally {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setParcelToDelete(null);
      }
    }
  };

  const cancelDeleteParcel = () => {
    setIsDeleteModalOpen(false);
    setParcelToDelete(null);
  };

  const handleCopy = async () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
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
        row.customerName,
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
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard!");
    }
  };

  const handleExcelDownload = () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
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
      Recipient: row.customerName,
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

  const handleCsvDownload = () => {
    const headers: string[] = [
      "SL",
      "Tracker ID",
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
        escapeCsv(row.customerName),
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
              <option value="Parcel Create">Parcel Create</option>
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
              onClick={() => navigate("create")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Parcel</span>
            </Button>
          </div>

          {isError && (
            <div className="text-red-500 text-center mb-4">
              Failed to load parcels. Please try again later.
            </div>
          )}

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
                      {Array.from({ length: 7 }).map((_, colIndex) => (
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
                      colSpan={9}
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
                        {tracker.status !== "Delivered" ? (
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
                        ) : (
                          <span className="text-gray-500"></span>
                        )}
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
                            onClick={() => handleDeleteParcel(tracker.id)}
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

      {selectedStatus && selectedTrackerId && (
        <StatusUpdateModal
          parcelId={selectedTrackerId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedStatus={selectedStatus}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDeleteParcel}
        onConfirm={confirmDeleteParcel}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AllParcelPageBranch;
