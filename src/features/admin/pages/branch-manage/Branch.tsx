import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaEraser,
  FaFilter,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import TablePagination from "../../../../components/ui/TablePagination";
import { fetchBranchApi } from "../../services/branchApi";
import { BranchData } from "../../types";

interface Filters {
  name: string;
  phone: string;
}

interface TablePaginationInfoProps {
  startIndex: number;
  pageSize: number;
  totalEntries: number;
  currentDataLength: number;
}

const TablePaginationInfo: React.FC<TablePaginationInfoProps> = ({
  startIndex,
  totalEntries,
  currentDataLength,
}) => {
  return (
    <div className="text-sm text-gray-600">
      {totalEntries === 0
        ? "No entries"
        : `Showing ${startIndex + 1} to ${
            startIndex + currentDataLength
          } of ${totalEntries} entries`}
    </div>
  );
};

const Branch = () => {
  // react-hook-form for filter form
  const { register, handleSubmit, reset } = useForm<Filters>({
    defaultValues: { name: "", phone: "" },
  });

  // Use react-query to fetch branch data
  const {
    data: branches = [],
    isLoading,
    error,
  } = useQuery<BranchData[]>({
    queryKey: ["branch"],
    queryFn: fetchBranchApi,
  });

  // State for dropdown open state
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Filter handlers
  const onSubmit = (data: Filters) => {
    console.log("Filter data:", data);
    // Implement filtering logic here using the form data
  };

  const onClear = () => {
    reset();
  };

  // "Add New" button that redirects via react-router-dom Link
  const AddNewButton = () => (
    <Link
      to="/admin/create-branch"
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded transition-colors hover:bg-blue-600"
    >
      <FaPlus className="mr-2" /> Add New
    </Link>
  );

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const totalEntries = branches.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = branches.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0"
        >
          {/* Name Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Branch Name"
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Phone Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-2 bg-[#d63384] text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
            >
              <FaEraser className="text-sm" /> Clear
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#6610f2] text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              <FaFilter className="text-sm" /> Filter
            </button>
          </div>
        </form>
      </div>

      {/* Branch Table */}
      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Branch</h2>
            <AddNewButton />
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <p className="p-3">Loading...</p>
            ) : error ? (
              <p className="p-3 text-red-600">Error loading data</p>
            ) : (
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3 text-left">SL</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {currentData.map((branchItem) => (
                    <tr
                      key={branchItem.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="p-3">{branchItem.id}</td>
                      <td className="p-3">{branchItem.name}</td>
                      <td className="p-3">{branchItem.phone}</td>
                      <td className="p-3">{branchItem.address}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            branchItem.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {branchItem.status}
                        </span>
                      </td>
                      <td className="p-3 relative">
                        <button
                          className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === branchItem.id
                                ? null
                                : branchItem.id
                            )
                          }
                        >
                          <FaEllipsisV />
                        </button>
                        {openDropdown === branchItem.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                              <FaEdit className="mr-2" /> Edit
                            </button>
                            <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                              <FaTrash className="mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Section */}
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
              onPageChange={(page) => setCurrentPage(page)}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;
