import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import TablePaginationInfo from "../../../components/ui/TablePaginationInfo";
import TablePagination from "../../../components/ui/TablePagination";
import { FiChevronDown, FiEye } from "react-icons/fi";
import { fetchParcelsApi } from "../services/parcelsApi";

interface FilterState {
  date: string;
  status: string;
  merchant: string;
  deliveryMan: string;
  pickupMan: string;
  invoiceId: string;
}

// Define your ParcelStatus type
export type ParcelStatus =
  | "Processing"
  | "Dispatched"
  | "Delivered"
  | "Returned";

// Create an array of statuses from the ParcelStatus type
const parcelStatuses: ParcelStatus[] = [
  "Processing",
  "Dispatched",
  "Delivered",
  "Returned",
];

const Parcels: React.FC = () => {
  // Fetch parcels with TanStack Query
  const {
    data: parcelsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: fetchParcelsApi,
  });

  // Ensure parcels is an array
  const parcels = Array.isArray(parcelsData) ? parcelsData : [];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterState, setFilterState] = useState<FilterState>({
    date: "",
    status: "",
    merchant: "",
    deliveryMan: "",
    pickupMan: "",
    invoiceId: "",
  });

  // State for dropdown open rows (to show status options)
  const [openDropdownRows, setOpenDropdownRows] = useState<Set<string>>(
    new Set()
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 14;
  const totalEntries = parcels.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = parcels.slice(startIndex, startIndex + pageSize);

  // Event handlers
  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilterState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFilter = useCallback(() => {
    console.log("Applying filters:", filterState);
    // Implement your filter logic here
  }, [filterState]);

  const handleClearFilters = useCallback(() => {
    setFilterState({
      date: "",
      status: "",
      merchant: "",
      deliveryMan: "",
      pickupMan: "",
      invoiceId: "",
    });
  }, []);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Toggle dropdown for status update options
  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdownRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Handle loading and error states
  if (isLoading) return <div>Loading parcels...</div>;
  if (error) return <div>Error loading parcels.</div>;

  return (
    <div className="min-h-screen">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={filterState.date}
              onChange={handleFilterChange}
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select
              name="status"
              value={filterState.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              {parcelStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {/* Merchant Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Merchant
            </label>
            <select
              name="merchant"
              value={filterState.merchant}
              onChange={handleFilterChange}
              autoComplete="off"
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Merchant</option>
              {/* Add merchant options dynamically if available */}
            </select>
          </div>
          {/* Delivery Man Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Delivery Man
            </label>
            <select
              name="deliveryMan"
              value={filterState.deliveryMan}
              onChange={handleFilterChange}
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Delivery Man</option>
              <option value="john">John Doe</option>
              <option value="michael">Michael Smith</option>
            </select>
          </div>
          {/* Pickup Man Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Pickup Man
            </label>
            <select
              name="pickupMan"
              value={filterState.pickupMan}
              onChange={handleFilterChange}
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Pickup Man</option>
              <option value="james">James Brown</option>
              <option value="david">David Miller</option>
            </select>
          </div>
          {/* Invoice ID Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Invoice ID
            </label>
            <input
              type="text"
              name="invoiceId"
              value={filterState.invoiceId}
              onChange={handleFilterChange}
              placeholder="Enter Invoice ID"
              className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Filter Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleFilter}
            className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
          <button
            onClick={handleClearFilters}
            className="flex items-center px-6 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Parcels</h2>
        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="border p-2 rounded w-1/3"
          />
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1118.88 17.804L12 21l-6.879-3.196z"
                />
              </svg>
              Map Show
            </button>

            <select className="border p-2 rounded">
              <option>Select Bulk Action</option>
              <option>Assign Pickup</option>
              <option>Hub Transfer</option>
              <option>Received by Hub</option>
              <option>Delivery Man Assign</option>
              <option>Assign Return to Merchant</option>
            </select>

            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M4 12l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              + Import
            </button>

            <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              + Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto min-w-[1200px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Recipient Info
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Merchant
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Status Update
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  View Proof
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentData.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {parcel.TrakingId}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {parcel.customerName}
                      </div>
                      <div className="text-gray-500">
                        {parcel.customerPhone}
                      </div>
                      <div className="text-gray-500">
                        {parcel.customerAddress}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {parcel.merchant}
                      </div>
                      <div className="text-gray-500">{parcel.pickupPoints}</div>
                      <div className="text-gray-500">
                        {parcel.pickupAddress}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div>COD: ৳{parcel.cashCollection}</div>
                      <div>Total Charge: ৳{parcel.totalCharge}</div>
                      <div>VAT: ৳{parcel.vat}</div>
                      <div>Current Payable: ৳{parcel.currentPayable}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {parcel.priority}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                        parcel.parcelStatus[parcel.parcelStatus.length - 1]
                          .title === "Delivered"
                          ? "bg-green-500 text-white"
                          : parcel.parcelStatus[parcel.parcelStatus.length - 1]
                              .title === "Processing"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {
                        parcel.parcelStatus[parcel.parcelStatus.length - 1]
                          .title
                      }
                    </span>
                    <p>
                      {" "}
                      {parcel.parcelStatus[parcel.parcelStatus.length - 1].date}
                    </p>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(parcel._id)}
                        className="focus:outline-none flex items-center bg-red-200 p-2 rounded-md"
                      >
                        <FiChevronDown className="w-4 h-4 text-gray-600" />
                      </button>
                      {openDropdownRows.has(parcel._id) && (
                        <div className="z-[999] absolute mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-max">
                          {parcelStatuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                console.log(
                                  `Selected status for parcel ${parcel._id}: ${status}`
                                );
                                // Add your update logic here (e.g., call an API to update the parcel status)
                                toggleDropdown(parcel._id);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {parcel.paymentMethod}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <FiEye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Section */}
        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <TablePaginationInfo
            startIndex={startIndex}
            pageSize={pageSize}
            totalEntries={totalEntries}
            currentDataLength={currentData.length}
          />
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Parcels;
