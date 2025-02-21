import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface TableData {
  trackingId: string;
  invoiceNo: string;
  date: string;
  customer: string;
  phone: string;
  addressDetails: string;
  collectionAmount: number;
  charge: number;
  payableAmount: number;
  createdDate: string;
  status: string;
  paymentStatus: string;
}

const demoData: TableData[] = [
  {
    trackingId: "FE03012531795562",
    invoiceNo: "INV1001",
    date: "03-Jan-25, 08:41 PM",
    customer: "moulushi",
    phone: "01886644655",
    addressDetails:
      "Area: Bashundhara R/A, Address: Block-C, Main Road, Flat-4B, Bashundhara",
    collectionAmount: 2500,
    charge: 80,
    payableAmount: 2420,
    createdDate: "January 03, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795563",
    invoiceNo: "INV1002",
    date: "04-Jan-25, 09:15 AM",
    customer: "Rahim",
    phone: "01712345678",
    addressDetails: "Area: Gulshan, Address: Road-5, House-22, Gulshan",
    collectionAmount: 3000,
    charge: 100,
    payableAmount: 2900,
    createdDate: "January 04, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795564",
    invoiceNo: "INV1003",
    date: "05-Jan-25, 07:30 PM",
    customer: "Karim",
    phone: "01811223344",
    addressDetails: "Area: Banani, Address: Sector-3, House-17, Banani",
    collectionAmount: 2800,
    charge: 90,
    payableAmount: 2710,
    createdDate: "January 05, 2025",
    status: "Returned",
    paymentStatus: "Unpaid",
  },
  {
    trackingId: "FE03012531795565",
    invoiceNo: "INV1004",
    date: "06-Jan-25, 10:00 AM",
    customer: "Salma",
    phone: "01987654321",
    addressDetails: "Area: Dhanmondi, Address: Road-10, House-12, Dhanmondi",
    collectionAmount: 2200,
    charge: 70,
    payableAmount: 2130,
    createdDate: "January 06, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795566",
    invoiceNo: "INV1005",
    date: "07-Jan-25, 03:45 PM",
    customer: "Fatima",
    phone: "01699887766",
    addressDetails: "Area: Uttara, Address: Sector-5, Plot-19, Uttara",
    collectionAmount: 3200,
    charge: 110,
    payableAmount: 3090,
    createdDate: "January 07, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795567",
    invoiceNo: "INV1006",
    date: "08-Jan-25, 11:20 AM",
    customer: "Jamal",
    phone: "01511223344",
    addressDetails: "Area: Mirpur, Address: Road-3, House-8, Mirpur",
    collectionAmount: 2600,
    charge: 85,
    payableAmount: 2515,
    createdDate: "January 08, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795568",
    invoiceNo: "INV1007",
    date: "09-Jan-25, 06:50 PM",
    customer: "Nusrat",
    phone: "01799887766",
    addressDetails: "Area: Tejgaon, Address: Road-7, House-5, Tejgaon",
    collectionAmount: 2900,
    charge: 95,
    payableAmount: 2805,
    createdDate: "January 09, 2025",
    status: "Returned",
    paymentStatus: "Unpaid",
  },
  {
    trackingId: "FE03012531795569",
    invoiceNo: "INV1008",
    date: "10-Jan-25, 08:00 AM",
    customer: "Sadia",
    phone: "01822334455",
    addressDetails: "Area: Lalmatia, Address: Road-2, House-14, Lalmatia",
    collectionAmount: 3100,
    charge: 100,
    payableAmount: 3000,
    createdDate: "January 10, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795570",
    invoiceNo: "INV1009",
    date: "11-Jan-25, 05:30 PM",
    customer: "Hassan",
    phone: "01933445566",
    addressDetails: "Area: Mirpur, Address: Sector-4, House-10, Mirpur",
    collectionAmount: 2700,
    charge: 90,
    payableAmount: 2610,
    createdDate: "January 11, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795571",
    invoiceNo: "INV1010",
    date: "12-Jan-25, 12:15 PM",
    customer: "Anika",
    phone: "01644556677",
    addressDetails: "Area: Gulshan, Address: Road-8, House-7, Gulshan",
    collectionAmount: 3300,
    charge: 120,
    payableAmount: 3180,
    createdDate: "January 12, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795572",
    invoiceNo: "INV1011",
    date: "13-Jan-25, 07:15 AM",
    customer: "Imran",
    phone: "01855667788",
    addressDetails: "Area: Dhanmondi, Address: Road-11, House-21, Dhanmondi",
    collectionAmount: 2400,
    charge: 75,
    payableAmount: 2325,
    createdDate: "January 13, 2025",
    status: "Returned",
    paymentStatus: "Unpaid",
  },
  {
    trackingId: "FE03012531795573",
    invoiceNo: "INV1012",
    date: "14-Jan-25, 09:40 PM",
    customer: "Fazila",
    phone: "01566778899",
    addressDetails: "Area: Uttara, Address: Block-A, Road-6, Uttara",
    collectionAmount: 3500,
    charge: 130,
    payableAmount: 3370,
    createdDate: "January 14, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795574",
    invoiceNo: "INV1013",
    date: "15-Jan-25, 10:05 AM",
    customer: "Rafiq",
    phone: "01788990011",
    addressDetails: "Area: Banani, Address: Sector-5, House-9, Banani",
    collectionAmount: 2800,
    charge: 90,
    payableAmount: 2710,
    createdDate: "January 15, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795575",
    invoiceNo: "INV1014",
    date: "16-Jan-25, 11:55 AM",
    customer: "Laila",
    phone: "01955667788",
    addressDetails:
      "Area: Bashundhara R/A, Address: Block-D, Main Road, Flat-3A, Bashundhara",
    collectionAmount: 2600,
    charge: 85,
    payableAmount: 2515,
    createdDate: "January 16, 2025",
    status: "Returned",
    paymentStatus: "Unpaid",
  },
  {
    trackingId: "FE03012531795576",
    invoiceNo: "INV1015",
    date: "17-Jan-25, 02:20 PM",
    customer: "Sakib",
    phone: "01866778899",
    addressDetails: "Area: Tejgaon, Address: Road-9, House-3, Tejgaon",
    collectionAmount: 3000,
    charge: 100,
    payableAmount: 2900,
    createdDate: "January 17, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795577",
    invoiceNo: "INV1016",
    date: "18-Jan-25, 04:10 PM",
    customer: "Jahanara",
    phone: "01744556677",
    addressDetails: "Area: Lalmatia, Address: Road-3, House-16, Lalmatia",
    collectionAmount: 3400,
    charge: 110,
    payableAmount: 3290,
    createdDate: "January 18, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795578",
    invoiceNo: "INV1017",
    date: "19-Jan-25, 06:35 PM",
    customer: "Morshed",
    phone: "01877889900",
    addressDetails: "Area: Mirpur, Address: Sector-2, House-4, Mirpur",
    collectionAmount: 3100,
    charge: 105,
    payableAmount: 2995,
    createdDate: "January 19, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    trackingId: "FE03012531795579",
    invoiceNo: "INV1018",
    date: "20-Jan-25, 08:50 AM",
    customer: "Farhana",
    phone: "01522334455",
    addressDetails: "Area: Gulshan, Address: Block-B, Road-12, Gulshan",
    collectionAmount: 3300,
    charge: 120,
    payableAmount: 3180,
    createdDate: "January 20, 2025",
    status: "Returned",
    paymentStatus: "Unpaid",
  },
  {
    trackingId: "FE03012531795580",
    invoiceNo: "INV1019",
    date: "21-Jan-25, 07:05 PM",
    customer: "Shahadat",
    phone: "01933442211",
    addressDetails: "Area: Dhanmondi, Address: Road-15, House-10, Dhanmondi",
    collectionAmount: 2900,
    charge: 95,
    payableAmount: 2805,
    createdDate: "January 21, 2025",
    status: "Pending",
    paymentStatus: "Pending",
  },
  {
    trackingId: "FE03012531795581",
    invoiceNo: "INV1020",
    date: "22-Jan-25, 10:30 AM",
    customer: "Nabila",
    phone: "01833445566",
    addressDetails: "Area: Uttara, Address: Road-4, House-8, Uttara",
    collectionAmount: 3200,
    charge: 110,
    payableAmount: 3090,
    createdDate: "January 22, 2025",
    status: "Delivered",
    paymentStatus: "Paid",
  },
];
// Helper function to generate the page array with ellipses.
function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("...");
    } else if (currentPage < totalPages - 2) {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
    } else {
      pages.push("...");
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    }

    pages.push(totalPages);
  }

  return pages;
}

// Helper function to return badge classes based on status
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

const OrderHistory = () => {
  const pageSize: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(demoData.length / pageSize);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const startIndex: number = (currentPage - 1) * pageSize;
  const currentData = demoData.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const toggleColumn = (columnKey: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // Copy function (already provided)
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

    const textToCopy = rows.join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
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
    // Prepare CSV headers
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

    // Helper to escape CSV values
    const escapeCsv = (value: string | number): string => {
      const str = String(value);
      if (str.search(/("|,|\n)/g) !== -1) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Build CSV rows as an array of strings
    const csvRows = [];
    csvRows.push(headers.map(escapeCsv).join(","));

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
            {currentData.length === 0 ? (
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <p className="text-gray-600">
          Showing{" "}
          {currentData.length > 0
            ? `${startIndex + 1} to ${Math.min(
                startIndex + pageSize,
                demoData.length
              )}`
            : "0 to 0"}{" "}
          of {demoData.length} entries
        </p>
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-400 border-gray-300"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            &lt;
          </button>

          {generatePageNumbers(currentPage, totalPages).map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-1 text-gray-500 select-none">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 border rounded-md transition ${
                  page === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "hover:bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400 border-gray-300"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
