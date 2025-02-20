import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

// Example demo data – replace with your actual invoice data
const demoInvoices = [
  {
    id: "63c1e1a4f1a2b3c4d5e6f789",
    invoice: "INV-001",
    date: "2025-02-18",
    totalInvoice: "$200.00",
    totalPayment: "$150.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78a",
    invoice: "INV-002",
    date: "2025-02-17",
    totalInvoice: "$300.00",
    totalPayment: "$300.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78b",
    invoice: "INV-003",
    date: "2025-02-16",
    totalInvoice: "$400.00",
    totalPayment: "$350.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78c",
    invoice: "INV-004",
    date: "2025-02-15",
    totalInvoice: "$500.00",
    totalPayment: "$500.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78d",
    invoice: "INV-005",
    date: "2025-02-14",
    totalInvoice: "$600.00",
    totalPayment: "$450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78e",
    invoice: "INV-006",
    date: "2025-02-13",
    totalInvoice: "$700.00",
    totalPayment: "$700.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78f",
    invoice: "INV-007",
    date: "2025-02-12",
    totalInvoice: "$800.00",
    totalPayment: "$750.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f790",
    invoice: "INV-008",
    date: "2025-02-11",
    totalInvoice: "$900.00",
    totalPayment: "$900.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f791",
    invoice: "INV-009",
    date: "2025-02-10",
    totalInvoice: "$1000.00",
    totalPayment: "$800.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f792",
    invoice: "INV-010",
    date: "2025-02-09",
    totalInvoice: "$1100.00",
    totalPayment: "$1100.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f793",
    invoice: "INV-011",
    date: "2025-02-08",
    totalInvoice: "$1200.00",
    totalPayment: "$1150.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f794",
    invoice: "INV-012",
    date: "2025-02-07",
    totalInvoice: "$1300.00",
    totalPayment: "$1300.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f795",
    invoice: "INV-013",
    date: "2025-02-06",
    totalInvoice: "$1400.00",
    totalPayment: "$1350.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f796",
    invoice: "INV-014",
    date: "2025-02-05",
    totalInvoice: "$1500.00",
    totalPayment: "$1500.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f797",
    invoice: "INV-015",
    date: "2025-02-04",
    totalInvoice: "$1600.00",
    totalPayment: "$1450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f798",
    invoice: "INV-016",
    date: "2025-02-03",
    totalInvoice: "$1700.00",
    totalPayment: "$1700.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f799",
    invoice: "INV-017",
    date: "2025-02-02",
    totalInvoice: "$1800.00",
    totalPayment: "$1750.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79a",
    invoice: "INV-018",
    date: "2025-02-01",
    totalInvoice: "$1900.00",
    totalPayment: "$1900.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79b",
    invoice: "INV-019",
    date: "2025-01-31",
    totalInvoice: "$2000.00",
    totalPayment: "$1800.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79c",
    invoice: "INV-020",
    date: "2025-01-30",
    totalInvoice: "$2100.00",
    totalPayment: "$2100.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79d",
    invoice: "INV-021",
    date: "2025-01-29",
    totalInvoice: "$2200.00",
    totalPayment: "$2150.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79e",
    invoice: "INV-022",
    date: "2025-01-28",
    totalInvoice: "$2300.00",
    totalPayment: "$2300.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f79f",
    invoice: "INV-023",
    date: "2025-01-27",
    totalInvoice: "$2400.00",
    totalPayment: "$2350.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a0",
    invoice: "INV-024",
    date: "2025-01-26",
    totalInvoice: "$2500.00",
    totalPayment: "$2500.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a1",
    invoice: "INV-025",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a2",
    invoice: "INV-026",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a3",
    invoice: "INV-027",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a4",
    invoice: "INV-028",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a5",
    invoice: "INV-029",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a6",
    invoice: "INV-030",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a7",
    invoice: "INV-031",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a8",
    invoice: "INV-032",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7a9",
    invoice: "INV-033",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7aa",
    invoice: "INV-034",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7ab",
    invoice: "INV-035",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f7ac",
    invoice: "INV-036",
    date: "2025-01-25",
    totalInvoice: "$2600.00",
    totalPayment: "$2450.00",
  },
];

/**
 * Helper function to generate the page array with ellipses.
 * Example outputs:
 * - [1, 2, 3, 4, 5] when totalPages <= 5
 * - [1, 2, 3, 4, "...", 10] near the beginning
 * - [1, "...", 7, 8, 9, "...", 15] somewhere in the middle
 * - [1, "...", 12, 13, 14, 15] near the end
 */
function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    // If total pages are 5 or fewer, just show them all
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show first page
    pages.push(1);

    // If currentPage is close to the beginning, show first few pages
    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("...");
    }
    // If currentPage is somewhere in the middle
    else if (currentPage < totalPages - 2) {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
    }
    // If currentPage is near the end
    else {
      pages.push("...");
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    }

    // Show last page
    pages.push(totalPages);
  }

  return pages;
}

const Invoice: React.FC = () => {
  // Set how many invoices per page
  const pageSize: number = 10;
  // Track current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Calculate total pages
  const totalPages: number = Math.ceil(demoInvoices.length / pageSize);

  // Calculate the slice of data for the current page
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentInvoices = demoInvoices.slice(startIndex, startIndex + pageSize);

  // Handlers for prev/next buttons
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Payments</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                  SL
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Invoice
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Total Invoice
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Total Payment
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((item, index) => {
                const isLast: boolean = index === currentInvoices.length - 1;
                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <td
                      className={`p-4 text-gray-600 ${
                        isLast ? "rounded-bl-lg" : ""
                      }`}
                    >
                      {startIndex + index + 1}
                    </td>
                    <td className="p-4 text-gray-600">{item.invoice}</td>
                    <td className="p-4 text-gray-600">{item.date}</td>
                    <td className="p-4 text-gray-600">{item.totalInvoice}</td>
                    <td className="p-4 text-gray-600">{item.totalPayment}</td>
                    <td className={`p-4 ${isLast ? "rounded-br-lg" : ""}`}>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center">
                        <FiEye className="mr-2" />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <p className="text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, demoInvoices.length)} of{" "}
            {demoInvoices.length} results
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
            {generatePageNumbers(currentPage, totalPages).map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={index}
                    className="px-3 py-1 text-gray-500 select-none"
                  >
                    ...
                  </span>
                );
              } else {
                return (
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
                );
              }
            })}

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
    </div>
  );
};

export default Invoice;
