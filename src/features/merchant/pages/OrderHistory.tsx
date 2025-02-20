import { useState } from "react";

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
  // Set how many rows per page (adjust as needed)
  const pageSize: number = 10;
  // Track the current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Calculate total pages based on your data
  const totalPages: number = Math.ceil(demoData.length / pageSize);

  // Get the slice of data for the current page
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentData = demoData.slice(startIndex, startIndex + pageSize);

  // Handlers for previous/next buttons
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      {/* Search Filters */}
      <div className="flex flex-wrap gap-4 mb-5">
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
          <option value="all">All</option>
        </select>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
          Submit
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center mb-5 gap-2">
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Copy
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Excel
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
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
        <button className="ml-auto relative pr-8 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 text-gray-700">
          Column visibility
        </button>
        <input
          className="p-2 border border-gray-300 rounded text-sm"
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
          {/* Previous Button */}
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

          {/* Page Numbers with Ellipses */}
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

          {/* Next Button */}
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
