/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaEraser, FaFilter } from "react-icons/fa";

export default function FilterForm() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border dark:border-gray-700 mx-auto">
      <form
        action="https://cte.fitspick.com/admin/deliveryman/filter"
        method="GET"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="User Name"
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={filters.email}
              onChange={handleChange}
              placeholder="User Email"
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 items-center pt-6">
            <a
              href="https://cte.fitspick.com/admin/deliveryman"
              className="flex items-center gap-2 bg-[#d63384] text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
            >
              <FaEraser className="text-sm" /> Clear
            </a>

            <button
              type="submit"
              className="flex items-center gap-2 bg-[#6610f2] text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              <FaFilter className="text-sm" /> Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
