import React from "react";

export default function Parcels() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input type="date" className="border p-2 rounded w-full" placeholder="Enter Date" />
          <select className="border p-2 rounded w-full">
            <option>Select Status</option>
            <option>Pending</option>
            <option>Delivered</option>
            <option>Received by Hub</option>
          </select>
          <select className="border p-2 rounded w-full">
            <option>Select Merchant</option>
            <option>Casual Point</option>
            <option>Casual Mart</option>
            <option>It’Soha</option>
          </select>
          <select className="border p-2 rounded w-full">
            <option>Select Delivery Man</option>
            <option>John Doe</option>
            <option>Michael Smith</option>
          </select>
          <select className="border p-2 rounded w-full">
            <option>Select Pickup Man</option>
            <option>James Brown</option>
            <option>David Miller</option>
          </select>
          <input type="text" className="border p-2 rounded w-full" placeholder="Invoice Id" />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded bg-purple-500 text-white">Filter</button>
          <button className="px-4 py-2 rounded bg-red-500 text-white">Clear</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border p-2 rounded w-1/3"
            placeholder="Search..."
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-pink-500 text-white rounded">Map Show</button>
            <select className="border p-2 rounded">
              <option>Select Bulk</option>
              <option>Mark as Delivered</option>
              <option>Cancel Order</option>
            </select>
            <button className="px-4 py-2 bg-green-500 text-white rounded">+ Import</button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded">+ Add</button>
          </div>
        </div>

        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left text-sm md:text-base">
              <th className="p-3">###</th>
              <th className="p-3">Tracking ID</th>
              <th className="p-3">Recipient Info</th>
              <th className="p-3">Merchant</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Status Update</th>
              <th className="p-3">Payment</th>
              <th className="p-3">View Proof</th>
              <th className="p-3">Toggle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t text-sm md:text-base">
              <td className="p-3">1</td>
              <td className="p-3">CTEX37542317</td>
              <td className="p-3">
                feroz (0199958441) <br /> brammonbaria
              </td>
              <td className="p-3">It’Soha</td>
              <td className="p-3">COD: ৳1150</td>
              <td className="p-3">High</td>
              <td className="p-3 font-semibold text-green-600">Delivered</td>
              <td className="p-3">2025-02-19 08:21:07 AM</td>
              <td className="p-3">PROC</td>
              <td className="p-3">
                <button className="px-3 py-1 bg-gray-300 rounded">View</button>
              </td>
              <td className="p-3">
                <input type="checkbox" className="toggle" />
              </td>
            </tr>
            <tr className="border-t text-sm md:text-base">
              <td className="p-3">2</td>
              <td className="p-3">CTEX79152989</td>
              <td className="p-3">
                md akter (01409973057) <br /> 371A matual,jatrabari
              </td>
              <td className="p-3">Casual Point</td>
              <td className="p-3">COD: ৳2500</td>
              <td className="p-3">Medium</td>
              <td className="p-3 font-semibold text-red-600">Pending</td>
              <td className="p-3">2025-02-21 04:23:57 PM</td>
              <td className="p-3">N/A</td>
              <td className="p-3">
                <button className="px-3 py-1 bg-gray-300 rounded">View</button>
              </td>
              <td className="p-3">
                <input type="checkbox" className="toggle" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
