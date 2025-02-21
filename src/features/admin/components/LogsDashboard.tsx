
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

// Example demo data – replace with your actual invoice data
const demoInvoices = [
  {
    "id": 1,
    "logName": "System",
    "event": "Login",
    "subjectType": "User",
    "description": "User logged in successfully",
    "view": "View Details"
  },
  {
    "id": 2,
    "logName": "Security",
    "event": "Password Change",
    "subjectType": "Admin",
    "description": "Admin changed password",
    "view": "View Details"
  },
  {
    "id": 3,
    "logName": "System",
    "event": "Logout",
    "subjectType": "User",
    "description": "User logged out",
    "view": "View Details"
  },
  {
    "id": 4,
    "logName": "Error",
    "event": "Server Crash",
    "subjectType": "System",
    "description": "Unexpected server shutdown",
    "view": "View Details"
  },
  {
    "id": 5,
    "logName": "Audit",
    "event": "Data Update",
    "subjectType": "Admin",
    "description": "User details updated",
    "view": "View Details"
  },
  {
    "id": 6,
    "logName": "System",
    "event": "Login",
    "subjectType": "User",
    "description": "User logged in",
    "view": "View Details"
  },
  {
    "id": 7,
    "logName": "Security",
    "event": "Unauthorized Access",
    "subjectType": "User",
    "description": "Failed login attempt detected",
    "view": "View Details"
  },
  {
    "id": 8,
    "logName": "System",
    "event": "Session Timeout",
    "subjectType": "User",
    "description": "User session expired",
    "view": "View Details"
  },
  {
    "id": 9,
    "logName": "Audit",
    "event": "Profile Update",
    "subjectType": "User",
    "description": "User updated profile details",
    "view": "View Details"
  },
  {
    "id": 10,
    "logName": "System",
    "event": "Login",
    "subjectType": "User",
    "description": "New device login detected",
    "view": "View Details"
  },
  {
    "id": 11,
    "logName": "Error",
    "event": "Database Error",
    "subjectType": "System",
    "description": "Database connection failed",
    "view": "View Details"
  },
  {
    "id": 12,
    "logName": "Security",
    "event": "Password Reset",
    "subjectType": "User",
    "description": "User requested password reset",
    "view": "View Details"
  },
  {
    "id": 13,
    "logName": "Audit",
    "event": "Settings Change",
    "subjectType": "Admin",
    "description": "Admin updated site settings",
    "view": "View Details"
  },
  {
    "id": 14,
    "logName": "Error",
    "event": "API Failure",
    "subjectType": "System",
    "description": "External API failed to respond",
    "view": "View Details"
  },
  {
    "id": 15,
    "logName": "Security",
    "event": "2FA Setup",
    "subjectType": "User",
    "description": "User enabled two-factor authentication",
    "view": "View Details"
  },
  {
    "id": 16,
    "logName": "Audit",
    "event": "User Role Change",
    "subjectType": "Admin",
    "description": "Admin changed user role",
    "view": "View Details"
  },
  {
    "id": 17,
    "logName": "System",
    "event": "Login",
    "subjectType": "User",
    "description": "User logged in from new location",
    "view": "View Details"
  },
  {
    "id": 18,
    "logName": "Security",
    "event": "Account Locked",
    "subjectType": "User",
    "description": "User account locked after multiple failed logins",
    "view": "View Details"
  },
  {
    "id": 19,
    "logName": "Audit",
    "event": "Data Export",
    "subjectType": "Admin",
    "description": "Admin exported user data",
    "view": "View Details"
  },
  {
    "id": 20,
    "logName": "System",
    "event": "Login",
    "subjectType": "User",
    "description": "Successful login",
    "view": "View Details"
  },
  {
    "id": 21,
    "logName": "Error",
    "event": "Service Unavailable",
    "subjectType": "System",
    "description": "Service temporarily unavailable",
    "view": "View Details"
  },
  {
    "id": 22,
    "logName": "Security",
    "event": "Failed Login",
    "subjectType": "User",
    "description": "Multiple failed login attempts detected",
    "view": "View Details"
  },
  {
    "id": 23,
    "logName": "Audit",
    "event": "File Upload",
    "subjectType": "User",
    "description": "User uploaded a file",
    "view": "View Details"
  },
  {
    "id": 24,
    "logName": "System",
    "event": "Session Renewed",
    "subjectType": "User",
    "description": "User session extended",
    "view": "View Details"
  },
  {
    "id": 25,
    "logName": "Security",
    "event": "IP Blocked",
    "subjectType": "System",
    "description": "Suspicious IP address blocked",
    "view": "View Details"
  },
  {
    "id": 26,
    "logName": "Audit",
    "event": "Database Backup",
    "subjectType": "Admin",
    "description": "Database backup created",
    "view": "View Details"
  },
  {
    "id": 27,
    "logName": "Error",
    "event": "Page Load Failure",
    "subjectType": "System",
    "description": "Page failed to load",
    "view": "View Details"
  },
  {
    "id": 28,
    "logName": "System",
    "event": "Cache Cleared",
    "subjectType": "Admin",
    "description": "Admin cleared cache",
    "view": "View Details"
  },
  {
    "id": 29,
    "logName": "Security",
    "event": "Suspicious Activity",
    "subjectType": "User",
    "description": "Unusual login pattern detected",
    "view": "View Details"
  },
  {
    "id": 30,
    "logName": "Audit",
    "event": "User Deletion",
    "subjectType": "Admin",
    "description": "Admin deleted a user account",
    "view": "View Details"
  },
  {
    "id": 31,
    "logName": "System",
    "event": "Feature Enabled",
    "subjectType": "Admin",
    "description": "New feature enabled",
    "view": "View Details"
  },
  {
    "id": 32,
    "logName": "Security",
    "event": "Firewall Update",
    "subjectType": "System",
    "description": "Firewall rules updated",
    "view": "View Details"
  },
  {
    "id": 33,
    "logName": "Audit",
    "event": "Service Restart",
    "subjectType": "Admin",
    "description": "Service restarted",
    "view": "View Details"
  },
  {
    "id": 34,
    "logName": "System",
    "event": "Performance Test",
    "subjectType": "System",
    "description": "Performance test completed",
    "view": "View Details"
  },
  {
    "id": 35,
    "logName": "Security",
    "event": "Brute Force Attempt",
    "subjectType": "User",
    "description": "Multiple login attempts detected",
    "view": "View Details"
  },
  {
    "id": 36,
    "logName": "Audit",
    "event": "Access Revoked",
    "subjectType": "Admin",
    "description": "Admin revoked access for a user",
    "view": "View Details"
  }
]
;
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

const LogsDashboard: React.FC = () => {
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
                Log Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Event
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Subject Type
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Description
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
                    <td className="p-4 text-gray-600">{item.logName}</td>
                    <td className="p-4 text-gray-600">{item.event}</td>
                    <td className="p-4 text-gray-600">{item.subjectType}</td>
                    <td className="p-4 text-gray-600">{item.description}</td>
                   
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

export default LogsDashboard;
