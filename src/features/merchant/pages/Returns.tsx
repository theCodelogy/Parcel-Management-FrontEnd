import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReturns } from "../services/returnsApi";
import { TableData } from "../types";
import TablePaginationInfo from "../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../components/ui/TablePagination";

const Returns = () => {
  // Use TanStack Query to fetch data using Axios
  const { data, isLoading, error } = useQuery<TableData[]>({
    queryKey: ["returns"],
    queryFn: fetchReturns,
  });

  // State for pagination
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize: number = 10;

  const totalPages: number = data ? Math.ceil(data.length / pageSize) : 0;
  const startIndex: number = data ? (currentPage - 1) * pageSize : 0;
  const currentData = data ? data.slice(startIndex, startIndex + pageSize) : [];

  // Handler for previous page
  const handlePrevPage = (): void => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Handler for next page
  const handleNextPage = (): void => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Helper to determine status badge classes
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

      {/* Table */}
      <div className="overflow-x-scroll rounded-lg">
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

      {/* Pagination */}
      {!isLoading && data && (
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
      )}
    </div>
  );
};

export default Returns;
