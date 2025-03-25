import React, { useState, useEffect } from "react";
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
import { TUser } from "@/interface";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

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
  | "Transfer to Hub"
  | "Received by Hub"
  | "Return to Courier"
  | "Partial Delivered"
  | "Return Assigned to Merchant"
  | "Return Received by Merchant";

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
  merchantPhone: string;
  cashCollection: number;
  totalCharge: number;
  vat: number;
  netPayable: number;
  currentPayable: number;
  advance: number;
  paymentMethod?: string;
  currentStatus: TrackerStatus;
  parcelStatus: StatusUpdate[];
  pickupDate: string | null;
  deliveryDate: string | null;
  Weight: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  invoice: string;
};

export type Tracker = {
  id: string;
  trackingId: string;
  merchant: {
    name: string;
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
  pickupDate: string | null;
  deliveryDate: string | null;
  address: string;
  weight: number;
  customerName: string;
  customerPhone: string;
  invoiceNumber: string;
};

const formatCurrency = (amount: number): string => {
  return `৳${amount.toFixed(2)}`;
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const InvoicePage: React.FC = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { email } = useAppSelector(useCurrentUser) as TUser;

  const { data, isLoading, isError } = useGetAllParcelQuery([
    { name: "merchantEmail", value: email },
    { name: "currentStatus", value: "Delivered" },
  ]);

  useEffect(() => {
    if (data?.data) {
      const trackers = data.data.map((item: ApiResponse) => {
        const deliveryDate = item.parcelStatus.find(
          (status) => status.title === "Delivered"
        )?.date;

        return {
          id: item._id,
          trackingId: item.TrakingId,
          merchant: {
            name: item.merchantName,
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
          pickupDate: item.pickupDate || null,
          deliveryDate: deliveryDate
            ? new Date(deliveryDate).toISOString()
            : null,
          address: item.customerAddress,
          weight: item.Weight,
          customerName: item.customerName,
          customerPhone: item.customerPhone,
          invoiceNumber: item.invoice,
        };
      });
      setTrackers(trackers);
    }
  }, [data]);

  const totalEntries = trackers.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = trackers.slice(startIndex, startIndex + pageSize);

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment Invoice</h2>
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
              <TableHead className="p-3 text-left">Amount</TableHead>
              <TableHead className="p-3 text-left">Delivery Date</TableHead>
              <TableHead className="p-3 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="animate-pulse">
                  {/* SL Column */}
                  <TableCell className="p-3">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </TableCell>
                  {/* Tracker ID, Amount, Delivery Date Columns */}
                  {Array.from({ length: 3 }).map((_, colIndex) => (
                    <TableCell key={`skeleton-col-${colIndex}`} className="p-3">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </TableCell>
                  ))}
                  {/* Actions Column */}
                  <TableCell className="p-3 text-center">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
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
                    {formatDate(tracker.deliveryDate)}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 flex items-center gap-2"
                      onClick={() =>
                        navigate(`/merchant/invoice/${tracker.trackingId}`, {
                          state: {
                            tracker,
                            invoiceNumber: tracker.invoiceNumber,
                            invoiceDate: formatDate(tracker.deliveryDate),
                            invoiceTime:
                              tracker.deliveryDate !== null
                                ? new Date(
                                    tracker.deliveryDate
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : "",
                            merchantName: tracker.merchant.name,
                            merchantPhone: tracker.merchant.phone,
                          },
                        })
                      }
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
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
          onPrevPage={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          onNextPage={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        />
      </div>
    </div>
  );
};

export default InvoicePage;
