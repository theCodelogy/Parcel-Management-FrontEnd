import React, { useState } from "react";
// import any icons if needed, e.g. import { FiEye } from 'react-icons/fi';

interface Support {
  id: number;
  subject: string;
  description: string;
  date: string;
  status: string;
}

// Sample data for demonstration (you can replace this with your real data)
const demoSupports: Support[] = [
  {
    id: 1,
    subject: "Login Issue",
    description: "User cannot log in",
    date: "2023-01-01",
    status: "Open",
  },
  {
    id: 2,
    subject: "Payment Error",
    description: "Error during payment processing",
    date: "2023-01-02",
    status: "Closed",
  },
  {
    id: 3,
    subject: "Bug Report",
    description: "Unexpected behavior on dashboard",
    date: "2023-01-03",
    status: "Open",
  },
  {
    id: 4,
    subject: "Feature Request",
    description: "Add dark mode option",
    date: "2023-01-04",
    status: "Pending",
  },
  {
    id: 5,
    subject: "Account Setup",
    description: "Issues setting up new account",
    date: "2023-01-05",
    status: "Resolved",
  },
  {
    id: 6,
    subject: "Data Sync",
    description: "Data not syncing properly",
    date: "2023-01-06",
    status: "Open",
  },
  {
    id: 7,
    subject: "Notification Bug",
    description: "Not receiving email alerts",
    date: "2023-01-07",
    status: "Closed",
  },
  {
    id: 8,
    subject: "UI Glitch",
    description: "Buttons overlapping on mobile",
    date: "2023-01-08",
    status: "Resolved",
  },
  {
    id: 9,
    subject: "Security Concern",
    description: "Password reset vulnerability",
    date: "2023-01-09",
    status: "Pending",
  },
  {
    id: 10,
    subject: "Performance Issue",
    description: "Page load is slow",
    date: "2023-01-10",
    status: "Open",
  },
  {
    id: 11,
    subject: "Other",
    description: "General inquiry",
    date: "2023-01-11",
    status: "Closed",
  },
  {
    id: 12,
    subject: "Subscription Problem",
    description: "Unable to renew subscription",
    date: "2023-01-12",
    status: "Open",
  },
  {
    id: 13,
    subject: "Mobile App Crash",
    description: "App crashes on startup",
    date: "2023-01-13",
    status: "Closed",
  },
  {
    id: 14,
    subject: "Email Delivery Issue",
    description: "Emails not being delivered",
    date: "2023-01-14",
    status: "Resolved",
  },
  {
    id: 15,
    subject: "Password Reset",
    description: "Password reset link not working",
    date: "2023-01-15",
    status: "Pending",
  },
  {
    id: 16,
    subject: "Account Deletion Request",
    description: "User wants to delete account",
    date: "2023-01-16",
    status: "Open",
  },
  {
    id: 17,
    subject: "Two-Factor Authentication",
    description: "Issues setting up 2FA",
    date: "2023-01-17",
    status: "Closed",
  },
  {
    id: 18,
    subject: "Language Support",
    description: "Request for additional language support",
    date: "2023-01-18",
    status: "Pending",
  },
  {
    id: 19,
    subject: "Data Export",
    description: "Unable to export data",
    date: "2023-01-19",
    status: "Resolved",
  },
  {
    id: 20,
    subject: "Integration Issue",
    description: "Problem integrating with third-party service",
    date: "2023-01-20",
    status: "Open",
  },
  {
    id: 21,
    subject: "Browser Compatibility",
    description: "Site not working on Firefox",
    date: "2023-01-21",
    status: "Closed",
  },
  {
    id: 22,
    subject: "Report Generation",
    description: "Reports not generating correctly",
    date: "2023-01-22",
    status: "Resolved",
  },
  {
    id: 23,
    subject: "Search Functionality",
    description: "Search results are inaccurate",
    date: "2023-01-23",
    status: "Pending",
  },
  {
    id: 24,
    subject: "File Upload Error",
    description: "Error when uploading files",
    date: "2023-01-24",
    status: "Open",
  },
  {
    id: 25,
    subject: "Session Timeout",
    description: "User sessions expiring too quickly",
    date: "2023-01-25",
    status: "Closed",
  },
];


/**
 * Helper function to generate the page array with ellipses.
 * Example outputs:
 * - [1, 2, 3, 4, 5] when totalPages <= 5
 * - [1, 2, 3, 4, "...", totalPages] near the beginning
 * - [1, "...", currentPage-1, currentPage, currentPage+1, "...", totalPages] somewhere in the middle
 * - [1, "...", totalPages-3, totalPages-2, totalPages-1, totalPages] near the end
 */
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
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    } else {
      pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1);
    }

    pages.push(totalPages);
  }

  return pages;
}

const PreviousSupports: React.FC = () => {
  const pageSize: number = 5; // change the page size as needed
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(demoSupports.length / pageSize);
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentSupports = demoSupports.slice(startIndex, startIndex + pageSize);

  // Handlers for previous and next buttons
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden m-5">
      {/* Top Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-0">
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
        </div>
        {/* Right Side: New Support & Search */}
        <div className="flex items-center">
          <button className="mr-4 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            New Support
          </button>
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 border rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg p-6">
        <table className="min-w-full rounded-lg">
          <thead className="bg-gray-100 text-gray-700 rounded-lg">
            <tr>
              <th className="p-4 text-left">Id</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentSupports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentSupports.map((support) => (
                <tr
                  key={support.id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition duration-300"
                >
                  <td className="p-4">{support.id}</td>
                  <td className="p-4">{support.subject}</td>
                  <td className="p-4">{support.description}</td>
                  <td className="p-4">{support.date}</td>
                  <td className="p-4">{support.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600">
          Showing {currentSupports.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + pageSize, demoSupports.length)} of{" "}
          {demoSupports.length} entries
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
            typeof page === "string" ? (
              <span key={index} className="px-3 py-1 text-gray-500 select-none">
                {page}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
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

export default PreviousSupports;
