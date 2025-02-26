import { useState, useRef, useEffect } from "react";

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
  const [visibleColumns, setVisibleColumns] = useState({
    trackingId: true,
    invoiceNo: true,
    date: true,
    customer: true,
    phone: true,
    addressDetails: true,
    collectionAmount: true,
    charge: true,
    payableAmount: true,
    createdDate: true,
    status: true,
    paymentStatus: true,
    more: true,
  });
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use React Query to fetch order history data
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<TableData[]>({
    queryKey: ["orderHistory"],
    queryFn: fetchOrderHistory,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowColumnVisibility(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages: number = Math.ceil(data.length / pageSize);
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const toggleColumn = (columnKey: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  // Copy to clipboard function
  const handleCopy = async () => {
    const headers: string[] = ["SL"];
    if (visibleColumns.trackingId) headers.push("Tracking ID");
    if (visibleColumns.invoiceNo) headers.push("Invoice No");
    if (visibleColumns.date) headers.push("Date");
    if (visibleColumns.customer) headers.push("Customer");
    if (visibleColumns.phone) headers.push("Phone");
    if (visibleColumns.addressDetails) headers.push("Address Details");
    if (visibleColumns.collectionAmount) headers.push("Collection Amount");
    if (visibleColumns.charge) headers.push("Charge");
    if (visibleColumns.payableAmount) headers.push("Payable Amount");
    if (visibleColumns.createdDate) headers.push("Created Date");
    if (visibleColumns.status) headers.push("Status");
    if (visibleColumns.paymentStatus) headers.push("Payment Status");
    if (visibleColumns.more) headers.push("More");

    const rows: string[] = [headers.join("\t")];

    currentData.forEach((row, index) => {
      const rowData: string[] = [];
      rowData.push(String(startIndex + index + 1));
      if (visibleColumns.trackingId) rowData.push(row.trackingId);
      if (visibleColumns.invoiceNo) rowData.push(row.invoiceNo);
      if (visibleColumns.date) rowData.push(row.date);
      if (visibleColumns.customer) rowData.push(row.customer);
      if (visibleColumns.phone) rowData.push(row.phone);
      if (visibleColumns.addressDetails) rowData.push(row.addressDetails);
      if (visibleColumns.collectionAmount)
        rowData.push(String(row.collectionAmount));
      if (visibleColumns.charge) rowData.push(String(row.charge));
      if (visibleColumns.payableAmount) rowData.push(String(row.payableAmount));
      if (visibleColumns.createdDate) rowData.push(row.createdDate);
      if (visibleColumns.status) rowData.push(row.status);
      if (visibleColumns.paymentStatus) rowData.push(row.paymentStatus);
      if (visibleColumns.more) rowData.push("...");
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
    const headers: string[] = ["SL"];
    if (visibleColumns.trackingId) headers.push("Tracking ID");
    if (visibleColumns.invoiceNo) headers.push("Invoice No");
    if (visibleColumns.date) headers.push("Date");
    if (visibleColumns.customer) headers.push("Customer");
    if (visibleColumns.phone) headers.push("Phone");
    if (visibleColumns.addressDetails) headers.push("Address Details");
    if (visibleColumns.collectionAmount) headers.push("Collection Amount");
    if (visibleColumns.charge) headers.push("Charge");
    if (visibleColumns.payableAmount) headers.push("Payable Amount");
    if (visibleColumns.createdDate) headers.push("Created Date");
    if (visibleColumns.status) headers.push("Status");
    if (visibleColumns.paymentStatus) headers.push("Payment Status");
    if (visibleColumns.more) headers.push("More");

    const rows = currentData.map((row, index) => {
      const rowData: any = { SL: startIndex + index + 1 };
      if (visibleColumns.trackingId) rowData["Tracking ID"] = row.trackingId;
      if (visibleColumns.invoiceNo) rowData["Invoice No"] = row.invoiceNo;
      if (visibleColumns.date) rowData["Date"] = row.date;
      if (visibleColumns.customer) rowData["Customer"] = row.customer;
      if (visibleColumns.phone) rowData["Phone"] = row.phone;
      if (visibleColumns.addressDetails)
        rowData["Address Details"] = row.addressDetails;
      if (visibleColumns.collectionAmount)
        rowData["Collection Amount"] = row.collectionAmount;
      if (visibleColumns.charge) rowData["Charge"] = row.charge;
      if (visibleColumns.payableAmount)
        rowData["Payable Amount"] = row.payableAmount;
      if (visibleColumns.createdDate) rowData["Created Date"] = row.createdDate;
      if (visibleColumns.status) rowData["Status"] = row.status;
      if (visibleColumns.paymentStatus)
        rowData["Payment Status"] = row.paymentStatus;
      if (visibleColumns.more) rowData["More"] = "...";
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "order_history.xlsx");
  };

  // CSV download function
  const handleCsvDownload = () => {
    const headers: string[] = ["SL"];
    if (visibleColumns.trackingId) headers.push("Tracking ID");
    if (visibleColumns.invoiceNo) headers.push("Invoice No");
    if (visibleColumns.date) headers.push("Date");
    if (visibleColumns.customer) headers.push("Customer");
    if (visibleColumns.phone) headers.push("Phone");
    if (visibleColumns.addressDetails) headers.push("Address Details");
    if (visibleColumns.collectionAmount) headers.push("Collection Amount");
    if (visibleColumns.charge) headers.push("Charge");
    if (visibleColumns.payableAmount) headers.push("Payable Amount");
    if (visibleColumns.createdDate) headers.push("Created Date");
    if (visibleColumns.status) headers.push("Status");
    if (visibleColumns.paymentStatus) headers.push("Payment Status");
    if (visibleColumns.more) headers.push("More");

    const escapeCsv = (value: string | number): string => {
      const str = String(value);
      if (str.search(/("|,|\n)/g) !== -1) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [headers.map(escapeCsv).join(",")];
    currentData.forEach((row, index) => {
      const rowArray: string[] = [];
      rowArray.push(escapeCsv(startIndex + index + 1));
      if (visibleColumns.trackingId) rowArray.push(escapeCsv(row.trackingId));
      if (visibleColumns.invoiceNo) rowArray.push(escapeCsv(row.invoiceNo));
      if (visibleColumns.date) rowArray.push(escapeCsv(row.date));
      if (visibleColumns.customer) rowArray.push(escapeCsv(row.customer));
      if (visibleColumns.phone) rowArray.push(escapeCsv(row.phone));
      if (visibleColumns.addressDetails)
        rowArray.push(escapeCsv(row.addressDetails));
      if (visibleColumns.collectionAmount)
        rowArray.push(escapeCsv(row.collectionAmount));
      if (visibleColumns.charge) rowArray.push(escapeCsv(row.charge));
      if (visibleColumns.payableAmount)
        rowArray.push(escapeCsv(row.payableAmount));
      if (visibleColumns.createdDate) rowArray.push(escapeCsv(row.createdDate));
      if (visibleColumns.status) rowArray.push(escapeCsv(row.status));
      if (visibleColumns.paymentStatus)
        rowArray.push(escapeCsv(row.paymentStatus));
      if (visibleColumns.more) rowArray.push(escapeCsv("..."));
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
        {/* Column Visibility Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowColumnVisibility((prev) => !prev)}
            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700"
          >
            Column visibility
          </button>
          {showColumnVisibility && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded z-10">
              <div className="p-2">
                {Object.keys(visibleColumns).map((key) => (
                  <div key={key} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={key}
                      checked={(visibleColumns as any)[key]}
                      onChange={() =>
                        toggleColumn(key as keyof typeof visibleColumns)
                      }
                      className="mr-2"
                    />
                    <label htmlFor={key} className="text-sm text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
              {visibleColumns.trackingId && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Tracking ID
                </th>
              )}
              {visibleColumns.invoiceNo && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Invoice No
                </th>
              )}
              {visibleColumns.date && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
              )}
              {visibleColumns.customer && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>
              )}
              {visibleColumns.phone && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
              )}
              {visibleColumns.addressDetails && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Address Details
                </th>
              )}
              {visibleColumns.collectionAmount && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Collection Amount
                </th>
              )}
              {visibleColumns.charge && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Charge
                </th>
              )}
              {visibleColumns.payableAmount && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Payable Amount
                </th>
              )}
              {visibleColumns.createdDate && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Created Date
                </th>
              )}
              {visibleColumns.status && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              )}
              {visibleColumns.paymentStatus && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Payment Status
                </th>
              )}
              {visibleColumns.more && (
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  More
                </th>
              )}
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
                  {visibleColumns.trackingId && (
                    <td className="p-4">{row.trackingId}</td>
                  )}
                  {visibleColumns.invoiceNo && (
                    <td className="p-4">{row.invoiceNo}</td>
                  )}
                  {visibleColumns.date && <td className="p-4">{row.date}</td>}
                  {visibleColumns.customer && (
                    <td className="p-4">{row.customer}</td>
                  )}
                  {visibleColumns.phone && <td className="p-4">{row.phone}</td>}
                  {visibleColumns.addressDetails && (
                    <td className="p-4">{row.addressDetails}</td>
                  )}
                  {visibleColumns.collectionAmount && (
                    <td className="p-4">{row.collectionAmount}</td>
                  )}
                  {visibleColumns.charge && (
                    <td className="p-4">{row.charge}</td>
                  )}
                  {visibleColumns.payableAmount && (
                    <td className="p-4">{row.payableAmount}</td>
                  )}
                  {visibleColumns.createdDate && (
                    <td className="p-4">{row.createdDate}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="p-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.paymentStatus && (
                    <td className="p-4">{row.paymentStatus}</td>
                  )}
                  {visibleColumns.more && <td className="p-4">...</td>}
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
