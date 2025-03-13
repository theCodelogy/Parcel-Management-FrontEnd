import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TableData } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderHistory } from "../services/orderHistoryApi";
import TablePaginationInfo from "../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../components/ui/TablePagination";

const OrderHistory = () => {
  const pageSize: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Use React Query to fetch order history data
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<TableData[]>({
    queryKey: ["orderHistory"],
    queryFn: fetchOrderHistory,
  });

  const totalPages: number = Math.ceil(data.length / pageSize);
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Copy to clipboard function
  const handleCopy = async () => {
    const headers: string[] = [
      "SL",
      "Tracking ID",
      "Invoice No",
      "Date",
      "Customer",
      "Phone",
      "Address Details",
      "Collection Amount",
      "Charge",
      "Payable Amount",
      "Created Date",
      "Status",
      "Payment Status",
      "More",
    ];

    const rows: string[] = [headers.join("\t")];

    currentData.forEach((row, index) => {
      const rowData: string[] = [
        String(startIndex + index + 1),
        row.trackingId,
        row.invoiceNo,
        row.date,
        row.customer,
        row.phone,
        row.addressDetails,
        String(row.collectionAmount),
        String(row.charge),
        String(row.payableAmount),
        row.createdDate,
        row.status,
        row.paymentStatus,
        "...",
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
      "Tracking ID",
      "Invoice No",
      "Date",
      "Customer",
      "Phone",
      "Address Details",
      "Collection Amount",
      "Charge",
      "Payable Amount",
      "Created Date",
      "Status",
      "Payment Status",
      "More",
    ];

    const rows = currentData.map((row, index) => ({
      SL: startIndex + index + 1,
      "Tracking ID": row.trackingId,
      "Invoice No": row.invoiceNo,
      Date: row.date,
      Customer: row.customer,
      Phone: row.phone,
      "Address Details": row.addressDetails,
      "Collection Amount": row.collectionAmount,
      Charge: row.charge,
      "Payable Amount": row.payableAmount,
      "Created Date": row.createdDate,
      Status: row.status,
      "Payment Status": row.paymentStatus,
      More: "...",
    }));

    const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "order_history.xlsx");
  };

  // CSV download function
  const handleCsvDownload = () => {
    const headers: string[] = [
      "SL",
      "Tracking ID",
      "Invoice No",
      "Date",
      "Customer",
      "Phone",
      "Address Details",
      "Collection Amount",
      "Charge",
      "Payable Amount",
      "Created Date",
      "Status",
      "Payment Status",
      "More",
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
        escapeCsv(row.invoiceNo),
        escapeCsv(row.date),
        escapeCsv(row.customer),
        escapeCsv(row.phone),
        escapeCsv(row.addressDetails),
        escapeCsv(row.collectionAmount),
        escapeCsv(row.charge),
        escapeCsv(row.payableAmount),
        escapeCsv(row.createdDate),
        escapeCsv(row.status),
        escapeCsv(row.paymentStatus),
        escapeCsv("..."),
      ];
      csvRows.push(rowArray.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "order_history.csv");
  };

  // Badge class helper for status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Returned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg relative">
      {/* Search Filters */}
      <div className="flex gap-4 mb-5">
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Track Id"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Phone Number"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          placeholder="Invoice No"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          type="date"
          placeholder="Date From"
        />
        <input
          className="p-2 border border-gray-300 rounded text-sm"
          type="date"
          placeholder="Date To"
        />
        <select className="p-2 border border-gray-300 rounded text-sm">
          <option value="">All</option>
          <option value="1">Pending</option>
          <option value="2">Picked</option>
          <option value="6">On The Way To Delivery</option>
          <option value="7">Delivered</option>
          <option value="8">Cancelled</option>
          <option value="9">Return To Hub</option>
          <option value="10">Hold</option>
          <option value="11">Return To Merchant</option>
          <option value="12">Partial Delivery</option>
        </select>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
          Submit
        </button>
      </div>

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
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Print
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Print all
        </button>
        <input
          className="ml-auto p-2 border border-gray-300 rounded text-sm"
          placeholder="Search"
        />
      </div>

      {/* Table with x-axis scrolling */}
      <div className="overflow-x-scroll">
        <table className="w-max table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                SL
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Tracking ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Invoice No
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Address Details
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Collection Amount
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Charge
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Payable Amount
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Created Date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Payment Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={14} className="p-4 text-center text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : error || !data ? (
              <tr>
                <td colSpan={14} className="p-4 text-center text-red-500">
                  Error fetching data.
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={14} className="p-4 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-300"
                >
                  <td className="p-4">{startIndex + index + 1}</td>
                  <td className="p-4">{row.trackingId}</td>
                  <td className="p-4">{row.invoiceNo}</td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4">{row.customer}</td>
                  <td className="p-4">{row.phone}</td>
                  <td className="p-4">{row.addressDetails}</td>
                  <td className="p-4">{row.collectionAmount}</td>
                  <td className="p-4">{row.charge}</td>
                  <td className="p-4">{row.payableAmount}</td>
                  <td className="p-4">{row.createdDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">{row.paymentStatus}</td>
                  <td className="p-4">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <TablePaginationInfo
          startIndex={startIndex}
          pageSize={pageSize}
          totalEntries={data.length}
          currentDataLength={currentData.length}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
